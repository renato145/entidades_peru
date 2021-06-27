import React, { useMemo } from "react";
import { useAtomValue } from "jotai/utils";
import { geoMercator, geoPath } from "d3";
import { geodataAtom } from "../atoms/data";
import { Departamento } from "./Departamento";
import "./Map.css";

export const Map: React.FC = () => {
  const data = useAtomValue(geodataAtom);
  const path = useMemo(() => {
    const projection = geoMercator().fitSize([540, 800], data);
    return geoPath(projection);
  }, [data]);

  return (
    <svg className="max-w-[400px]" viewBox="0 0 540 800">
      {data.features.map((feature, i) => (
        <Departamento
          key={i}
          departamento={feature.properties.departamento}
          path={path(feature) as string}
        />
      ))}
    </svg>
  );
};
