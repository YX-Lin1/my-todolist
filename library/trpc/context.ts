import { createAppContainer } from "@/library/di/container";

/**
 * Creates context for tRPC requests. Container is request-scoped for testability.
 */
export function createTRPCContext(opts?: { req?: Request }) {
  const container = createAppContainer();
  return {
    signal: opts?.req?.signal,
    container,
  };
}

export type Context = ReturnType<typeof createTRPCContext>;
