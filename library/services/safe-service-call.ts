import { getAppContainer } from "@/library/di/container";
import { isServiceError, ServiceError } from "./error";
import { ServiceErrorCodes } from "./error-codes";
import type { ServicesContainer } from "./registrations";

export type SafeServiceCallResult<T> =
  | { success: true; data: T }
  | { success: false; error: ServiceError };

export async function safeServiceCall<T>(
  call: (services: ServicesContainer) => Promise<T>,
  services: ServicesContainer = getAppContainer().services
): Promise<SafeServiceCallResult<T>> {
  try {
    return { success: true, data: await call(services) };
  } catch (error) {
    if (isServiceError(error)) {
      return { success: false, error };
    }
    return {
      success: false,
      error: new ServiceError(error, ServiceErrorCodes.INTERNAL_ERROR),
    };
  }
}
