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
      <p className="text-2xl font-semibold">
        {mapSelection ?? "Perú"}: {formatNumber(showData.total)} entidades
      </p>
      <p className="text-sm tracking-wide font-semibold text-gray-500">
        {showData.density.toFixed(1)} entidades por cada 100mil habitantes
      </p>
      <div className="mt-3 w-full flex flex-col space-y-2">
        {showData.entries.map(([poder, n], i) => (
          <div key={i}>
            <p className="text-sm text-gray-800 font-medium tracking-wide">
              {poder} ({n})
            </p>
            <div
              className="bg-blue-900 h-5"
              style={{ width: `${(100 * n) / showData.max}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
