import { defineResources } from "@surgeteam/di/define-resources";
import type { ContainerFromMap, ResolverShape } from "@surgeteam/di/types";
import { createMainDbClient } from "./client";
import type { UsersRepository } from "./users/users-repository";
import { UsersRepositoryImpl } from "./users/users-repository-impl";
import type {TodoRepository} from "./todolists/todolists-repository";
import {TodoRepositoryImpl} from "./todolists/todolists-repository-impl";
import type {SessionsRepository} from "./sessions/sessions-repository";
import {SessionsRepositoryImpl} from "./sessions/sessions-repository-impl";

const mainDbMap = {
  MainDbClient: () => createMainDbClient(),
  UsersRepository: (resolver: ResolverShape): UsersRepository =>
    new UsersRepositoryImpl(resolver.get(MainDbTokens.mainDbClient)),
  TodoRepository: (resolver: ResolverShape): TodoRepository =>
    new TodoRepositoryImpl(resolver.get(MainDbTokens.mainDbClient)),
  SessionsRepository: (resolver: ResolverShape): SessionsRepository =>
    new SessionsRepositoryImpl(resolver.get(MainDbTokens.mainDbClient)),
};

const mainDbResources = defineResources(mainDbMap, {
  processScopeKeys: ["MainDbClient"],
});

export const MainDbTokens = mainDbResources.tokens;
export const registerMainDb = mainDbResources.register;
export const mainDbGetters = mainDbResources.getters;

export type MainDbContainer = ContainerFromMap<typeof mainDbMap>;
