export const MainApiErrorCodes = {
  UNKNOWN: "UNKNOWN",
  ABORTED: "ABORTED",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  LOGIN_FAILED: "LOGIN_FAILED",
} as const;

export type MainApiErrorCodes = keyof typeof MainApiErrorCodes;
