import React, { HTMLProps } from "react";
import { useAtom } from "jotai";
import { colorVarAtom } from "../atoms/plotSettings";

const Btn: React.FC<HTMLProps<HTMLButtonElement>> = ({
  className,
  children,
  type,
  ...props
}) => (
  <button
    className="px-2 py-2 bg-blue-400 disabled:bg-blue-500 hover:bg-blue-600 active:bg-blue-800 shadow rounded text-white tracking-wide focus:outline-none focus:ring disabled:ring-4 disabled:ring-blue-800 transition"
    {...props}
  >
    {children}
  </button>
);

export const PlotSettings: React.FC<HTMLProps<HTMLDivElement>> = (props) => {
  const [colorVar, setColorVar] = useAtom(colorVarAtom);

  return (
    <div {...props}>
      <div className="flex flex-col space-y-2">
        <Btn
          onClick={() => setColorVar("number")}
          disabled={colorVar === "number"}
        >
          Visualizar por número de entidades
        </Btn>
        <Btn
          onClick={() => setColorVar("density")}
          disabled={colorVar === "density"}
        >
          <p>Visualizar por densidad</p>
          (entidades por cada 100mil habitantes)
        </Btn>
      </div>
    </div>
  );
};
