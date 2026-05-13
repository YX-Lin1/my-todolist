import HttpClient from "@surgeteam/http-client/http-client";
import type { IHttpClient } from "@surgeteam/http-client/types";
import { env } from "@/env";
import { MainApiError } from "./error";

export interface MainApiClientOptions {
  baseURL?: string;
  timeout?: number;
}

/**
 * Creates the main API provider HttpClient. Used by container; inject options in tests.
 */
export function createMainApiClient(
  options?: MainApiClientOptions
): IHttpClient {
  const client = new HttpClient({
    baseURL: options?.baseURL ?? env.NEXT_PUBLIC_MAIN_API_URL,
    timeout: options?.timeout ?? 10_000,
  });

  client.interceptors.response.use(undefined, (error) => {
    throw new MainApiError(error);
  });

  return client;
}
