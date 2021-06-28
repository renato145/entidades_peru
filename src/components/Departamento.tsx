import React, { useMemo } from "react";
import { createSelectionStatusAtom, mapSelectionAtom } from "../atoms/map";
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
    const isSelectedAtom = createSelectionStatusAtom(departamento);
    const departamentoDataAtom = createDepartamentoDataAtom(departamento);
    return { isSelectedAtom, departamentoDataAtom };
  }, [departamento]);
  const isSelected = useAtomValue(isSelectedAtom);
  const departamentoData = useAtomValue(departamentoDataAtom);
  const setMapSelection = useUpdateAtom(mapSelectionAtom);

  return (
    <path
      className={`land ${isSelected === "selected" ? "selected-land" : ""}`}
      // transform={departamento === 'Callao' ? "translate(-200,-680), scale(2.0)" : ""}
      // transform={
      //   departamento === "Callao" ? "scale(4),translate(-150,-380)" : ""
      // }
      transform={
        departamento === "Callao" ? "scale(4),translate(-140,-384)" : ""
      }
      style={departamento === "Callao" ? {strokeWidth: 0.3} : {}}
      scale={1.9}
      fill={scale(departamentoData?.total ?? 0)}
      opacity={isSelected === "other" ? 0.6 : 1.0}
      d={path}
      onPointerEnter={() => setMapSelection(departamento)}
      onPointerLeave={() => setMapSelection(null)}
    />
  );
};
