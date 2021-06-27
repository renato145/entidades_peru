import React, { useMemo } from "react";
import { createIsSelectedAtom, mapSelectionAtom } from "../atoms/map";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { ScaleSequential } from "d3";
import { createDepartamentoDataAtom } from "../atoms/data";

interface Props {
  departamento: string;
  path: string;
  scale: ScaleSequential<string>;
}

export const Departamento: React.FC<Props> = ({
  departamento,
  path,
  scale,
}) => {
  const { isSelectedAtom, departamentoDataAtom } = useMemo(() => {
    const isSelectedAtom = createIsSelectedAtom(departamento);
    const departamentoDataAtom = createDepartamentoDataAtom(departamento);
    return { isSelectedAtom, departamentoDataAtom };
  }, [departamento]);
  const isSelected = useAtomValue(isSelectedAtom);
  const departamentoData = useAtomValue(departamentoDataAtom);
  const setMapSelection = useUpdateAtom(mapSelectionAtom);

  return (
    <path
      className={`land ${isSelected ? "selected-land" : ""}`}
      fill={scale(departamentoData?.total ?? 0)}
      d={path}
      onPointerEnter={() => setMapSelection(departamento)}
      onPointerLeave={() => setMapSelection(null)}
    />
  );
};
