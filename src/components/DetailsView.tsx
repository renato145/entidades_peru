import React, { HTMLProps } from "react";
import { useAtomValue } from "jotai/utils";
import { format } from "d3";
import { dataSummaryAllAtom } from "../atoms/data";
import { mapSelectionAtom, selectedDataAtom } from "../atoms/map";

const formatNumber = format(",");

export const DetailsView: React.FC<HTMLProps<HTMLDivElement>> = ({
  ...props
}) => {
  const mapSelection = useAtomValue(mapSelectionAtom);
  const selectionData = useAtomValue(selectedDataAtom);
  const allData = useAtomValue(dataSummaryAllAtom);
  const showData = selectionData ?? allData;

  return (
    <div {...props}>
      <p className="text-xl font-semibold">
        {mapSelection ?? "Perú"} ({formatNumber(showData.total)} entidades)
      </p>
      <div className="mt-1 w-full flex flex-col space-y-1">
        {showData.entries.map(([poder, n], i) => (
          <div key={i}>
            <p>
              {poder} ({n})
            </p>
            <div
              className="bg-blue-900 h-3"
              style={{ width: `${(100 * n) / showData.max}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
