export default {
  title: "tRPC",
  pages: {
    overview: "概述",
    users: "Users（客户端 + tRPC）",
    login: "Login（客户端 + tRPC）",
  },
  introduction: {
    title: "tRPC",
    docCta: "阅读官方文档 →",
    description:
      "本框架在 Next.js App Router 中集成 tRPC：通过共享的 AppRouter 类型在前后端之间传递过程调用，配合 @trpc/react-query 与 TanStack Query 在客户端组件中获得类型安全的查询与变更。HTTP 入口为 /api/trpc，并使用 superjson 作为 transformer。",
    featuresTitle: "特性",
    features: {
      endToEnd:
        "端到端类型安全：Router 与客户端 hooks 共享同一套 TypeScript 类型。",
      reactQuery:
        "与 React Query 集成：useQuery / useMutation 等模式与缓存一致。",
      batching: "HTTP 批处理：通过 httpBatchLink 合并同 tick 内的请求。",
      superjson:
        "superjson：在服务端与客户端之间序列化 Date、Map 等 richer 类型。",
      context: "请求上下文：createTRPCContext 可注入容器与鉴权等信息。",
      serverGuidance:
        "服务端优先：在 Server Component / Server Action 中优先直接调用领域服务；仅在需要 RPC 边界时再使用 tRPC caller。",
    },
    conceptsTitle: "核心概念",
    routerTitle: "App router",
    routerDesc:
      "appRouter 在 library/trpc/routers 中聚合各子路由（如 users）。导出类型 AppRouter 供 createTRPCReact 使用。",
    clientTitle: "React 客户端",
    clientDesc:
      "在客户端组件中从 @/library/trpc/client 导入 trpc，使用 trpc.xxx.yyy.useQuery / useMutation。应用根布局中已提供 TRPCProvider（嵌套在 ReactQueryProvider 内部）。",
    procedureTitle: "Procedure 与输入校验",
    procedureDesc:
      "过程使用 publicProcedure 等构建，并通过 Zod 等 schema 校验 input（例如 users.get 使用 UsersGetRequestSchema）。",
    apiTitle: "HTTP 适配器",
    apiDesc:
      "Next.js Route Handler 在 app/api/trpc/[trpc]/route.ts 中暴露 fetchRequestHandler，endpoint 为 /api/trpc。",
    sections: {
      tryDemos: {
        title: "继续查看示例",
        description: "你可以继续查看具体示例页面：",
      },
    },
  },
  users: {
    title: "Users（客户端组件示例）",
    lead: "在客户端组件中通过 trpc.users.get.useQuery 调用 tRPC。服务端组件应优先通过 services 或 getTRPCCaller 等约定调用。",
    formLabel: "用户 id（数字字符串）",
    submit: "加载",
    noIdHint:
      "输入合法的 snowflake 风格 id 并提交。页面将调用 trpc.users.get.useQuery('{ id }')。",
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
    errorDetailsLabel: "详情",
  },
};
