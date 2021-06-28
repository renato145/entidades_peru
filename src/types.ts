export interface TData {
  departamento: string;
  distrito: string;
  entidad: string;
  poder: string;
  provincia: string;
  sector: string;
}

export interface TPopulationData {
  departamento: string;
  total: number;
}

export interface TSummaryData {
  population: number;
  density: number;
  entries: [string, number][];
  total: number;
  max: number;
}

export type ColorVar = "number" | "density";

export type Margins = Record<"left" | "right" | "top" | "bottom", number>;
export type Size = Record<"width" | "height", number>;
