import { defineResources } from "@surgeteam/di/define-resources";
import type { ContainerFromMap, ResolverShape } from "@surgeteam/di/types";
import { createMainDbClient } from "./client";
import type { OrdersRepository } from "./orders/orders-repository";
import { OrdersRepositoryImpl } from "./orders/orders-repository-impl";
import type { ProductsRepository } from "./products/products-repository";
import { ProductsRepositoryImpl } from "./products/products-repository-impl";
import type { UsersRepository } from "./users/users-repository";
import { UsersRepositoryImpl } from "./users/users-repository-impl";

const mainDbMap = {
  MainDbClient: () => createMainDbClient(),
  UsersRepository: (resolver: ResolverShape): UsersRepository =>
    new UsersRepositoryImpl(resolver.get(MainDbTokens.mainDbClient)),
  OrdersRepository: (resolver: ResolverShape): OrdersRepository =>
    new OrdersRepositoryImpl(resolver.get(MainDbTokens.mainDbClient)),
  ProductsRepository: (resolver: ResolverShape): ProductsRepository =>
    new ProductsRepositoryImpl(resolver.get(MainDbTokens.mainDbClient)),
};

const mainDbResources = defineResources(mainDbMap, {
  processScopeKeys: ["MainDbClient"],
});

export const MainDbTokens = mainDbResources.tokens;
export const registerMainDb = mainDbResources.register;
export const mainDbGetters = mainDbResources.getters;

export type MainDbContainer = ContainerFromMap<typeof mainDbMap>;
