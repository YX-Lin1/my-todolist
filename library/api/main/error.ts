import type HttpClientError from "@surgeteam/http-client/error";
import {
  HttpClientErrorCodes,
  isHttpClientError,
} from "@surgeteam/http-client/error";
import { MainApiErrorCodes } from "./error-codes";

export class MainApiError extends Error {
  readonly name = "MainApiError";

  readonly httpClientError?: HttpClientError;

  readonly isHttpClientError;

  readonly status: number;

  readonly code: MainApiErrorCodes;

  readonly details?: unknown;

  constructor(error: unknown) {
    super();

    this.cause = error;

    if (isHttpClientError(error)) {
      this.httpClientError = error;
      this.isHttpClientError = true;
      this.status = error.responseConfig?.status ?? 0;

      if (error.code === HttpClientErrorCodes.ABORTED) {
        this.code = MainApiErrorCodes.ABORTED;
        return;
      }

      if (
        error.responseConfig?.data &&
        typeof error.responseConfig?.data === "object"
      ) {
        const body = error.responseConfig?.data as {
          code?: string;
          details?: unknown;
        };
        this.code = (body.code ??
          MainApiErrorCodes.UNKNOWN) as MainApiErrorCodes;
        this.details = body.details;
      } else {
        this.code = MainApiErrorCodes.UNKNOWN;
        this.details = undefined;
      }
    } else {
      this.httpClientError = undefined;
      this.isHttpClientError = false;
      this.status = 0;
      this.code = MainApiErrorCodes.UNKNOWN;
      this.details = undefined;
    }
  }
}

/**
 * Check if an error is an MainApiError.
 *
 * @param error - The error to check.
 * @returns True if the error is an MainApiError, false otherwise.
 */
export function isMainApiError(error: unknown): error is MainApiError {
  return error instanceof Error && error.name === "MainApiError";
}
