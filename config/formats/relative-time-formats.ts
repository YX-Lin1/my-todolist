export const relativeTimeFormats = {
  long: {
    style: "long",
  },
  short: {
    style: "short",
  },
  narrow: {
    style: "narrow",
  },
  // With specific unit (e.g., always show in days)
  longDays: {
    style: "long",
    unit: "day",
  },
  shortDays: {
    style: "short",
    unit: "day",
  },
  // With numbering system for specific locales
  longLatin: {
    style: "long",
    numberingSystem: "latn",
  },
  longArabic: {
    style: "long",
    numberingSystem: "arab",
  },
  longHanidec: {
    style: "long",
    numberingSystem: "hanidec",
  },
} as const;
