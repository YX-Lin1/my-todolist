import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createTRPCContext } from "@/library/trpc/context";
import { appRouter } from "@/library/trpc/routers";

// Export API handler
// @link https://trpc.io/docs/v11/server/adapters
const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ req }),
  });

export { handler as GET, handler as POST };
