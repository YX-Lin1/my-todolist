"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            throwOnError: false,
          },
          mutations: {
            retry: false,
            throwOnError: false,
          },
        },
        queryCache: new QueryCache({
          onError: (_error) => {
            return;
          },
        }),
        mutationCache: new MutationCache({
          onError: (_error) => {
            return;
          },
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
