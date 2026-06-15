import { defineResources } from "@surgeteam/di/define-resources";
import type { ContainerFromMap, ResolverShape } from "@surgeteam/di/types";
import { serviceErrorProxy } from "./error";

import { LoginServiceImpl } from "./login/login-service-impl";
import type { LoginService } from "./login/login-service";
import { MainDbTokens } from "../db/main/registrations";
import type { TodolistsService } from "./todolists/todolists-service";
import { TodolistsServiceImpl } from "./todolists/todolists-service-impl";
import { RegisterServiceImpl } from "./register/register-service-impl";
import type { RegisterService } from "./register/register-service";

const servicesMap = {
  LoginService: (resolver: ResolverShape): LoginService =>
    serviceErrorProxy(
      new LoginServiceImpl(
        resolver.get(MainDbTokens.usersRepository), resolver.get(MainDbTokens.sessionsRepository))
    ),
  TodolistsService: (resolver: ResolverShape): TodolistsService =>
    serviceErrorProxy(
      new TodolistsServiceImpl(resolver.get(MainDbTokens.todoRepository))
    ),
  RegisterService: (resolver: ResolverShape): RegisterService =>
    serviceErrorProxy(
      new RegisterServiceImpl(resolver.get(MainDbTokens.usersRepository))
    ),
};

const services = defineResources(servicesMap);

export const ServicesTokens = services.tokens;
export const registerServices = services.register;
export const servicesGetters = services.getters;

export type ServicesContainer = ContainerFromMap<typeof servicesMap>;
