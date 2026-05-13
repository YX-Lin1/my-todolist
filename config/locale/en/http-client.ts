export default {
  title: "HTTP Client",
  pages: {
    overview: "Overview",
    users: "Users (Client + React Query)",
  },
  introduction: {
    title: "HTTP Client",
    docCta: "Read full docs →",
    description:
      "@surgeteam/http-client is the unified HTTP client package for Surge Next.js Framework: it uses an adapter architecture to decouple transport from request configuration/processing, ships with a Fetch-based adapter by default, and supports custom adapters for different runtimes and requirements.",
    featuresTitle: "Features",
    features: {
      adapter:
        "🔌 Adapter architecture: built-in Fetch adapter, customizable and extensible.",
      interface:
        "📐 IHttpClient interface: easy dependency injection and unit-test mocking.",
      types:
        "🔒 Type safety: full TypeScript support with inference and checks.",
      interceptors:
        "🔌 Interceptor system: request/response interceptors for cross-cutting concerns.",
      timeoutAbort:
        "⏱️ Timeout + AbortSignal: built-in timeout and cancellation support.",
      nextjs:
        "🔄 Next.js integration: supports fetch extensions like revalidate and tags.",
      errorHandling: "🛡️ Error handling: rich error types and guard helpers.",
    },
    conceptsTitle: "Core concepts",
    instanceTitle: "HttpClient instance",
    instanceDesc:
      "Create an HttpClient instance with optional base configuration like baseURL and timeout.",
    methodsTitle: "Request methods",
    methodsDesc:
      "Convenience methods are available for common HTTP verbs: get, post, put, patch, delete, and more.",
    transformsTitle: "Interceptors and transformers",
    transforms: {
      requestInterceptor:
        "Request interceptor: modify config or inject context before sending.",
      responseInterceptor:
        "Response interceptor: handle status and errors uniformly before return.",
      requestTransformer:
        "Request transformer: convert outgoing request data shape.",
      responseTransformer:
        "Response transformer: convert incoming response payload shape.",
    },
    errorTitle: "Error handling",
    errorDesc:
      "HttpClientError provides normalized error codes, request/response context, and type guards for stable application-level error routing.",
    adapterTitle: "Adapter architecture",
    adapterDesc:
      "HttpClient abstracts transport as an Adapter so you can switch implementations while keeping a unified top-level API. Fetch is the default, and you can also specify a built-in adapter explicitly or pass a custom adapter function.",
    sections: {
      tryDemos: {
        title: "Explore the demos",
        description: "Continue with the concrete demo pages:",
      },
    },
  },
  users: {
    title: "Users (Client Component Demo)",
    lead: "In a Client Component, call the API via getBrowserUsersApi() + React Query. Server Components should call http-client through services.",
    formLabel: "User id (numeric string)",
    submit: "Load",
    noIdHint:
      "Enter a valid snowflake-style id and submit. The page will call getBrowserUsersApi().get('{ path: { id } }').",
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
  },
};
