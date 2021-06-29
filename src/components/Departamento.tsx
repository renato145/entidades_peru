import React, { useMemo } from "react";
import { createSelectionStatusAtom, mapSelectionAtom } from "../atoms/map";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { ScaleSequential } from "d3";
import { createDepartamentoDataAtom } from "../atoms/data";
import { colorVarAtom } from "../atoms/plotSettings";

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
  const { selectionStatusAtom, departamentoDataAtom } = useMemo(() => {
    const selectionStatusAtom = createSelectionStatusAtom(departamento);
    const departamentoDataAtom = createDepartamentoDataAtom(departamento);
    return { selectionStatusAtom, departamentoDataAtom };
  }, [departamento]);
  const selectionStatus = useAtomValue(selectionStatusAtom);
  const departamentoData = useAtomValue(departamentoDataAtom);
  const setMapSelection = useUpdateAtom(mapSelectionAtom);
  const colorVar = useAtomValue(colorVarAtom);
  const fillColor = scale(
    departamentoData === undefined
      ? 0
      : colorVar === "number"
      ? departamentoData.total
      : departamentoData.density
  );

  return (
    <path
      className={`stroke-current text-gray-700 ${
        selectionStatus === "selected"
          ? "selected-land stroke-[3px]"
          : selectionStatus === "other"
          ? "opacity-25"
          : ""
      }`}
      transform={
        departamento === "Callao" ? "scale(4),translate(-140,-384)" : ""
      }
      style={
        departamento !== "Callao"
          ? {}
          : { strokeWidth: selectionStatus === "selected" ? 0.7 : 0.3 }
      }
      fill={fillColor}
      d={path}
      onPointerEnter={() => setMapSelection(departamento)}
      onPointerLeave={() => setMapSelection(null)}
    />
  );
};
