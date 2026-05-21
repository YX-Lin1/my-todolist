import { createAppContainer } from "@/library/di/container";

function resolveUserId(): string | undefined {
  const id = process.env.MOCK_USER_ID?.trim();
  return id && id.length > 0 ? id : undefined;
}

export function createTRPCContext(opts?: { req?: Request }) {
  const container = createAppContainer();
  return {
    signal: opts?.req?.signal,
    container,
    userId: resolveUserId(),
  };
}

export type Context = ReturnType<typeof createTRPCContext>;



// import { createAppContainer } from "@/library/di/container";

/**
 * Creates context for tRPC requests. Container is request-scoped for testability.
 */
// export function createTRPCContext(opts?: { req?: Request }) {
//   const container = createAppContainer();
//   return {
//     signal: opts?.req?.signal,
//     container,
//   };
// }

// export type Context = ReturnType<typeof createTRPCContext>;
