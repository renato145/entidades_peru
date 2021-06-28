import React, { useMemo } from "react";
import { useAtomValue } from "jotai/utils";
import { geoMercator, geoPath, scaleSequential, interpolateBlues } from "d3";
import { geodataAtom, maxCountAtom } from "../atoms/data";
import { Departamento } from "./Departamento";
import "./Map.css";
import { Margins, Size } from "../types";
import { ColorLegend } from "./ColorLegend";

const mapSize: Size = { width: 540, height: 800 };
const svgSize: Size = { width: mapSize.width, height: mapSize.height + 100 };
const legendMargins: Margins = {
  left: 20,
  right: 20,
  top: 10,
  bottom: 0,
};
const legendSize: Size = {
  width: svgSize.width - legendMargins.left - legendMargins.right,
  height: 30,
};

export const Map: React.FC = () => {
  const data = useAtomValue(geodataAtom);
  const maxEntities = useAtomValue(maxCountAtom);
  const path = useMemo(() => {
    const projection = geoMercator().fitSize(
      [mapSize.width, mapSize.height],
      data
    );
    return geoPath(projection);
  }, [data]);
  const scale = useMemo(
    () =>
      scaleSequential().domain([0, maxEntities]).interpolator(interpolateBlues),
    [maxEntities]
  );

  return (
    <svg
      className="max-w-[400px]"
      viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
    >
      {data.features.map((feature, i) => (
        <Departamento
          key={i}
          departamento={feature.properties.departamento}
          path={path(feature) as string}
          scale={scale}
        />
      ))}
      <ColorLegend
        mapSize={mapSize}
        legendSize={legendSize}
        legendMargins={legendMargins}
        scale={scale}
      />
    </svg>
  );
};
