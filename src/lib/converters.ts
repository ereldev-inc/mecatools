export type ConverterUnit = {
  id: string;
  symbol: string;
  /** Value of one unit expressed in the converter's base unit. */
  factor: number;
};

export type ConverterKind = "torque" | "compression";

export const converters: Record<ConverterKind, { units: ConverterUnit[]; defaultUnit: string }> = {
  torque: {
    defaultUnit: "nm",
    units: [
      { id: "nm", symbol: "N·m", factor: 1 },
      { id: "lbft", symbol: "lbf·ft", factor: 1.3558179483314004 },
      { id: "lbin", symbol: "lbf·in", factor: 0.1129848290276167 },
      { id: "kgfm", symbol: "kgf·m", factor: 9.80665 },
    ],
  },
  compression: {
    defaultUnit: "bar",
    units: [
      { id: "bar", symbol: "bar", factor: 1 },
      { id: "psi", symbol: "psi", factor: 0.0689475729 },
      { id: "kpa", symbol: "kPa", factor: 0.01 },
      { id: "kgfcm2", symbol: "kgf/cm²", factor: 0.980665 },
    ],
  },
};
