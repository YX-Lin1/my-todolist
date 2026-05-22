"use client";

import { trpc } from "@/library/trpc/client";

export default function TrpcTodolistsTestPage() {
  const query = trpc.todolists.list.useQuery({});

  if (query.isLoading) return <p>Loading…</p>;
  if (query.isError) {
    return (
      <pre>
        {JSON.stringify(
          { message: query.error.message, code: query.error.data?.code },
          null,
          2
        )}
      </pre>
    );
  }

  return <pre>{JSON.stringify(query.data, null, 2)}</pre>;
}