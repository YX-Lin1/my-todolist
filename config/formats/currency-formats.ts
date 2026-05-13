export const currencyFormats = {
  standard: {
    maximumFractionDigits: 2,
  },
  compact: {
    notation: "compact",
    maximumFractionDigits: 2,
  },
  accounting: {
    maximumFractionDigits: 2,
    signDisplay: "always",
  },
  precision: {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  },
  integer: {
    maximumFractionDigits: 0,
  },
} as const;
