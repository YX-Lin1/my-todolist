export const dateTimeFormats = {
  short: {
    dateStyle: "short",
  },
  shortTime: {
    dateStyle: "short",
    timeStyle: "short",
    hour12: false,
  },
  shortTimeWithSeconds: {
    dateStyle: "short",
    timeStyle: "medium",
    hour12: false,
  },
  long: {
    dateStyle: "long",
  },
  longTime: {
    dateStyle: "long",
    timeStyle: "short",
    hour12: false,
  },
  longTimeWithSeconds: {
    dateStyle: "long",
    timeStyle: "medium",
    hour12: false,
  },
  weekday: {
    weekday: "long",
  },
  medium: {
    dateStyle: "medium",
  },
  mediumTime: {
    dateStyle: "medium",
    timeStyle: "short",
    hour12: false,
  },
  full: {
    dateStyle: "full",
  },
  timeOnly: {
    timeStyle: "short",
    hour12: false,
  },
  timeOnlyWithSeconds: {
    timeStyle: "medium",
    hour12: false,
  },
} as const;
