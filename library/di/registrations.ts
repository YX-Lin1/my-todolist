import "server-only";

import type { RegistryManagerShape, ResolverShape } from "@surgeteam/di/types";
import type { MainApiContainer } from "@/library/api/main/registrations";
import {
  mainApiGetters,
  registerMainApi,
} from "@/library/api/main/registrations";
import type { ServicesContainer } from "@/library/services/registrations";
import {
  registerServices,
  servicesGetters,
} from "@/library/services/registrations";

import { registerMainDb } from "@/library/db/main/registrations";

/**
 * Nested container: mainApi / mainDb / services namespace.
 */
export interface AppContainer {
  mainApi: MainApiContainer;
  services: ServicesContainer;
}

/** Populate the shared registry once at init for this container factory. */
export function registerAll(registry: RegistryManagerShape): void {
  registerMainApi(registry);
  registerMainDb(registry);
  registerServices(registry);
}

export function getters(resolver: ResolverShape): AppContainer {
  return {
    mainApi: mainApiGetters(resolver),
    services: servicesGetters(resolver),
  };
}
