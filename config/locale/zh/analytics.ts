export default {
  introduction: {
    title: "统一分析能力（Analytics）",
    docCta: "查看完整文档 →",
    lead: "@surgeteam/analytics 是 Surge Next.js Framework 的统一分析能力包：基于适配器架构，支持环境变量开关、按需加载、CSP nonce 与安全头导出，并可与 security / observability 协同。",
    sections: {
      features: {
        title: "特性",
        items: {
          pluggable:
            "🔌 插拔式设计：适配器可替换/可组合，环境变量控制启用与禁用，应用代码无需修改",
          openInterface:
            "📦 开放性接口：AnalyticsProvider 的 customOptions 可透传任意配置以适配不同平台",
          cspNonce:
            "🔒 CSP Nonce 支持：由应用传入 nonce，确保第三方脚本可通过严格的 CSP 策略",
          securityHeaders:
            "🛡️ 安全头配置：导出 analyticsSecurityOptions，统一与其它安全配置合并注入响应头",
          nextConfig:
            "⚙️ Next.js 配置集成：withAnalyticsConfig 便于在 next.config.ts 中链式叠加",
          instrumentation:
            "🔌 Instrumentation：提供 server/client hooks，便于在应用启动时初始化",
          codeSplitting:
            "📊 代码按需加载：未设置环境变量时适配器代码不加载，减少体积与运行时开销",
        },
      },
      concepts: {
        title: "核心概念",
        items: {
          adapterArchitecture: {
            title: "适配器架构",
            desc: "各分析平台以 adapters/service-name/ 独立实现：自带环境变量与安全配置；应用层通过统一 Provider 使用。",
          },
          envToggle: {
            title: "环境变量开关与按需加载",
            desc: "是否启用由环境变量决定；未启用时相关代码不会被打包/加载，实现真正的插拔与性能优化。",
          },
          cspNonce: {
            title: "CSP Nonce 机制",
            desc: "在根布局等 Server Component 中获取 nonce，并通过 customOptions 传入 Provider，再由适配器传给 Script，确保脚本可执行。",
          },
          securityOptions: {
            title: "安全头配置合并",
            desc: "在 proxy.ts（或等价入口）中导入 analyticsSecurityOptions，并与其它包的安全配置合并后统一注入响应头。",
          },
        },
      },
    },
  },
};
