"use client";

import type { IHttpClient } from "@surgeteam/http-client/types";
import type { AddressesApi } from "@/library/api/main/addresses/addresses-api";
import { AddressesApiImpl } from "@/library/api/main/addresses/addresses-api-impl";
import {
  createMainApiClient,
  type MainApiClientOptions,
} from "@/library/api/main/client";
import type { UsersApi } from "@/library/api/main/users/users-api";
import { UsersApiImpl } from "@/library/api/main/users/users-api-impl";

let browserMainApiClient: IHttpClient | undefined;
let browserUsersApi: UsersApi | undefined;
let browserAddressesApi: AddressesApi | undefined;

/**
 * Returns a browser-side singleton HttpClient for Client Components.
 */
export function getBrowserMainApiClient(
  options?: MainApiClientOptions
): IHttpClient {
  if (!browserMainApiClient) {
    browserMainApiClient = createMainApiClient(options);
  }
  return browserMainApiClient;
}

/**
 * Returns a browser-side singleton UsersApi for Client Components.
 */
export function getBrowserUsersApi(): UsersApi {
  if (!browserUsersApi) {
    browserUsersApi = new UsersApiImpl(getBrowserMainApiClient());
  }
  return browserUsersApi;
}

/**
 * Returns a browser-side singleton AddressesApi for Client Components.
 */
export function getBrowserAddressesApi(): AddressesApi {
  if (!browserAddressesApi) {
    browserAddressesApi = new AddressesApiImpl(getBrowserMainApiClient());
  }
  return browserAddressesApi;
}
