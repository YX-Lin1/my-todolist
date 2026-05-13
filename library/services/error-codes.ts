import { MainApiErrorCodes } from "../api/main/error-codes";

export const ServiceErrorCodes = {
  ...MainApiErrorCodes,
  INVALID_REQUEST: "INVALID_REQUEST",
  INVALID_RESPONSE: "INVALID_RESPONSE",
  INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;

export type ServiceErrorCodes = keyof typeof ServiceErrorCodes;
