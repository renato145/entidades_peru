import React, { HTMLProps } from "react";

export const PlotSettings: React.FC<HTMLProps<HTMLDivElement>> = (props) => {
  return (
    <div {...props}>
      <p>Visualizar por número de entidades</p>
      <p>Visualizar por densidad (población / número de entidades)</p>
    </div>
  );
};
