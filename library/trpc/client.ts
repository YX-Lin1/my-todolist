import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "./routers";

export const trpc: ReturnType<typeof createTRPCReact<AppRouter>> =
  createTRPCReact<AppRouter>({ abortOnUnmount: true });
