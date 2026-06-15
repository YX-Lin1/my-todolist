import { MainApiErrorCodes } from "../api/main/error-codes";

export const ServiceErrorCodes = {
  ...MainApiErrorCodes,
  INVALID_REQUEST: "INVALID_REQUEST",
  INVALID_RESPONSE: "INVALID_RESPONSE",
  INTERNAL_ERROR: "INTERNAL_ERROR",
  LOGIN_FAILED: "LOGIN_FAILED",
  CHECK_TOKEN_FAILED: "CHECK_TOKEN_FAILED",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  UNAUTHORIZED: "UNAUTHORIZED",
  USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
} as const;

export type ServiceErrorCodes = keyof typeof ServiceErrorCodes;
