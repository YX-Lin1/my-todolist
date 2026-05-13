export default {
  title: "Security",
  pages: {
    overview: "Overview",
  },
  introduction: {
    title: "Security",
    description:
      "@surgeteam/security is the unified security package for Surge Next.js Framework: built on <nosecone>@nosecone/next</nosecone> and providing defaults, monorepo-friendly option merging, and middleware integration.",
    featuresTitle: "Features",
    features: {
      headers:
        "🛡️ Security headers - inject CSP, Referrer-Policy, HSTS, X-Frame-Options, COEP/COOP/CORP and more via Next.js middleware",
      nonce:
        "🔒 CSP nonce - generate a per-request nonce and inject it into CSP, then expose it to Server Components via <code>x-nonce</code>",
      defaults:
        "⚙️ Defaults - uses <code>@nosecone/next</code> defaults out of the box",
      merge:
        "🧩 Multi-package merge - <code>mergeSecurityOptions()</code> merges options using a “loose merge” strategy",
      middleware:
        "🏭 Middleware factory - <code>createSecurityMiddleware(options?)</code> returns a middleware compatible with Next.js / NEMO",
      types:
        "🧾 Type export - export <code>SecurityOptions</code> from <code>@surgeteam/security/proxy</code> for other packages to declare their needs",
    },
    conceptsTitle: "Core concepts",
    tradeoffsTitle: "Design trade-offs",
    tradeoffsDescription:
      "As an infrastructure package, security headers must be a single output that other packages can contribute to. To keep coupling contained, we use an “app collects, this package applies” approach:",
    tradeoffsItems: {
      appCollect:
        "App layer collects each package’s exported *SecurityOptions, merges them, and applies via middleware.",
      otherPkgDeclare:
        "Other packages only declare and export their options; they don’t depend on merge logic or middleware shape.",
    },
    noseconeTitle: "Relationship with @nosecone/next",
    noseconeDescription:
      "Internally built on <code>createMiddleware</code> and <code>defaults</code>; exposes <code>mergeSecurityOptions</code> and <code>createSecurityMiddleware</code> as the stable integration surface.",
    mergeTitle: "Loose merge strategy",
    mergeDescription:
      "When multiple packages provide options, use <code>mergeSecurityOptions(pkgA, pkgB, ...)</code>. If configurations conflict, the merged result chooses the more permissive side so required capabilities keep working.",
    mergeItems: {
      csp: "CSP - merge directive source lists, dedupe primitives, normalize 'none', and allow disabling by setting CSP=false.",
      policies:
        "Policies - Referrer-Policy / COEP / COOP / CORP / X-Frame-Options prefer the more permissive policy.",
      hsts: "HSTS - pick smaller maxAge; includeSubDomains/preload become false if any side is false.",
    },
    nonceTitle: "Nonce propagation",
    nonceDescription:
      "Middleware generates a nonce, injects it into CSP <code>script-src</code>, and forwards it via <code>x-nonce</code>. In Server Components, read it using <code>getNonce()</code> and pass it to <code>&lt;Script nonce=&quot;...&quot; /&gt;</code>.",
  },
};
