import React, { useMemo } from "react";
import { isSelectedAtom, mapSelectionAtom } from "../atoms/map";
import { useAtomValue, useUpdateAtom } from "jotai/utils";

interface Props {
  departamento: string;
  path: string;
}

export const Departamento: React.FC<Props> = ({ departamento, path }) => {
  const selectedAtom = useMemo(
    () => isSelectedAtom(departamento),
    [departamento]
  );
  const selected = useAtomValue(selectedAtom);
  const setMapSelection = useUpdateAtom(mapSelectionAtom);

  return (
    <path
      className={`land ${selected ? "selected-land" : ""}`}
      d={path}
      onPointerEnter={() => setMapSelection(departamento)}
    />
  );
};
