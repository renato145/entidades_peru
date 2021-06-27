import { atom } from "jotai";
import { dataSummaryAtom } from "./data";

export const mapSelectionAtom = atom<string | null>(null);

export const createSelectionStatusAtom = (check: string) =>
  atom((get) => {
    const mapSelection = get(mapSelectionAtom);
    return mapSelection === null
      ? "empty"
      : mapSelection === check
      ? "selected"
      : "other";
  });

export const selectedDataAtom = atom((get) => {
  const selection = get(mapSelectionAtom);
  if (selection === null) return null;
  const data = get(dataSummaryAtom).get(selection);
  return data === undefined ? null : { name: selection, ...data };
});
