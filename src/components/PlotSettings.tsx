import React, { HTMLProps } from "react";
import { useUpdateAtom } from "jotai/utils";
import { colorVarAtom } from "../atoms/plotSettings";

const Btn: React.FC<HTMLProps<HTMLButtonElement>> = ({
  className,
  children,
  type,
  ...props
}) => (
  <button
    className="px-2 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-800 shadow rounded text-white text-sm font-medium focus:outline-none focus:ring transition"
    {...props}
  >
    {children}
  </button>
);

export const PlotSettings: React.FC<HTMLProps<HTMLDivElement>> = (props) => {
  const setColorVar = useUpdateAtom(colorVarAtom);

  return (
    <div {...props}>
      <div className="flex flex-col space-y-2">
        <Btn onClick={() => setColorVar("number")}>
          Visualizar por número de entidades
        </Btn>
        <Btn onClick={() => setColorVar("density")}>
          <p>Visualizar por densidad</p>
          (entidades por cada 100mil habitantes)
        </Btn>
      </div>
    </div>
  );
};
