import { atom } from "jotai";
import { csv, json, rollup, rollups, descending, sum, max } from "d3";
import { feature } from "topojson-client";

export interface TData {
  departamento: string;
  distrito: string;
  entidad: string;
  poder: string;
  provincia: string;
  sector: string;
}

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

export const dataAtom = atom(async () => {
  return await csv("entidades.csv", (row: any) => row as TData);
});

export const dataSummaryAtom = atom((get) => {
  return rollup(get(dataAtom), getSummary, (o) => o.departamento);
});

export const dataSummaryAllAtom = atom((get) => {
  return getSummary(get(dataAtom));
});

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
