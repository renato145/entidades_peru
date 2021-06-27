import { atom } from "jotai";

export const mapSelectionAtom = atom<string | null>(null);
export const isSelectedAtom = (check: string) =>
  atom((get) => get(mapSelectionAtom) === check);
