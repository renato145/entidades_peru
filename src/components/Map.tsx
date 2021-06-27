import React, { useMemo } from "react";
import { useAtomValue } from "jotai/utils";
import { geoMercator, geoPath } from "d3";
import { geodataAtom } from "../atoms/data";

export const Map: React.FC = () => {
  const data = useAtomValue(geodataAtom);
  const path = useMemo(() => {
    const projection = geoMercator().fitSize([540, 800], data);
    return geoPath(projection);
  }, [data]);

  return (
    <svg className="" width={300} viewBox="0 0 540 800">
      {data.features.map((feature, i) => (
        <path key={i} className="fill-[#296365]" d={path(feature) as string} />
      ))}
    </svg>
  );
};
