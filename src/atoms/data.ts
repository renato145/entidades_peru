import { atom } from "jotai";
import { csv, json } from "d3";
import { feature } from "topojson-client";

export interface TData {
  departamento: string;
  distrito: string;
  entidad: string;
  poder: string;
  provincia: string;
  sector: string;
}

export const dataAtom = atom(async () => {
  // const sleep = (delay: number) =>
  //   new Promise((resolve) => setTimeout(resolve, delay));
  // await sleep(1000);
  const data = await csv("entidades.csv", (row: any) => row as TData);
  return data;
});

export const geodataAtom = atom(async () => {
  // const sleep = (delay: number) =>
  //   new Promise((resolve) => setTimeout(resolve, delay));
  // await sleep(1000);
  const data = await json("departamentos.json").then((topology) => {
    const featureCollection = feature(topology as any, "departamentos");
    return featureCollection as any as GeoJSON.FeatureCollection<
      GeoJSON.Geometry,
      { departamento: string }
    >;
  });
  return data;
});
