export const numberFormats = {
  decimal: {
    maximumFractionDigits: 2,
  },
  decimalWithGrouping: {
    useGrouping: true,
    maximumFractionDigits: 2,
  },
  compact: {
    notation: "compact",
  },
  compactLong: {
    notation: "compact",
    compactDisplay: "long",
  },
  compactShort: {
    notation: "compact",
    compactDisplay: "short",
  },
  percent: {
    style: "percent",
    maximumFractionDigits: 2,
  },
  percentDecimal: {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  integer: {
    maximumFractionDigits: 0,
  },
  precision: {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  },
} as const;
