import React from "react";
import { useAtomValue } from "jotai/utils";
import { format } from "d3";
import { dataSummaryAllAtom } from "../atoms/data";
import { mapSelectionAtom, selectionDataAtom } from "../atoms/map";

const formatNumber = format(",");

export const DetailsView: React.FC = () => {
  const mapSelection = useAtomValue(mapSelectionAtom);
  const selectionData = useAtomValue(selectionDataAtom);
  const allData = useAtomValue(dataSummaryAllAtom);
  const showData = selectionData ?? allData;

  return (
    <div className="ml-2 flex-1 flex flex-col max-w-[300px]">
      <div>
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
                className="bg-blue-500 h-3"
                style={{ width: `${(100 * n) / showData.max}%` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
