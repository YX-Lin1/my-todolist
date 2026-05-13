export default {
  introduction: {
    title: "统一可观测性能力（Observability）",
    docCta: "查看完整文档 →",
    lead: "@surgeteam/observability 是 Surge Next.js Framework 的统一可观测性能力包：基于适配器架构，支持环境变量开关、按需加载，覆盖错误追踪、性能监控、会话重放与统一日志接口，并支持安全头配置导出。",
    sections: {
      features: {
        title: "特性",
        items: {
          pluggable:
            "🔌 插拔式设计：适配器可替换/可组合，环境变量控制启用与禁用，应用代码无需修改",
          openInterface:
            "📦 开放性接口：register 函数支持传入自定义配置，适配不同平台的个性化需求",
          errorTracking: "🐛 错误追踪：统一捕获与上报接口，覆盖服务端与客户端",
          performance:
            "📊 性能监控：自动追踪关键性能指标（页面加载、请求耗时等）",
          replay: "🎥 会话重放：记录用户会话以复现问题并辅助调试",
          logger:
            "📝 统一日志接口：Observability.logger 支持多级别日志，切换平台时接口保持稳定",
          securityHeaders:
            "🛡️ 安全头配置：导出 observabilitySecurityOptions，与其它安全配置统一合并注入",
          nextConfig:
            "⚙️ Next.js 配置集成：withObservabilityConfig 便于在 next.config.ts 中链式叠加",
          instrumentation:
            "🔌 Instrumentation：支持 Node.js 与 Edge 运行时的 hooks，并提供客户端路由转换追踪",
          codeSplitting:
            "📊 代码按需加载：未设置环境变量时适配器代码不加载，减少体积与运行时开销",
        },
      },
      concepts: {
        title: "核心概念",
        items: {
          adapterArchitecture: {
            title: "适配器架构",
            desc: "各平台以 adapters/service-name/ 独立实现：自带环境变量与安全配置；应用层通过统一接口使用。",
          },
          stableInterfaces: {
            title: "稳定接口：日志与错误捕获",
            desc: "应用代码依赖 Observability.logger 与 Observability.captureException；切换平台时仅需调整适配器配置。",
          },
          envToggle: {
            title: "环境变量开关与按需加载",
            desc: "是否启用由环境变量决定；未启用时相关代码不会被打包/加载，实现真正的插拔与性能优化。",
          },
          securityOptions: {
            title: "安全头配置合并",
            desc: "在 proxy.ts（或等价入口）中导入 observabilitySecurityOptions，并与其它包的安全配置合并后统一注入响应头。",
          },
        },
      },
    },
  },
};
