import { atom } from "jotai";
import { csv, json, rollup, rollups, descending, sum, max, map } from "d3";
import { feature } from "topojson-client";
import { TData } from "../types";

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
  async () => await csv("entidades.csv", (row: any) => row as TData)
);

/** Aggregated data as d3 map for each departamento */
export const dataSummaryAtom = atom((get) =>
  rollup(get(dataAtom), getSummary, (o) => o.departamento)
);

/** Aggregated data for all the country */
export const dataSummaryAllAtom = atom((get) => getSummary(get(dataAtom)));

/** Get an atom with the aggregated data for a departamento */
export const createDepartamentoDataAtom = (departamento: string) =>
  atom((get) => get(dataSummaryAtom).get(departamento));

/** Get the max number of entities on a departamento  */
export const maxCountAtom = atom((get) => {
  const data = get(dataSummaryAtom);
  const maxCount = max(map(data.values(), ({ total }) => total));
  return maxCount ?? 0;
});

/** Load geojson data */
export const geodataAtom = atom(async () => {
  const data = await json("departamentos.json").then((topology) => {
    const featureCollection = feature(topology as any, "departamentos");
    return featureCollection as any as GeoJSON.FeatureCollection<
      GeoJSON.Geometry,
      { departamento: string }
    >;
  });
  return data;
});
