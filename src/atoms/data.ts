import { atom } from "jotai";
import { csv, rollups, descending, sum, max } from "d3";
import { feature } from "topojson-client";
import { TData, TPopulationData, TSummaryData } from "../types";
import csv_entidades from "../data/entidades.csv";
import csv_poblacion from "../data/poblacion_departamentos.csv";

/** Load population data */
export const populationDataAtom = atom(async () => {
  const csvData = await csv(
    csv_poblacion,
    (row: any) => ({ ...row, total: +row.total } as TPopulationData)
  );
  const data = new Map<string, number>();
  let totalPopulation = 0;
  csvData.forEach(({ departamento, total }) => {
    totalPopulation += total;
    data.set(departamento, total);
  });
  data.set("all", totalPopulation);
  return data;
});

/** Aggregates data to get counts */
export const getSummary = (data: TData[]) => {
  const entries = rollups(
    data,
    (o) => o.length,
    (o) => o.poder
  ).sort((a, b) => descending(a[1], b[1]));
  return {
    entries,
    total: sum(entries.map((o) => o[1])),
    max: max(entries.map((o) => o[1])) ?? 0,
  };
};

/** Load raw data */
export const dataAtom = atom(
  async () => await csv(csv_entidades, (row: any) => row as TData)
);

const densityMul = 100_000;

/**
 * Aggregated data as d3 map for each departamento
 * density is given per 100k persons
 */
export const dataSummaryAtom = atom((get) => {
  const populationData = get(populationDataAtom);
  const dataList = rollups(get(dataAtom), getSummary, (o) => o.departamento);
  const data = new Map<string, TSummaryData>();
  dataList.forEach(([departamento, d]) => {
    const population = populationData.get(departamento) ?? 0;
    return data.set(departamento, {
      ...d,
      population,
      density: (d.total / population) * densityMul,
    });
  });
  return data;
});

/**
 * Aggregated data for all the country
 * density is given per 100k persons
 */
export const dataSummaryAllAtom = atom<TSummaryData>((get) => {
  const data = getSummary(get(dataAtom));
  const population = get(populationDataAtom).get("all") ?? 0;
  return {
    ...data,
    population,
    density: (data.total / population) * densityMul,
  };
});

/** Get an atom with the aggregated data for a departamento */
export const createDepartamentoDataAtom = (departamento: string) =>
  atom((get) => get(dataSummaryAtom).get(departamento));

/** Load geojson data */
export const geodataAtom = atom(async () => {
  const jsonData = (await import("../data/departamentos.json"))
    .default as any as TopoJSON.Topology;
  const data = feature(
    jsonData,
    "departamentos"
  ) as any as GeoJSON.FeatureCollection<
    GeoJSON.Geometry,
    { departamento: string }
  >;
  return data;
});
