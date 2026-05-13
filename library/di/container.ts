import "server-only";

import { createContainer } from "@surgeteam/di/create-container";
import { cache } from "react";
import type { AppContainer } from "./registrations";
import { getters, registerAll } from "./registrations";

export const createAppContainer = createContainer<AppContainer>({
  registerAll,
  getters,
});

/**
 * Shared per-request DI container instance.
 *
 * - Same request: shared across Server Components and Server Actions.
 * - Different requests: isolated (request-scoped tokens won't leak across users).
 */
export const getAppContainer = cache(createAppContainer);
