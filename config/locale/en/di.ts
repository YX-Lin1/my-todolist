export default {
  title: "Dependency Injection",
  pages: {
    overview: "Overview",
  },
  introduction: {
    title: "Dependency Injection",
    description:
      "@surgeteam/di is the unified dependency injection package for Surge Next.js Framework: a lightweight, type-safe, scope-aware DI toolkit with <token>token()</token> for bindings, <defineResources>defineResources()</defineResources> for resource graphs, and <createContainer>createContainer()</createContainer> for per-request container views.",
    featuresTitle: "Features",
    features: {
      typeSafe:
        "🔒 Type-safe - <code>Token<lt></lt>T<gt></gt></code> + <code>resolver.get(token)</code> ensures types match",
      resourceGraph:
        "🧩 Declarative graph - <code>defineResources(<lbrace></lbrace> UserRepo: ... <rbrace></rbrace>)</code> generates tokens / register / getters",
      lifetimes:
        "🧭 Three lifetimes - process (singleton), request (cached per request), transient (new per get)",
      testing:
        "🧪 Test-friendly - <code>RegistryManager.setOverride()</code> can replace any token implementation in tests",
      cycleDetect:
        "🔁 Cycle detection - sync cycles throw a clear dependency chain error",
    },
    conceptsTitle: "Core concepts",
    tokenTitle: "Token: unique identifier for a binding",
    tokenDescription:
      "<code>token(name)</code> returns a <code>Token<lt></lt>T<gt></gt></code> containing a unique <code>Symbol</code>. Same names do not reuse symbols, so a binding must reuse the same token instance.",
    registryTitle:
      "Registry & Resolver: registration and resolution are separated",
    registryItems: {
      manager:
        "<code>RegistryManager</code>: stores registrations (factory + scope) and overrides.",
      resolver:
        "<code>Resolver</code>: resolves via <code>get(token)</code>, delegates scopes, and handles caching.",
    },
    resolverTitle: "Two-level resolver: process & request",
    resolverIntro: "createContainer() creates:",
    resolverItems: {
      process:
        "process resolver: global singleton for process scope (cached at process level).",
      request:
        "request resolver: created per container factory call for request/transient scope (cached per request).",
    },
    resolverSummary:
      "This ensures process singletons are shared across requests, while request resources never become process-global caches.",
  },
};
