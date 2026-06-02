export const MainApiErrorCodes = {
  UNKNOWN: "UNKNOWN",
  ABORTED: "ABORTED",
  USER_NOT_FOUND: "USER_NOT_FOUND",
} as const;

export type MainApiErrorCodes = keyof typeof MainApiErrorCodes;
