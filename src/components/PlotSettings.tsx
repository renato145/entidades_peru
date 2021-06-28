import React, { HTMLProps } from "react";

export const PlotSettings: React.FC<HTMLProps<HTMLDivElement>> = (props) => {
  return (
    <div {...props}>
      <p>Visualizar por número de entidades</p>
      <p>Visualizar por densidad (número de entidades por cada mil habitantes)</p>
    </div>
  );
};
