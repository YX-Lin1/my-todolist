# Todolists 前端落地计划（my-todolist × next-todolist 样式参考）

> 本文档聚焦 **待办列表产品页** 的实现顺序，假设后端链路（Drizzle → Repository → Service → tRPC）已基本就绪。  
> 全栈迁移总纲见 [`落地计划.md`](./落地计划.md)；旧项目 UI 参考 [`next-todolist/app/todolist`](../../next-todolist/app/todolist)。

---

## 一、当前目录与完成度

### 1.1 后端与 tRPC（已基本完成 ✅）

| 层级 | 路径 | 状态 |
|------|------|------|
| Drizzle 表 | `library/db/main/drizzle/schema/main-schema/todolists-table.ts` | ✅ |
| Repository | `library/db/main/todolists/todolists-repository*.ts` | ✅ |
| DI 注册 | `library/db/main/registrations.ts`、`library/services/registrations.ts` | ✅ |
| Service | `library/services/todolists/*` | ✅ |
| tRPC Router | `library/trpc/routers/todolists/todolists-router.ts` | ✅（`list` / `create` / `update` / `delete`，`protectedProcedure`） |
| 合并路由 | `library/trpc/routers/index.ts` → `todolists: todolistsRouter` | ✅ |
| 鉴权 Context | `library/trpc/context.ts` → `MOCK_USER_ID` | ✅ 开发期 Mock |

### 1.2 前端页面（待完成 ⏳）

| 路径 | 状态 | 说明 |
|------|------|------|
| `app/[locale]/todolists/page.tsx` | ⏳ 空文件 | **建议作为正式产品路由** `/todolists` |
| `app/[locale]/trpc/todolists/page.tsx` | 🔧 联调页 | 仅 `list` + JSON，可保留作 smoke test |
| `app/[locale]/login/` 等 | ❌ 未建 | 旧 demo 的登录/登出/profile 尚未迁移 |

### 1.3 与旧项目 `next-todolist` 的差异（实现前必读）

| 项目 | 旧 demo (`next-todolist`) | 新框架 (`my-todolist`) |
|------|---------------------------|-------------------------|
| 路由 | `/todolist`（无 locale） | `/[locale]/todolists`（i18n 前缀） |
| 数据 | `fetch('/api/todos')` + Header `userId` | `trpc.todolists.*` + 服务端 `ctx.userId` |
| 待办 id | `number` | **`uuid` → 全程 `string`** |
| UI 组件 | `@/components/ui/*`（shadcn 副本） | `@surgeteam/design-system`（别名 → `library/surge/design-system`） |
| 登录态 | `localStorage.loginToken` | 当前：**`MOCK_USER_ID` 环境变量**；后续 Cookie / Session |

---

## 二、旧页面功能 → 新框架映射

参考文件：`next-todolist/app/todolist/page.tsx`

| 旧功能 | 旧实现 | 新框架做法 |
|--------|--------|------------|
| 进入页检查登录 | `localStorage` + `router.push('/login')` | **阶段 A**：依赖 `MOCK_USER_ID`；**阶段 B**：未登录时 `UNAUTHORIZED` + 跳转 `/login` |
| 拉取列表 | `GET /api/todos` | `trpc.todolists.list.useQuery({})` |
| 新增 | `POST /api/todos` | `trpc.todolists.create.useMutation({ data: { todo, completed: false } })` |
| 勾选完成 | `PATCH /api/todos/:id` | `trpc.todolists.update.useMutation({ data: { id, todo, completed } })` |
| 删除 | `DELETE /api/todos/:id` | `trpc.todolists.delete.useMutation({ data: { id } })` |
| 关键词搜索 | 前端 `useMemo` 过滤 | **仍在前端过滤**（无需新接口） |
| 顶栏：账号 / 登出 / profile | 多个 `router.push` | **二期**：登录模块完成后再接；一期可只做标题 + 占位 |
| 底部统计 | `todos.length` / filter completed | 同上，基于 `list.data` 计算 |
| 样式 | 黄橙渐变顶栏、`#fff3e0` 内容区 | 用 Tailwind 复刻 **或** 抽成 `todolists-theme` 常量；控件用设计系统 `Input` / `Button` / `Checkbox` |

### tRPC 入参形状（与 Service 一致）

```ts
// list
trpc.todolists.list.useQuery({});

// create
trpc.todolists.create.useMutation({
  data: { todo: "买菜", completed: false },
});

// update（勾选时带上当前 todo 文本）
trpc.todolists.update.useMutation({
  data: { id: uuid, todo: item.todo, completed: !item.completed },
});

// delete
trpc.todolists.delete.useMutation({
  data: { id: uuid },
});
```

变更成功后建议：

```ts
const utils = trpc.useUtils();
await utils.todolists.list.invalidate();
```

---

## 三、推荐路由与文件结构

### 3.1 路由约定（消除 `todolist` / `todolists` 混用）

| 用途 | 推荐路径 | 说明 |
|------|----------|------|
| **产品页** | `app/[locale]/todolists/` | 与表名、router 命名一致；首页 CTA 可指向此处 |
| **tRPC 联调** | `app/[locale]/trpc/todolists/` | 保留现有 JSON 页，开发时快速验证接口 |
| 不建议 | `app/[locale]/todolist/` | 与仓库其余命名不一致，易混淆 |

### 3.2 建议新增/修改的文件

```
app/[locale]/todolists/
├── layout.tsx              # generateMetadata + 可选全屏布局（参考旧 layout）
├── page.tsx                # "use client" 主页面（或薄 page + 子组件）
└── _components/            # 可选：拆分 UI，避免单文件过长
    ├── todolists-header.tsx
    ├── todolists-toolbar.tsx   # 搜索 + 新增
    ├── todolists-list.tsx
    ├── todolists-row.tsx
    └── trpc-error-panel.tsx    # 从 trpc/users 抽取复用

config/locale/{zh,en,ja}/
├── todolists.ts            # 文案
└── index.ts                # 增加 todolists 导出（见下文 i18n 注意）

config/locale/{zh,en,ja}/seo.ts   # 增加 seo.todolists.*
```

设计系统导入方式（与 `demo/user`、`page.tsx` 一致）：

```ts
import { Button } from "@surgeteam/design-system/components/ui/button";
import { Input } from "@surgeteam/design-system/components/ui/input";
import { Checkbox } from "@surgeteam/design-system/components/ui/checkbox";
```

---

## 四、分步实施顺序（先做什么、后做什么）

### 阶段 0：环境与联调（约 30 分钟）

**目标**：确认 `trpc.todolists.list` 在浏览器能返回数据。

1. `.env.local` 配置：
   - `DATABASE_MAIN_URL` → Supabase Postgres
   - `MOCK_USER_ID` → 数据库里 **真实存在** 的 `users.id`（uuid 字符串）
2. `pnpm dev`，打开现有联调页：`/trpc/todolists`（或带 locale 前缀）
3. 若 `UNAUTHORIZED`：检查 `MOCK_USER_ID` 是否为空
4. 若列表为空：在 Supabase 为该 user 插入几条 `todolists` 记录，或用 create mutation 测一条

**完成标志**：联调页 JSON 中 `data` 数组有内容或为空数组但不报错。

---

### 阶段 1：i18n 文案骨架（约 1 小时）

**目标**：所有可见文案走 `useI18n()`，支持 zh / en / ja。

1. 新建 `config/locale/zh/todolists.ts`（en、ja 同步），建议 key 结构：

   ```ts
   export default {
     title: "待办事项管理系统",
     listTitle: "待办事项列表",
     searchPlaceholder: "请输入关键词...",
     addPlaceholder: "请输入待办事项...",
     search: "搜索",
     add: "添加",
     delete: "删除",
     empty: "暂无待办事项，请添加！",
     stats: "总计：{total} 项 | 已完成：{done} 项 | 未完成：{pending} 项",
     loading: "加载中…",
     errorTitle: "操作失败",
     // ...
   };
   ```

2. 在 **`config/locale/{zh,en,ja}/index.ts`** 中挂载：

   ```ts
   import todolists from "./todolists";
   export default { /* 现有 */, todolists };
   ```

3. 在 `seo.ts` 增加 `todolists.title` / `todolists.description`

> **注意**：`loadMessages` 只加载 `index.ts` 的 default 导出。若 `trpc`、`http-client` 等模块未写入 index，对应页面文案可能无法显示——实施 todolists 时务必把 **`todolists` 写入三个语言的 index**。

---

### 阶段 2：错误处理组件（约 30 分钟）

**目标**：与 `trpc/users` 一致的服务端错误码展示。

1. 从 `app/[locale]/trpc/users/page.tsx` 复制/抽取：
   - `parseTrpcError`
   - `TrpcErrorPanel`（`isTRPCClientError` + `translateServiceErrorCode`）
2. 放到 `app/[locale]/todolists/_components/trpc-error-panel.tsx` 或 `library/trpc/trpc-error-panel.tsx`（若多处复用）

**完成标志**：故意清空 `MOCK_USER_ID` 时页面显示「未授权」类文案，而不是裸 `JSON.stringify`。

---

### 阶段 3：页面骨架 + 列表只读（约 2 小时）

**目标**：产品页能展示列表，布局接近旧 demo。

1. 实现 `app/[locale]/todolists/layout.tsx`（`generateMetadata` 参考 `trpc/users/layout.tsx`）
2. 实现 `page.tsx`（`"use client"`）：
   - `const listQuery = trpc.todolists.list.useQuery({})`
   - loading / error / empty 三态
   - 用 `listQuery.data?.data` 渲染行（**id 为 string**）
3. 顶栏 + 内容区布局先 **用 Tailwind 复刻旧版**（渐变 header、`bg-[#fff3e0]` 等），输入框可先换设计系统 `Input`

**完成标志**：打开 `/todolists` 能看到与 Supabase 一致的列表。

---

### 阶段 4：增删改交互（约 2–3 小时）

**目标**：功能对齐旧 `page.tsx`。

| 操作 | 实现要点 |
|------|----------|
| 新增 | 本地 `inputValue` state → `create.mutate` → 清空输入 → `invalidate list` |
| 勾选 | `Checkbox` `onCheckedChange` → `update.mutate`（带完整 `todo` 文本） |
| 删除 | 行内按钮 → `delete.mutate` → `invalidate` |
| 搜索 | `searchValue` + `useMemo` 过滤 `list.data`，**不请求后端** |
| 统计 | 基于 **全量** `list.data` 计算 total/done/pending（与旧版一致） |

可选优化：

- mutation 使用 `onMutate` + 乐观更新（非必须，初学可只做 invalidate）
- 进行中禁用按钮：`create.isPending` 等

**完成标志**：刷新页面后新增/修改/删除仍与数据库一致。

---

### 阶段 5：样式精修与组件化（约 1–2 小时）

**目标**：可维护、接近旧 demo 视觉。

1. 对照 `next-todolist/app/todolist/page.tsx` 逐项核对：
   - 完成行：灰底 + 删除线（`line-through`）
   - 未完成行：白底 + 橙色边框感
   - 按钮色：搜索 `#FFBB1E`、添加绿、删除红
2. 将重复 class 收到 `_components` 或常量对象 `TODOLISTS_COLORS`
3.  Checkbox 用 `@surgeteam/design-system` 的 `Checkbox`，避免原生 `<input type="checkbox">` 与主题不一致

---

### 阶段 6：导航与发现性（约 30 分钟）

1. 首页 `app/[locale]/page.tsx`：增加 CTA `Link href="/todolists"`
2. `app/components/header.tsx`：可选增加「待办」入口
3. `app/[locale]/trpc/page.tsx`：在 demo 列表增加 Todolists 链接（与 Users 并列）

---

### 阶段 7：登录与顶栏（二期，按需）

旧 demo 顶栏依赖 `loginToken` / `loginAccount`。新框架 **尚未有** `app/[locale]/login`。

建议顺序：

1. 先阅读 `docs/tRPC鉴权-Mock用户与protectedProcedure实现方案.md`（若存在）
2. 实现登录 tRPC + Set-Cookie → `createTRPCContext` 从 Cookie 解析 `userId`
3. 产品页顶栏再接：账号名、`/profile`、`/accounts`、登出
4. 未登录访问 `/todolists`：重定向 `/login` 或展示 `Alert` + 链接

**一期可省略**：顶栏只保留标题，登出按钮改为「返回首页」。

---

## 五、实现检查清单（自测）

- [ ] `MOCK_USER_ID` 指向有效用户 uuid
- [ ] `/trpc/todolists` 与 `/todolists` 列表数据一致
- [ ] 新增后刷新仍存在
- [ ] 勾选状态持久化
- [ ] 删除后行消失且刷新仍消失
- [ ] 用**他人** todo 的 uuid 调 update/delete → 应失败（`USER_NOT_FOUND` 等），界面有友好提示
- [ ] zh / en / ja 切换后文案正确
- [ ] `pnpm typecheck` 通过

---

## 六、参考代码索引（按优先级）

| 优先级 | 文件 | 借鉴内容 |
|--------|------|----------|
| ⭐⭐⭐ | `next-todolist/app/todolist/page.tsx` | 布局、交互、搜索、统计、配色 |
| ⭐⭐⭐ | `app/[locale]/trpc/users/page.tsx` | tRPC hooks、URL/表单模式、**错误面板** |
| ⭐⭐ | `app/[locale]/demo/user/page.tsx` | 设计系统 `Card` / `Input` / `Button` / `Alert` 用法 |
| ⭐⭐ | `app/[locale]/trpc/todolists/page.tsx` | 最小 `list.useQuery` 示例（可删 JSON UI 前对照） |
| ⭐ | `library/services/todolists/todolists-request.schema.ts` | mutation 入参形状 |
| ⭐ | `library/trpc/context.ts` | `MOCK_USER_ID` 行为 |

---

## 七、建议时间线（个人学习节奏）

| 顺序 | 阶段 | 预估 |
|------|------|------|
| 1 | 阶段 0 环境联调 | 0.5h |
| 2 | 阶段 1 i18n | 1h |
| 3 | 阶段 2 错误组件 | 0.5h |
| 4 | 阶段 3 只读列表 UI | 2h |
| 5 | 阶段 4 增删改 | 2–3h |
| 6 | 阶段 5 样式 | 1–2h |
| 7 | 阶段 6 导航 | 0.5h |
| 8 | 阶段 7 登录（可选） | 另行规划 |

合计约 **1–2 个工作日** 可完成一期产品页（不含登录迁移）。

---

## 八、与总纲 `落地计划.md` 的关系

- **已完成**：总纲阶段 5–8（Service、tRPC、DI）、阶段 9 的后端部分。  
- **本文档**：总纲 **阶段 9 的前端细化**，并绑定 `next-todolist` 视觉与交互。  
- **未完成**：总纲阶段 7 真实 Cookie 鉴权、登录/注册/profile 页面（阶段 7 二期）。

实施时建议：**每完成一个阶段就 commit 一次**，便于回滚与 Code Review。

---

*文档维护：若最终产品路由改为 `/todolist`，请同步更新本文第三节与首页链接。*
