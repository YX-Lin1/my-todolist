import { defineResources } from "@surgeteam/di/define-resources";
import type { ContainerFromMap, ResolverShape } from "@surgeteam/di/types";
import { MainApiTokens } from "@/library/api/main/registrations";
import type { UsersService } from "@/library/services/users/users-service";
import { UsersServiceImpl } from "@/library/services/users/users-service-impl";
import { serviceErrorProxy } from "./error";

import { LoginServiceImpl } from "./login/login-service-impl";
import type { LoginService } from "./login/login-service";
import { MainDbTokens } from "../db/main/registrations";
import type { TodolistsService } from "./todolists/todolists-service";
import { TodolistsServiceImpl } from "./todolists/todolists-service-impl";

const servicesMap = {
  UsersService: (resolver: ResolverShape): UsersService =>
    serviceErrorProxy(
      new UsersServiceImpl(resolver.get(MainApiTokens.usersApi))
    ),
  LoginService: (resolver: ResolverShape): LoginService =>
    serviceErrorProxy(
      new LoginServiceImpl(resolver.get(MainDbTokens.usersRepository))
    ),
  TodolistsService: (resolver: ResolverShape): TodolistsService =>
    serviceErrorProxy(
      new TodolistsServiceImpl(resolver.get(MainDbTokens.todoRepository))
    ),
};

const services = defineResources(servicesMap);

export const ServicesTokens = services.tokens;
export const registerServices = services.register;
export const servicesGetters = services.getters;

export type ServicesContainer = ContainerFromMap<typeof servicesMap>;
