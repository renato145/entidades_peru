import React, { useMemo } from "react";
import { useAtomValue } from "jotai/utils";
import { geoMercator, geoPath, scaleSequential, interpolateBlues } from "d3";
import { geodataAtom } from "../atoms/data";
import { Departamento } from "./Departamento";
import { Margins, Size } from "../types";
import { ColorLegend } from "./ColorLegend";
import { maxColorVarAtom } from "../atoms/plotSettings";
import "./Map.css";

const mapSize: Size = { width: 540, height: 800 };
const svgSize: Size = { width: mapSize.width, height: mapSize.height + 75 };
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
  const maxColorVar = useAtomValue(maxColorVarAtom);
  const path = useMemo(() => {
    const projection = geoMercator().fitSize(
      [mapSize.width, mapSize.height],
      data
    );
    return geoPath(projection);
  }, [data]);
  const scale = useMemo(
    () =>
      scaleSequential().domain([0, maxColorVar]).interpolator(interpolateBlues),
    [maxColorVar]
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
