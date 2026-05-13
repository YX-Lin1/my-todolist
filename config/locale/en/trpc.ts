export default {
  title: "tRPC",
  pages: {
    overview: "Overview",
    users: "Users (Client + tRPC)",
  },
  introduction: {
    title: "tRPC",
    docCta: "Read official docs →",
    description:
      "This framework integrates tRPC with the Next.js App Router: shared AppRouter types connect procedures across the wire, and @trpc/react-query pairs with TanStack Query for type-safe queries and mutations in Client Components. The HTTP endpoint is /api/trpc with superjson as the transformer.",
    featuresTitle: "Features",
    features: {
      endToEnd:
        "End-to-end type safety: Router definitions and client hooks share the same TypeScript types.",
      reactQuery:
        "React Query integration: familiar useQuery / useMutation patterns and caching.",
      batching:
        "HTTP batching: httpBatchLink merges requests issued in the same tick.",
      superjson:
        "superjson: serialize richer values like Date and Map between server and client.",
      context:
        "Request context: createTRPCContext can inject the container, auth, and more.",
      serverGuidance:
        "Server-first: in Server Components / Server Actions prefer calling domain services directly; use the tRPC caller only when the RPC boundary is intentional.",
    },
    conceptsTitle: "Core concepts",
    routerTitle: "App router",
    routerDesc:
      "appRouter aggregates sub-routers under library/trpc/routers (e.g. users). The exported AppRouter type powers createTRPCReact.",
    clientTitle: "React client",
    clientDesc:
      "In Client Components import trpc from @/library/trpc/client and use trpc.xxx.yyy.useQuery / useMutation. TRPCProvider is already mounted in the app root layout (nested inside ReactQueryProvider).",
    procedureTitle: "Procedures and input validation",
    procedureDesc:
      "Procedures are built with publicProcedure (and friends) and validate input with Zod schemas (e.g. users.get uses UsersGetRequestSchema).",
    apiTitle: "HTTP adapter",
    apiDesc:
      "The Next.js Route Handler in app/api/trpc/[trpc]/route.ts exposes fetchRequestHandler with endpoint /api/trpc.",
    sections: {
      tryDemos: {
        title: "Explore the demos",
        description: "Continue with the concrete demo pages:",
      },
    },
  },
  users: {
    title: "Users (Client Component Demo)",
    lead: "In a Client Component, call tRPC via trpc.users.get.useQuery. Server Components should prefer services or getTRPCCaller as documented.",
    formLabel: "User id (numeric string)",
    submit: "Load",
    noIdHint:
      "Enter a valid snowflake-style id and submit. The page will call trpc.users.get.useQuery('{ id }').",
    loading: "Loading...",
    resultTitle: "Response",
    friendly: {
      title: "User profile",
      timeZone: "Displayed in timezone: {timeZone}",
      fullName: "Full name",
      email: "Email",
      id: "User id",
      createdAt: "Created at",
      updatedAt: "Updated at",
    },
    errorTitle: "Request failed",
    errorHint: "Check API configuration and that the id exists.",
    errorDetailsLabel: "Details",
  },
};
