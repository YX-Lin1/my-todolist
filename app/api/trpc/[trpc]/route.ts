//  接收前端每次调用 trpc.xxx.xxx（查待办、改数据等）的请求，处理后返回响应
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
    onError:
      process.env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(`[tRPC] ${path ?? "<no-path>"}`, error.message);
            if (error.cause) console.error("[tRPC] cause:", error.cause);
          }
        : undefined,
  });

export { handler as GET, handler as POST };
