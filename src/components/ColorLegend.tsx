import React, { useMemo } from "react";
import { range, ScaleSequential, format } from "d3";
import { useAtomValue } from "jotai/utils";
import { Margins, Size } from "../types";
import { selectedDataAtom } from "../atoms/map";

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
  ticks = 2,
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
          {
            // Selected Tick
            selectedData !== null ? (
              <g>
                <line
                  x1={selectedDataX}
                  x2={selectedDataX}
                  y1={0}
                  y2={tickHeight}
                  className="text-gray-800 stroke-current"
                />
                <text
                  x={selectedDataX}
                  y={tickHeight + textOffset}
                  textAnchor={getAnchor(selectedDataPerc)}
                  className="text-sm text-gray-800 fill-current font-semibold"
                >
                  {`${selectedData.name} (${formatNumber(selectedData.total)})`}
                </text>
              </g>
            ) : null
          }
        </g>
      </g>
    </g>
  );
};
