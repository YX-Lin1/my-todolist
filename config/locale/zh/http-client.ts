export default {
  title: "HTTP 客户端",
  pages: {
    overview: "概述",
    users: "Users（客户端 + React Query）",
  },
  introduction: {
    title: "HTTP 客户端（HTTP Client）",
    docCta: "查看完整文档 →",
    description:
      "@surgeteam/http-client 是 Surge Next.js Framework 的统一 HTTP 客户端能力包：采用适配器架构，将“如何发请求”与“如何配置与处理请求”解耦；默认内置基于 Fetch API 的适配器，并支持自定义扩展以适配不同运行时与业务场景。",
    featuresTitle: "特性",
    features: {
      adapter: "🔌 适配器架构：默认 Fetch 适配器，支持自定义或扩展。",
      interface: "📐 IHttpClient 接口：便于依赖注入与单元测试 mock。",
      types: "🔒 类型安全：完整 TypeScript 支持，含类型推断与校验。",
      interceptors: "🔌 拦截器系统：支持请求与响应拦截器，统一处理横切逻辑。",
      timeoutAbort: "⏱️ 超时控制 + AbortSignal：支持请求超时与取消。",
      nextjs:
        "🔄 Next.js 集成：兼容 Next.js fetch 扩展能力（如 revalidate 与 tags）。",
      errorHandling: "🛡️ 错误处理：提供完善错误类型与类型守卫。",
    },
    conceptsTitle: "核心概念",
    instanceTitle: "HttpClient 实例",
    instanceDesc:
      "创建 HttpClient 实例时可传入基础配置，例如 baseURL 与 timeout。",
    methodsTitle: "请求方法",
    methodsDesc:
      "内置常见 HTTP 动词便捷方法：get、post、put、patch、delete 等。",
    transformsTitle: "拦截器与数据转换器",
    transforms: {
      requestInterceptor: "请求拦截器：在请求发送前修改配置或注入上下文。",
      responseInterceptor: "响应拦截器：在响应返回前统一处理状态与错误。",
      requestTransformer: "请求转换器：在发送前转换请求数据格式。",
      responseTransformer: "响应转换器：在接收后转换响应数据结构。",
    },
    errorTitle: "错误处理",
    errorDesc:
      "通过 HttpClientError 提供统一错误码、请求/响应上下文，以及配套类型守卫，便于在应用层进行稳定的异常分流处理。",
    adapterTitle: "适配器架构",
    adapterDesc:
      "HttpClient 将底层请求实现抽象为 Adapter，在保持统一上层 API 的前提下，可灵活切换底层实现。默认使用 Fetch 适配器，也可显式指定或传入自定义适配器函数。",
    sections: {
      tryDemos: {
        title: "继续查看示例",
        description: "你可以继续查看具体示例页面：",
      },
    },
  },
  users: {
    title: "Users（客户端组件示例）",
    lead: "在客户端组件中通过 getBrowserUsersApi() + React Query 调用 API。服务端组件应通过 services 间接调用 http-client。",
    formLabel: "用户 id（数字字符串）",
    submit: "加载",
    noIdHint:
      "输入合法的 snowflake 风格 id 并提交。页面将调用 getBrowserUsersApi().get('{ path: { id } }')。",
    loading: "请求中...",
    resultTitle: "响应",
    friendly: {
      title: "用户信息",
      timeZone: "当前展示时区：{timeZone}",
      fullName: "姓名",
      email: "邮箱",
      id: "用户 id",
      createdAt: "创建时间",
      updatedAt: "更新时间",
    },
    errorTitle: "请求失败",
    errorHint: "请检查 API 配置以及 id 是否存在。",
  },
};
