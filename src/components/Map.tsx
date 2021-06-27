import React from "react";
import { useAtomValue } from "jotai/utils";
import { geoEqualEarth, geoPath } from "d3";
import { geodataAtom } from "../atoms/data";

const projection = geoEqualEarth();
const path = geoPath(projection);

export const Map: React.FC = () => {
  const data = useAtomValue(geodataAtom);

  return (
    <div>
      Map data:
      <svg width={500} height={500}>
        {data.features.map((feature, i) => (
          <path key={i} className="fill-[#af3535]" d={path(feature) as string} />
        ))}
      </svg>
    </div>
  );
};
