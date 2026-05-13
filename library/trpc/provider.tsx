"use client";

import { useQueryClient } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { useState } from "react";
import superjson from "superjson";
import { trpc } from "./client";

/**
 * TRPC Provider
 *
 * @remarks
 * - Must be rendered **inside** ReactQueryProvider (QueryClientProvider).
 *   Otherwise useQueryClient() will throw (no provider above).
 * - Layout order: ReactQueryProvider → TRPCProvider → children.
 *
 * @example
 * ```tsx
 * <ReactQueryProvider client={queryClient}>
 *   <TRPCProvider>
 *     {children}
 *   </TRPCProvider>
 * </ReactQueryProvider>
 * ```
 */
export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        ...(process.env.NODE_ENV === "production" ? [] : [loggerLink()]),
        httpBatchLink({
          url: "/api/trpc",
          transformer: superjson,
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      {children}
    </trpc.Provider>
  );
}
