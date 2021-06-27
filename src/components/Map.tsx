import React, { useMemo } from "react";
import { useAtomValue } from "jotai/utils";
import { geoMercator, geoPath, scaleSequential, interpolateBlues } from "d3";
import { geodataAtom, maxCountAtom } from "../atoms/data";
import { Departamento } from "./Departamento";
import "./Map.css";

export const Map: React.FC = () => {
  const data = useAtomValue(geodataAtom);
  const maxEntities = useAtomValue(maxCountAtom);
  const path = useMemo(() => {
    const projection = geoMercator().fitSize([540, 800], data);
    return geoPath(projection);
  }, [data]);
  const scale = useMemo(
    () =>
      scaleSequential().domain([0, maxEntities]).interpolator(interpolateBlues),
    [maxEntities]
  );

  return (
    <svg className="max-w-[400px]" viewBox="0 0 540 800">
      {data.features.map((feature, i) => (
        <Departamento
          key={i}
          departamento={feature.properties.departamento}
          path={path(feature) as string}
          scale={scale}
        />
      ))}
    </svg>
  );
};
