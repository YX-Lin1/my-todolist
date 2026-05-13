import { defineResources } from "@surgeteam/di/define-resources";
import type { ContainerFromMap, ResolverShape } from "@surgeteam/di/types";
import { MainApiTokens } from "@/library/api/main/registrations";
import type { UsersService } from "@/library/services/users/users-service";
import { UsersServiceImpl } from "@/library/services/users/users-service-impl";
import { serviceErrorProxy } from "./error";

const servicesMap = {
  UsersService: (resolver: ResolverShape): UsersService =>
    serviceErrorProxy(
      new UsersServiceImpl(resolver.get(MainApiTokens.usersApi))
    ),
};

const services = defineResources(servicesMap);

export const ServicesTokens = services.tokens;
export const registerServices = services.register;
export const servicesGetters = services.getters;

export type ServicesContainer = ContainerFromMap<typeof servicesMap>;
