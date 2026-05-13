import { defineResources } from "@surgeteam/di/define-resources";
import type { ContainerFromMap, ResolverShape } from "@surgeteam/di/types";
import type { IHttpClient } from "@surgeteam/http-client/types";
import type { AddressesApi } from "./addresses/addresses-api";
import { AddressesApiImpl } from "./addresses/addresses-api-impl";
import { createMainApiClient } from "./client";
import type { UsersApi } from "./users/users-api";
import { UsersApiImpl } from "./users/users-api-impl";
import type { LoginApi } from "./login/login-api";
import { LoginApiImpl } from "./login/login-api-impl";

const mainApiMap = {
  MainApiClient: (): IHttpClient => createMainApiClient(),
  UsersApi: (resolver: ResolverShape): UsersApi =>
    new UsersApiImpl(resolver.get(MainApiTokens.mainApiClient)),
  AddressesApi: (resolver: ResolverShape): AddressesApi =>
    new AddressesApiImpl(resolver.get(MainApiTokens.mainApiClient)),
  LoginApi: (resolver: ResolverShape): LoginApi =>
    new LoginApiImpl(resolver.get(MainApiTokens.mainApiClient)),
};

const mainApiResources = defineResources(mainApiMap, {
  processScopeKeys: ["MainApiClient"],
});

export const MainApiTokens = mainApiResources.tokens;
export const registerMainApi = mainApiResources.register;
export const mainApiGetters = mainApiResources.getters;

export type MainApiContainer = ContainerFromMap<typeof mainApiMap>;
