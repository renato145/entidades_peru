import { atom } from "jotai";
import { max, map } from "d3";
import { ColorVar } from "../types";
import { dataSummaryAtom } from "./data";

/** Variable to set the color scale */
export const colorVarAtom = atom<ColorVar>("density");

/** Get the max value for the color scale  */
export const maxColorVarAtom = atom((get) => {
  const data = get(dataSummaryAtom);
  const colorVar = get(colorVarAtom);
  const maxCount = max(
    map(data.values(), ({ total, density }) =>
      colorVar === "number" ? total : density
    )
  );
  return maxCount ?? 0;
});
