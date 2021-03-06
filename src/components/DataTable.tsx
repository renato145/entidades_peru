import React, { HTMLProps } from "react";
import { useAtom } from "jotai";
import { useAtomValue } from "jotai/utils";
import { format, descending } from "d3";
import { dataSummaryAtom } from "../atoms/data";
import { colorVarAtom } from "../atoms/plotSettings";
import { mapSelectionAtom } from "../atoms/map";

const headers = [
  "Departamento",
  "Habitantes",
  "#Entidades",
  "#Entidades por\n100mil habitantes",
];

const formatNumber = format(",");

export const DataTable: React.FC<HTMLProps<HTMLDivElement>> = (props) => {
  const [selectedDepartamento, setSelectedDepartamento] =
    useAtom(mapSelectionAtom);
  const colorVar = useAtomValue(colorVarAtom);
  const varIdx = colorVar === "number" ? 2 : 3;
  const data = Array.from(useAtomValue(dataSummaryAtom))
    .map(([departamento, { population, total, density }]) => [
      departamento,
      population,
      total,
      density,
    ])
    .sort((a, b) => descending(a[varIdx], b[varIdx]));

  return (
    <div {...props}>
      <table className="table-auto border border-blue-100">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th
                key={i}
                className={`px-3 py-2 bg-blue-500 text-white font-medium tracking-wide whitespace-pre-line ${
                  i === 0
                    ? "rounded-tl-lg"
                    : i === headers.length - 1
                    ? "rounded-tr-lg"
                    : ""
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className={`${
                row[0] === selectedDepartamento
                  ? "bg-blue-900 text-white"
                  : i % 2 === 0
                  ? "bg-blue-100"
                  : "bg-gray-50"
              } cursor-default`}
              onPointerEnter={() => setSelectedDepartamento(row[0] as string)}
              onPointerLeave={() => setSelectedDepartamento(null)}
            >
              {row.map((v, j) => (
                <td
                  key={j}
                  className={`px-3 py-1.5 ${
                    j === 0 ? "text-left" : "text-right"
                  }`}
                >
                  {j === 1
                    ? formatNumber(v as number)
                    : j === 3
                    ? (v as number).toFixed(2)
                    : v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
