export default {
  introduction: {
    title: "Observability",
    docCta: "Read full docs →",
    lead: "@surgeteam/observability is the unified observability package for Surge Next.js Framework: built on an adapter architecture with env toggles, true code-splitting, consistent APIs for error tracking/performance/session replay/logging, and exported security options for CSP.",
    sections: {
      features: {
        title: "Features",
        items: {
          pluggable:
            "🔌 Pluggable by design: adapters are replaceable/composable, enabled via env vars, no app code changes",
          openInterface:
            "📦 Open configuration: register functions accept custom options per platform",
          errorTracking:
            "🐛 Error tracking: consistent capture/reporting across server and client",
          performance:
            "📊 Performance monitoring: track key metrics like page loads and request timings",
          replay:
            "🎥 Session replay: record sessions to reproduce and debug issues",
          logger:
            "📝 Unified logger: Observability.logger supports multiple levels with a stable API across adapters",
          securityHeaders:
            "🛡️ Security headers: export observabilitySecurityOptions to merge into a single CSP policy",
          nextConfig:
            "⚙️ Next.js config integration: withObservabilityConfig composes into next.config.ts",
          instrumentation:
            "🔌 Instrumentation hooks: Node.js + Edge support, plus optional client-side route transition tracking",
          codeSplitting:
            "📊 True code-splitting: when env vars are missing, adapter code is not loaded",
        },
      },
      concepts: {
        title: "Core concepts",
        items: {
          adapterArchitecture: {
            title: "Adapter architecture",
            desc: "Each platform lives in adapters/service-name/ with its own env vars and CSP needs; the app depends on unified APIs.",
          },
          stableInterfaces: {
            title: "Stable interfaces: logging & error capture",
            desc: "Application code calls Observability.logger and Observability.captureException; switching platforms only changes adapter configuration.",
          },
          envToggle: {
            title: "Env toggles & on-demand loading",
            desc: "Adapters are enabled by env vars; when disabled, related code is not bundled/loaded, minimizing size and runtime overhead.",
          },
          securityOptions: {
            title: "Merging security options",
            desc: "Import observabilitySecurityOptions in proxy.ts (or equivalent), merge with other packages, and inject unified response headers.",
          },
        },
      },
    },
  },
};
