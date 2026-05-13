export default {
  title: "安全",
  pages: {
    overview: "概述",
  },
  introduction: {
    title: "统一安全能力（Security）",
    description:
      "@surgeteam/security 是 Surge Next.js Framework 的统一安全能力包：基于 <nosecone>@nosecone/next</nosecone> 封装，提供默认策略、多包配置合并与中间件集成能力。",
    featuresTitle: "特性",
    features: {
      headers:
        "🛡️ 安全响应头 - 通过 Next.js 中间件注入 CSP、Referrer-Policy、HSTS、X-Frame-Options、COEP/COOP/CORP 等",
      nonce:
        "🔒 CSP Nonce - 为每个请求生成 nonce 注入 CSP，并通过 <code>x-nonce</code> 传递给 Server Components",
      defaults:
        "⚙️ 默认策略 - 开箱即用，使用 <code>@nosecone/next</code> defaults",
      merge:
        "🧩 多包合并 - <code>mergeSecurityOptions()</code> 以「宽松合并」规则组合多段配置，避免互相覆盖",
      middleware:
        "🏭 中间件工厂 - <code>createSecurityMiddleware(options?)</code> 生成可直接挂载的安全中间件（Next.js / NEMO 形态）",
      types:
        "🧾 类型导出 - 从 <code>@surgeteam/security/proxy</code> 导出 <code>SecurityOptions</code> 类型，供各包声明自身需求",
    },
    conceptsTitle: "核心概念",
    tradeoffsTitle: "设计取舍",
    tradeoffsDescription:
      "作为基础设施包，安全头需要成为统一出口，并允许其它包参与声明。为尽量保持解耦，采用「应用聚合、本包统一处理」的方式：",
    tradeoffsItems: {
      appCollect:
        "应用层收集各包导出的 *SecurityOptions，合并后交给中间件统一注入。",
      otherPkgDeclare:
        "其它包只声明并导出自身的安全头需求，不依赖合并逻辑或中间件形态。",
    },
    noseconeTitle: "与 @nosecone/next 的关系",
    noseconeDescription:
      "内部基于 <code>createMiddleware</code> 与 <code>defaults</code>，对外提供稳定的 <code>mergeSecurityOptions</code> 与 <code>createSecurityMiddleware</code> 接口。",
    mergeTitle: "合并策略（宽松合并）",
    mergeDescription:
      "当多个包提供配置时，使用 <code>mergeSecurityOptions(pkgA, pkgB, ...)</code> 合并。若配置冲突，合并结果会选择更宽松的一侧，保证任一包所需能力不被更严格策略挡住。",
    mergeItems: {
      csp: "CSP - 指令 source 数组合并与去重、'none' 规范化，并允许通过 CSP=false 关闭（最宽松）。",
      policies:
        "策略头 - Referrer-Policy / COEP / COOP / CORP / X-Frame-Options 等在多策略时选取更宽松的一档。",
      hsts: "HSTS - maxAge 取更小值；includeSubDomains/preload 任一方为 false 则结果为 false。",
    },
    nonceTitle: "Nonce 传递链路",
    nonceDescription:
      "中间件生成 nonce，注入 CSP 的 <code>script-src</code>，并通过 <code>x-nonce</code> 传递。Server Components 中用 <code>getNonce()</code> 读取，再传给 <code>&lt;Script nonce=&quot;...&quot; /&gt;</code>。",
  },
};
