import { isMainApiError } from "../api/main/error";
import { ServiceErrorCodes } from "./error-codes";

export class ServiceError extends Error {
  readonly name = "ServiceError";

  readonly code: ServiceErrorCodes;
  readonly details?: unknown;

  constructor(error: unknown, code: ServiceErrorCodes, details?: unknown) {
    super();

    this.cause = error;

    this.code = code;
    this.message = `[ServiceError] ${code}`;
    this.details = details;
  }
}

/**
 * Check if an error is an MainApiError.
 *
 * @param error - The error to check.
 * @returns True if the error is an MainApiError, false otherwise.
 */
export function isServiceError(error: unknown): error is ServiceError {
  return error instanceof Error && error.name === "ServiceError";
}

function mapToServiceError(error: unknown): ServiceError {
  if (isServiceError(error)) {
    return error;
  }

  if (isMainApiError(error)) {
    return new ServiceError(error, error.code, error.details);
  }

  return new ServiceError(error, ServiceErrorCodes.INTERNAL_ERROR);
}

/**
 * Wraps a service instance with a Proxy so every method call:
 * - catches sync throws and async rejections
 * - re-throws a standardized ServiceError (so callers can read `error.code`)
 *
 * Note: Non-function properties are passed through unchanged.
 */
export function serviceErrorProxy<T extends object>(service: T): T {
  return new Proxy(service, {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);

      if (typeof value !== "function") {
        return value;
      }

      return (...args: unknown[]) => {
        try {
          // Preserve original `this` binding for the underlying method
          const result = value.apply(target, args);

          // If it returns a Promise, ensure we catch async rejections too
          if (
            result &&
            typeof (result as Promise<unknown>).then === "function"
          ) {
            return (result as Promise<unknown>).catch((err: unknown) => {
              throw mapToServiceError(err) as unknown as ServiceError;
            });
          }

          return result;
        } catch (err: unknown) {
          // Convert sync throws into standardized ServiceError
          throw mapToServiceError(err) as unknown as ServiceError;
        }
      };
    },
  }) as T;
}
