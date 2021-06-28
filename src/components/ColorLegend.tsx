import React, { useMemo } from "react";
import { range, ScaleSequential, format } from "d3";
import { useAtomValue } from "jotai/utils";
import { Margins, Size } from "../types";
import { selectedDataAtom } from "../atoms/map";
import { colorVarAtom } from "../atoms/plotSettings";

interface Props {
  mapSize: Size;
  legendSize: Size;
  legendMargins: Margins;
  scale: ScaleSequential<string>;
  orientation?: "horizontal" | "vertical";
  ticks?: number;
  tickHeight?: number;
  textOffset?: number;
}

const getAnchor = (p: number) => (p < 20 ? "start" : p > 80 ? "end" : "middle");
const formatNumber = format(",");

export const ColorLegend: React.FC<Props> = ({
  mapSize,
  legendSize,
  legendMargins,
  scale,
  orientation = "horizontal",
  ticks = 0,
  tickHeight = 8,
  textOffset = 15,
}) => {
  const id = useMemo(
    () => `colorLegendGradient${Math.round(Math.random() * 10000)}`,
    []
  );
  const [x0, x1] = scale.domain();
  const selectedData = useAtomValue(selectedDataAtom);
  const selectedDataPerc = ((selectedData?.total ?? 0 - x0) / x1) * 100;
  const selectedDataX = (selectedDataPerc * legendSize.width) / 100;
  const colorVar = useAtomValue(colorVarAtom);

  return (
    <g>
      <linearGradient
        id={id}
        gradientTransform={`rotate(${orientation === "horizontal" ? 0 : 90})`}
      >
        {
          // 11 stops are enough to show a legend
          range(0, 100.01, 20).map((stop, i) => (
            <stop
              key={i}
              offset={`${stop}%`}
              stopColor={scale((x0 + stop * (x1 - x0)) / 100)}
            />
          ))
        }
      </linearGradient>

      <g
        transform={`translate(${legendMargins.left},${
          mapSize.height + legendMargins.top
        })`}
      >
        <text
          x={2}
          y={-6}
          className="text-sm text-gray-800 fill-current font-semibold"
        >
          {colorVar === "number"
            ? "Nro de entidades"
            : "Nro de entidades por 100mil habitantes"}
        </text>
        <rect
          width={legendSize.width}
          height={legendSize.height}
          fill={`url(#${id})`}
          className="text-gray-800 stroke-current"
        />
        <g
          transform={`translate(0, ${
            legendSize.height + legendMargins.bottom
          })`}
        >
          {
            //Ticks
            range(0, 100.01, 100 / (1 + ticks)).map((stop, i) => {
              const x = (stop * legendSize.width) / 100;
              return (
                <g key={i} opacity={selectedData === null ? 1.0 : 0.2}>
                  <line
                    x1={x}
                    x2={x}
                    y1={0}
                    y2={tickHeight}
                    className="text-gray-800 stroke-current"
                  />
                  <text
                    x={x}
                    y={tickHeight + textOffset}
                    textAnchor={getAnchor(stop)}
                    className="text-xs text-gray-800 fill-current"
                  >
                    {formatNumber(x0 + (stop / 100) * (x1 - x0))}
                  </text>
                </g>
              );
            })
          }
          {/* Selected tick */}
          <g
            opacity={selectedData === null ? 0 : 1}
            className="transition-opacity"
          >
            <line
              transform={`translate(${selectedDataX},${0})`}
              y1={0}
              y2={tickHeight}
              className="text-gray-800 stroke-current transition-transform"
            />
            <text
              transform={`translate(${selectedDataX},${0})`}
              y={tickHeight + textOffset}
              textAnchor={getAnchor(selectedDataPerc)}
              className="text-sm text-gray-800 fill-current font-semibold transition-transform"
            >
              {selectedData !== null
                ? `${selectedData.name} (${formatNumber(selectedData.total)})`
                : ""}
            </text>
          </g>
        </g>
      </g>
    </g>
  );
};
