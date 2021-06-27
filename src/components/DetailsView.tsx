import { useAtomValue } from "jotai/utils";
import React from "react";
import { mapSelectionAtom } from "../atoms/map";

export const DetailsView: React.FC = () => {
  const mapSelection = useAtomValue(mapSelectionAtom);

  return (
    <div className="ml-2 flex-1 flex flex-col">
      <div className="h-1/2">
        Some details
        <p>{mapSelection}</p>
      </div>
      <div>Some plot</div>
    </div>
  );
};
