export default {
  introduction: {
    title: "Analytics",
    docCta: "Read full docs →",
    lead: "@surgeteam/analytics is the unified analytics package for Surge Next.js Framework: built on an adapter architecture with env toggles, true code-splitting, CSP nonce support, and exported security options that work with security / observability.",
    sections: {
      features: {
        title: "Features",
        items: {
          pluggable:
            "🔌 Pluggable by design: adapters are replaceable/composable, enabled via env vars, no app code changes",
          openInterface:
            "📦 Open interface: AnalyticsProvider customOptions can pass through any config per platform",
          cspNonce:
            "🔒 CSP nonce support: accept nonce from the app so third-party scripts work under strict CSP",
          securityHeaders:
            "🛡️ Security headers: export analyticsSecurityOptions for a single merged CSP policy",
          nextConfig:
            "⚙️ Next.js config integration: withAnalyticsConfig composes into next.config.ts",
          instrumentation:
            "🔌 Instrumentation hooks: server/client hooks to initialize analytics at startup",
          codeSplitting:
            "📊 True code-splitting: when env vars are missing, adapter code is not loaded",
        },
      },
      concepts: {
        title: "Core concepts",
        items: {
          adapterArchitecture: {
            title: "Adapter architecture",
            desc: "Each platform lives in adapters/service-name/ with its own env vars and CSP needs; the app uses a single Provider API.",
          },
          envToggle: {
            title: "Env toggles & on-demand loading",
            desc: "Adapters are enabled by env vars; when disabled, related code is not bundled/loaded, minimizing size and runtime overhead.",
          },
          cspNonce: {
            title: "CSP nonce flow",
            desc: "Fetch nonce in the app (e.g. root layout), pass via customOptions, and let adapters forward it to Script components.",
          },
          securityOptions: {
            title: "Merging security options",
            desc: "Import analyticsSecurityOptions in proxy.ts (or equivalent), merge with other packages, and inject the unified headers.",
          },
        },
      },
    },
  },
};
