export const listFormats = {
  default: {
    type: "conjunction",
    style: "long",
  },
  conjunction: {
    type: "conjunction",
    style: "long",
  },
  conjunctionShort: {
    type: "conjunction",
    style: "short",
  },
  conjunctionNarrow: {
    type: "conjunction",
    style: "narrow",
  },
  disjunction: {
    type: "disjunction",
    style: "long",
  },
  disjunctionShort: {
    type: "disjunction",
    style: "short",
  },
  unit: {
    type: "unit",
    style: "long",
  },
  unitShort: {
    type: "unit",
    style: "short",
  },
  unitNarrow: {
    type: "unit",
    style: "narrow",
  },
} as const;
