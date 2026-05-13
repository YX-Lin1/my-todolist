export default {
  title: "依赖注入",
  pages: {
    overview: "概述",
  },
  introduction: {
    title: "依赖注入（Dependency Injection）",
    description:
      "@surgeteam/di 是 Surge Next.js Framework 的统一依赖注入能力包：提供轻量、类型安全、可分作用域的 DI 工具集，可用 <token>token()</token> 声明绑定、用 <defineResources>defineResources()</defineResources> 批量定义资源图，并通过 <createContainer>createContainer()</createContainer> 生成「每次请求一个容器视图」的工厂函数。",
    featuresTitle: "特性",
    features: {
      typeSafe:
        "🔒 类型安全 - <code>Token<lt></lt>T<gt></gt></code> + <code>resolver.get(token)</code> 保证解析类型正确",
      resourceGraph:
        "🧩 声明式资源图 - <code>defineResources(<lbrace></lbrace> UserRepo: ... <rbrace></rbrace>)</code> 一次生成 tokens / register / getters",
      lifetimes:
        "🧭 三种生命周期 - process（进程单例）、request（每次请求缓存）、transient（每次 get 都新建）",
      testing:
        "🧪 测试友好 - <code>RegistryManager.setOverride()</code> 可在测试中替换任意 token 的实现",
      cycleDetect: "🔁 循环依赖检测 - 同步循环依赖会抛出清晰的链路错误",
    },
    conceptsTitle: "核心概念",
    tokenTitle: "Token：绑定的唯一标识",
    tokenDescription:
      "<code>token(name)</code> 会返回一个包含唯一 <code>Symbol</code> 的 <code>Token<lt></lt>T<gt></gt></code>。同名也不会复用 symbol，因此同一个 binding 必须复用同一个 token 实例。",
    registryTitle: "Registry 与 Resolver：注册与解析分离",
    registryItems: {
      manager:
        "<code>RegistryManager</code>：只负责保存注册信息（factory + scope）与 override。",
      resolver:
        "<code>Resolver</code>：负责 <code>get(token)</code> 时的解析、作用域委派与缓存。",
    },
    resolverTitle: "两级 Resolver：process 与 request",
    resolverIntro: "createContainer() 内部会创建：",
    resolverItems: {
      process:
        "process resolver：全局单例，用于解析 process scope（并缓存进程级实例）",
      request:
        "request resolver：每次调用容器工厂创建一个，用于解析 request/transient scope（并缓存请求级实例）",
    },
    resolverSummary:
      "这样可以确保：process 单例在所有请求间共享，request 资源不会意外变成进程全局缓存。",
  },
};
