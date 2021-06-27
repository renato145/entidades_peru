export interface TData {
  departamento: string;
  distrito: string;
  entidad: string;
  poder: string;
  provincia: string;
  sector: string;
}

export type Margins = Record<"left" | "right" | "top" | "bottom", number>;
export type Size = Record<"width" | "height", number>;
