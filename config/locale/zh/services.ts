export default {
  title: "服务",
  description: "以 Services 为业务核心，通过 DI 编排数据源并坚持契约优先。",
  pages: {
    overview: "概述",
    users: "Users 服务",
  },
  introduction: {
    title: "统一服务能力（Services）",
    docCta: "查看完整文档 →",
    lead: "这套范式用于在 Surge Next.js Framework 中构建稳定、可扩展、可测试的业务代码结构。",
    sections: {
      keyPoints: {
        title: "核心要点",
        items: {
          servicesIsCore: {
            label: "Services 是业务核心",
            desc: "承载用例（use case）编排，向上提供稳定接口",
          },
          dataSourcesInfra: {
            label: "Data Sources 是基础设施",
            desc: "对接 API / DB / 第三方服务 / Cache / Queue 等，并支持多个提供商（多数据源）",
          },
          diIsBackbone: {
            label: "DI 是骨架",
            descPrefix:
              "把 services 与 data sources 以命名空间注册进容器，使上层入口只依赖",
          },
          contractFirst: {
            label: "契约优先",
            desc: "通过固定的文件契约与命名规范，让不同开发者产出的模块结构一致、可读、可替换",
          },
        },
      },
      layering: {
        title: "分层与依赖方向（必须遵守）",
        lead: "依赖只能自上而下：",
        code: `Server Components / Server Actions / Tests / tRPC / Route Handlers
  -> container.services.getXxxService()
     -> Services (orchestration + contract + mapping)
        -> Data Sources (api/*, db/*, integrations/*, cache/*, ...)`,
      },
      responsibilities: {
        title: "职责划分",
        servicesTitle: "Services 层职责",
        servicesItems: {
          orchestration: {
            label: "编排",
            desc: "组合多个数据源完成一个用例（并行、重试、幂等、降级等都应在这里）",
          },
          contract: {
            label: "契约",
            desc: "用 Zod schema 定义输入/输出，统一校验与“归一化”（字符串日期 -> Date 等）",
          },
          mapping: {
            label: "映射",
            desc: "以 mapper 把数据源返回映射为对上层稳定的 DTO（内部用 schema.parse 做边界收敛）",
          },
        },
        dataSourcesTitle: "Data Sources 层职责",
        dataSourcesItems: {
          singleSourceClosure: {
            label: "单一数据源闭包",
            desc: "一个数据源自包含 client 工厂 + registrations + modules（api/repository）",
          },
          configIsolation: {
            label: "配置隔离",
            desc: "每个数据源独立 env / 配置（例如多 API baseURL、多 DB 连接串、多 drizzle config）",
          },
          replaceable: {
            label: "可替换/可并存",
            desc: "同类型数据源可多个提供商（例如 mainApi / billingApi，mainDb / auditDb）",
          },
        },
      },
      forbidden: {
        title: "禁止事项（常见“架构被破坏”的来源）",
        items: {
          noDirectInfraFromEntrypoint:
            "上层入口（页面、RSC、actions、trpc router）禁止直接访问 api/*、db/* 的实现",
          noNewClientInServices:
            "Services 禁止 new http/db client、禁止直接读取 env（应从数据源注入）",
          noCrossDataSource:
            "Data Sources 禁止跨数据源互相调用（跨数据源组合必须上收至 Services）",
        },
      },
      deliverables: {
        title: "这套范式“产出物”是什么？",
        lead: "开发者在实现一个业务能力时，最终应产出：",
        items: {
          stableEntry:
            "稳定调用入口：container.services.getXxxService().method(...)",
          fileContract:
            "固定文件契约：*-request.types.ts / *-response.types.ts / *-request.schema.ts / *-response.schema.ts / *-mapper.ts / *-impl.ts",
          diRegistrations:
            "可组合的 DI 注册：每个数据源与 services 都有各自的 registrations.ts，并由 library/di/registrations.ts 聚合成 AppContainer",
        },
      },
      whenToAdd: {
        title: "你应该什么时候新增 Service？",
        lead: "当你需要一个“对上层稳定的业务能力”时就新增 service 方法/类：",
        items: {
          forRscOrActions: "为 Server Component / Action 提供用例入口",
          forTrpc:
            "为 tRPC 提供可复用的业务能力（供 Client Component / 第三方调用）",
          forTests: "为测试提供单点替换（override data sources）与断言边界",
        },
      },
      tryDemos: {
        title: "继续查看示例",
        description: "你可以继续查看具体示例页面：",
      },
    },
  },
  users: {
    title: "Users 服务",
    lead: "通过 DI 容器调用 UsersService.get（与 tRPC users.get 相同路径）。真实用户 id 需要可访问的 API 与数据库。",
    formLabel: "用户 id（数字字符串）",
    submit: "加载",
    noIdHint:
      "输入合法的 snowflake 风格 id 并提交。页面将调用 container.services.getUsersService().get('{ id }')。",
    resultTitle: "响应",
    friendly: {
      title: "用户信息",
      timeZone: "当前展示时区：{timeZone}",
      fullName: "姓名",
      email: "邮箱",
      id: "用户 id",
      tags: "标签",
      bio: "简介",
      avatarUrl: "头像 URL",
      createdAt: "创建时间",
      updatedAt: "更新时间",
      empty: "暂无",
    },
    errorTitle: "请求失败",
    errorHint:
      "请检查 API/DB 配置以及 id 是否存在。校验错误表示 id 格式不合法。",
    errorDetailsLabel: "详情",
  },
};
