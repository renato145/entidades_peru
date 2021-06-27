import { atom } from "jotai";
import { csv } from "d3";
import { TData } from "../types";

export const dataAtom = atom(async () => {
  // const sleep = (delay: number) =>
  //   new Promise((resolve) => setTimeout(resolve, delay));
  // await sleep(1000);
  const data = await csv("entidades.csv", (row: any) => row as TData);
  return data
});
