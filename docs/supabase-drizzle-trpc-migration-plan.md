# Supabase + Drizzle + Service + tRPC 落地计划（个人学习版）

本文档将「在 `my-todolist`（Surge 模板）中，用 **Surge 目录结构 + tRPC + Service + Drizzle** 对接 **现有 Supabase Postgres** 中的 `public.users` 与 `public.todolists`」的完整步骤固定下来，面向新手，**尽量不跳步**。  
若某一步失败，请停在当前步排查，不要继续往下堆问题。

---

## 一、目标与边界

### 1.1 目标（验收标准）

- 页面位于 **`app/[locale]/...`**，布局与 i18n 与 Surge 模板一致。
- 浏览器侧 **只通过 tRPC** 访问业务；**不**再使用 `fetch('/api/todos')` 这类自建 Route Handler（除非你单独做登录 Set-Cookie 的小路由）。
- **业务规则与 SQL** 集中在 **Service**（以及可选的 **Repository**）；tRPC 层主要负责入参形状、调用 Service、错误向上抛出。
- **Drizzle** 中的 TypeScript 表定义与 Supabase **线上一致**（列名、类型、主键 uuid）。
- 数据库连接：**一条** Postgres URI，指向 **当前 Supabase 项目**（仍是 Postgres，不是“另起一个无关数据库”）。

### 1.2 非目标（本文不强制）

- 与团队 Main API、bigint 主用户体系对齐（个人学习可忽略）。
- 必须删除模板里 `main` schema 的示例表（你可保留不用的代码，只要 Drizzle `schema` 聚合与连接库一致即可）。

### 1.3 安全底线（必读）

- **含数据库密码、Service Role 的连接串** 只能出现在 **服务端** 可读的环境变量中；**禁止**写入 `"use client"` 文件、**禁止**提交到公开仓库。
- 任何待办查询/更新/删除必须带 **`user_id = 当前登录用户`** 条件；**禁止**信任客户端传来的“替谁操作”的用户 id。

---

## 二、当前 Supabase 表结构（真值）

以下为你提供的表结构，Drizzle 定义应与此 **一一对应**（含列名大小写习惯：使用数据库中的 snake_case）。

### 2.1 `public.users`

| 列名 | 类型 | 说明 |
|------|------|------|
| `id` | `uuid` | 主键 |
| `account` | `varchar` | 登录账号 |
| `password` | `varchar` | 密码哈希（如 bcrypt） |
| `created_at` | `timestamptz` | 创建时间 |
| `email` | `varchar` | 邮箱 |
| `status` | `boolean` | 状态 |
| `updated_at` | `timestamptz` | 更新时间 |

### 2.2 `public.todolists`

| 列名 | 类型 | 说明 |
|------|------|------|
| `id` | `uuid` | 主键 |
| `user_id` | `uuid` | 外键，引用 `users.id` |
| `todo` | `varchar` | 待办正文 |
| `completed` | `boolean` | 是否完成 |
| `created_at` | `timestamptz` | 创建时间 |
| `updated_at` | `timestamptz` | 更新时间 |

### 2.3 与旧练习项目 `next-todolist` 的重要差异

- 旧 demo 里待办 `id` 可能按 **`number`** 使用；在 Supabase 中现为 **`uuid`**。
- **应用内一律用 `string` 表示 uuid**（例如 `"2f42d6e9-67ab-4f88-ad6c-e8f142d134d7"`）。  
  React 的 `key`、路由参数、组件 state、tRPC input 类型都应统一为 **`string`**，避免隐式类型错误。

---

## 三、架构关系（为什么要分这么多层）

```
浏览器  →  tRPC Client  →  app/api/trpc/[trpc]  →  tRPC Router
                                              →  Service（校验、权限、业务错误）
                                              →  Repository（Drizzle 查询）
                                              →  Supabase Postgres（public.*）
```

- **Drizzle**：类型安全的 SQL 构建器 + 表结构定义；不负责“业务句子”（例如“密码错误”用哪种 HTTP 码）。
- **Repository**：把增删改查 SQL 固定在一处，便于单测与复用。
- **Service**：鉴权依赖的 `userId`、非空校验、bcrypt、错误码（与模板 `ServiceError` 一致）。
- **tRPC**：对外 API 形状、与 React Query 集成；不写复杂 SQL。

---

## 四、与模板中 `main.users` 的关系（避免混淆）

本仓库模板在 `library/db/main/drizzle/schema/main-schema.ts` 中使用：

```ts
export const mainSchema = pgSchema("main");
```

模板示例表（如 `main.users`）与 Supabase 控制台里 **`public.users`** 是 **不同 schema 下的不同对象**；仅名字像，不是同一张表。

**学习用推荐做法：**

- 为 Supabase 真实业务表单独使用 **`pgSchema("public")`**，例如导出为 `appPublic`。
- TypeScript 导出表变量时使用 **`appPublicUsersTable`**、**`appPublicTodolistsTable`** 等名称，避免与模板 `usersTable` 混读。

---

## 五、项目内已有路径（实施时要改/要接的文件）

| 用途 | 路径 |
|------|------|
| Drizzle 客户端创建 | `library/db/main/client.ts`（使用 `env.DATABASE_MAIN_URL`） |
| Drizzle schema 聚合 | `library/db/main/drizzle/schema/index.ts` |
| Drizzle Kit 配置 | `drizzle.main.config.ts`（`schema`、`out`、`dbCredentials.url`） |
| tRPC 根路由 | `library/trpc/routers/index.ts` |
| tRPC 初始化 | `library/trpc/trpc.ts` |
| tRPC Context | `library/trpc/context.ts` |
| Service 注册 | `library/services/registrations.ts` |
| DB 注册 | `library/db/main/registrations.ts` |
| 环境变量定义 | `env.ts`（若 `DATABASE_MAIN_URL` 未从 preset 注入，需自行在 `server` + `runtimeEnv` 声明） |
| 参考页面（错误展示） | `app/[locale]/trpc/users/page.tsx` |

---

## 六、阶段 0：环境与仓库准备

1. 安装 **Node.js**（建议 LTS）。
2. 安装 **pnpm**（与仓库习惯一致）。
3. 在 **`my-todolist` 根目录**执行依赖安装：`pnpm install`。
4. 确认未改业务代码前 **`pnpm dev` 能启动**。
5. 确认 **`pnpm typecheck`** 能通过（作为后续每步改动的基线）。

---

## 七、阶段 1：Supabase 连接串与环境变量

### 7.1 在 Supabase 控制台获取 URI

1. 打开 Supabase → 你的项目 → **Settings** → **Database**。
2. 复制 **Connection string** → **URI**。
3. 学习阶段常见选择：
   - **直连** `5432`：本地开发简单。
   - **Pooler** `6543`：部署到 Serverless 时再重点考虑。

### 7.2 密码与 URL 编码

连接串中的密码若包含 `@`、`#`、`%` 等字符，必须进行 **URL 编码**，否则解析会断。

### 7.3 写入本地环境变量

在项目根目录创建或编辑 **`.env.local`**（勿提交到 Git），增加：

```bash
DATABASE_MAIN_URL=postgresql://...
```

变量名与代码一致：`library/db/main/client.ts` 与 `drizzle.main.config.ts` 均使用 **`DATABASE_MAIN_URL`**。

### 7.4 与 `env.ts`（@t3-oss/env-nextjs）对齐

若你在代码中使用 `import { env } from "@/env"` 访问 `env.DATABASE_MAIN_URL`，而 `env.ts` 的 `createEnv` **未**声明该变量，运行或类型检查可能报错。此时需要在 `env.ts` 中：

- 在 **`server`** 对象内用 `z.string().url()`（或 `z.string().min(1)`）声明 `DATABASE_MAIN_URL`；
- 在 **`runtimeEnv`** 中增加 `DATABASE_MAIN_URL: process.env.DATABASE_MAIN_URL`。

（若 `@surgeteam/next-config/keys` 的 `core()` 已扩展包含该键，则按实际类型使用即可。）

### 7.5 重启开发服务器

修改 `.env.local` 或 `env.ts` 后，**重启** `pnpm dev`。

---

## 八、阶段 2：Drizzle 中定义 `public.users` 与 `public.todolists`

### 8.1 新建文件（建议命名）

在 `library/db/main/drizzle/schema/` 下新增（名称可微调，但建议语义清晰）：

1. **`app-public-schema.ts`**  
   - 内容：`import { pgSchema } from "drizzle-orm/pg-core"; export const appPublic = pgSchema("public");`

2. **`app-public-users-table.ts`**  
   - 使用 `appPublic.table("users", { ... })`。  
   - 列：`id` → `uuid().primaryKey().defaultRandom()` 或仅 `primaryKey()`（若插入时由应用生成 uuid）；`account`、`password`、`email` → `varchar` 并指定合理 `length`；`status` → `boolean()`；`created_at` / `updated_at` → `timestamp({ withTimezone: true })`，按需 `.defaultNow()` 或与线上默认值一致。

3. **`app-public-todolists-table.ts`**  
   - `appPublic.table("todolists", { ... })`。  
   - `user_id`：`uuid().notNull()`，并用 `.references(() => appPublicUsersTable.id)` 声明关系（若循环引用，可用箭头函数延迟引用）。  
   - `todo`：`varchar(...)`；`completed`：`boolean().notNull().default(false)`（以线上默认为准）。

### 8.2 聚合导出

编辑 **`library/db/main/drizzle/schema/index.ts`**：

- `export { appPublic } from "./app-public-schema";`
- `export { appPublicUsersTable } from "./app-public-users-table";`
- `export { appPublicTodolistsTable } from "./app-public-todolists-table";`

确保 **`createMainDbClient`** 中的 `import * as schema from "./drizzle/schema"` 能包含上述表（即 barrel 文件已导出）。

### 8.3 与模板 `main` 表共存时的注意点

- 若 **`schema` 同时导出** `main` 下表与 `public` 下表：Drizzle 允许；请保证 **不会误用** 模板表变量操作 Supabase。  
- 若 Supabase 库中 **不存在** `main` schema：包含 `main` 的 migration **不要**对 Supabase 生产库执行；仅将 `public` 表用于学习连接即可。

---

## 九、阶段 3：只读连通性验证（强烈建议）

在写 Service 之前，证明「连的是 Supabase + 表名/schema 正确」。

**做法示例（任选其一）：**

1. 临时写一个 **仅服务端执行** 的脚本：使用 `createMainDbClient()` 执行 `select id, account from ... limit 1`。  
2. 或临时增加一个 **tRPC procedure**（完成后删除），返回行数或第一行 `id`。

**常见错误与含义：**

| 报错 | 可能原因 |
|------|----------|
| `relation "users" does not exist` | `search_path` 未包含 `public`，或 Drizzle 未把表挂在 `pgSchema("public")` 下。 |
| `password authentication failed` | 连接串用户/密码错误，或密码未 URL 编码。 |
| `permission denied for table users` | 当前 DB 角色无 SELECT 权限；在 Supabase SQL 中对该角色 `GRANT`，或换用权限足够的连接串（学习阶段常见：直连数据库用户，**勿把该 URL 暴露到前端**）。 |

---

## 十、阶段 4：Repository 层（只做数据访问）

建议在 `library/db/main/todos/`（或 `library/db/main/app/`）下新增：

### 10.1 `TodolistsRepository` 建议方法

| 方法 | 行为 | 安全要点 |
|------|------|----------|
| `listByUserId(userId: string)` | 按 `user_id` 查询，建议 `orderBy(created_at desc)` | `where` 必须带 `user_id` |
| `insert(userId: string, todo: string)` | 插入 `todo`、`completed`、`user_id`、时间戳 | 不写其他用户的 `user_id` |
| `updateCompleted(id: string, userId: string, completed: boolean)` | 更新 `completed` | **`where id AND user_id`** |
| `deleteById(id: string, userId: string)` | 删除一行 | **`where id AND user_id`** |

### 10.2 `UsersRepository`（若实现登录/注册）

- `findByAccount(account: string)`  
- `insertUser(...)`  
- `updateProfile(...)`（按你页面需求）

Repository **不**抛面向用户的中文文案；抛数据层错误或返回 `null` / `0 rows`，由 Service 转成业务错误码。

---

## 十一、阶段 5：Service 层（规则与错误码）

目录建议：`library/services/todos/`、`library/services/auth/`（按需）。

### 11.1 待办 Service 要点

- **list**：`userId` **只从 tRPC Context** 来，不从客户端 input 信任“用户 id”。  
- **create**：`trim` 后非空；可设最大长度；写入 `user_id = ctx.userId`。  
- **update / delete**：若 Repository 返回影响行数为 0：映射为 **NOT_FOUND** 或 **FORBIDDEN**（不要区分“不存在”与“别人的 id”，避免信息泄露）。

### 11.2 登录 Service（若迁移登录）

- 使用 **bcrypt.compare** 校验密码；失败统一“账号或密码错误”。  
- 成功后可返回用户基本信息（**不要**返回密码字段）。

### 11.3 与模板错误体系对齐

使用项目已有类型与工具，例如：

- `ServiceError`、`ServiceErrorCodes`（`library/services/error.ts`、`error-codes.ts`）  
- `parseRequest` + zod schema（参考 `library/services/users/`）  
- 前端 `translateServiceErrorCode`（参考 `library/i18n/translate-service-error-code.ts`）

---

## 十二、阶段 6：tRPC Router

1. 新建 `library/trpc/routers/todos/todos-router.ts`（路径与项目习惯一致即可）。  
2. 暴露 procedures，例如：`list`、`create`、`toggle`（或 `updateCompleted`）、`delete`。  
3. 在 **`library/trpc/routers/index.ts`** 中合并：

   ```ts
   export const appRouter = router({
     users: usersRouter,
     todos: todosRouter,
   });
   ```

4. **输入校验**：使用 zod；与模板 `users-router` 的约定一致即可（注释中说明“runtime 校验在 Service”也可，但新手更建议 Router 与 Service 双层之一明确负责）。

---

## 十三、阶段 7：鉴权（替换 `localStorage` + `userId` Header）

旧 `next-todolist` 使用 `localStorage` 存 token 并在 header 传 `userId`。在新架构中建议改为：

### 13.1 Cookie 会话（推荐学习路径）

1. 登录成功后由 **Route Handler 或 Server Action** `Set-Cookie`：  
   - `HttpOnly`  
   - `SameSite=Lax`（按部署域名调整）  
   - `Path=/`  
   - 生产环境加 `Secure`  
2. Cookie 值可为 **用户 uuid 字符串**（学习够用）；进阶可改为随机 session id 再查服务端会话表。  
3. 在 **`library/trpc/context.ts` 的 `createTRPCContext`** 中：从 `opts.req` 读取 Cookie，解析出 `userId`（uuid 字符串），放入 `ctx`。  
4. 未登录：在需要登录的 procedure 开头判断 `ctx.userId`，否则抛 **`UNAUTHORIZED`**（或项目统一未登录错误码）。

### 13.2 开发期临时方案（可选）

- 短期用环境变量 **固定 mock userId** 打通 Drizzle → Service → tRPC → 页面；**务必在合并主分支前移除**。

---

## 十四、阶段 8：DI 注册（Container 可解析依赖）

1. **`library/db/main/registrations.ts`**：注册 `MainDbClient` 或 `TodolistsRepository` 的工厂（与现有 `users-repository` 注册方式一致）。  
2. **`library/services/registrations.ts`**：注册 `TodosService`，构造时注入 Repository 或 `MainDbClient`。  
3. **`library/di/registrations.ts`**（或项目实际聚合处）：确保 `registerAll` 链包含上述注册。  
4. 所有含 `postgres` 连接、`drizzle` 实例的文件保持 **`server-only`** 或仅被服务端 import。

---

## 十五、阶段 9：页面与 UI（Surge + 设计系统）

1. 在 **`app/[locale]/todolist/`** 下新增页面（可含 `layout.tsx` 若需要）。  
2. 使用 **`@/library/trpc/client`** 的 React Query 集成调用 `trpc.todos.*`。  
3. UI 组件优先使用 **`library/surge/design-system`** 下的 `Input`、`Button`、`Checkbox` 等，避免从旧仓库再复制一套 `components/ui`。  
4. 文案：使用 **`@surgeteam/i18n`**，在 messages 中增加 key；页面用 `useI18n()`。  
5. 错误展示：参考 **`app/[locale]/trpc/users/page.tsx`** 中对 `isTRPCClientError` 与 `translateServiceErrorCode` 的处理。

---

## 十六、阶段 10：`drizzle-kit` 与迁移命令

本仓库脚本（见 `package.json`）：

- `pnpm db:generate` → `drizzle-kit generate --config drizzle.main.config.ts`  
- `pnpm db:migrate` → `drizzle-kit migrate --config drizzle.main.config.ts`  
- `pnpm db:push` → `drizzle-kit push --config drizzle.main.config.ts`

`drizzle.main.config.ts` 当前指向：

- `schema`: `./library/db/main/drizzle/schema/index.ts`  
- `out`: `./library/db/main/drizzle/migrations`  
- `dbCredentials.url`: `process.env.DATABASE_MAIN_URL`

### 16.1 表已存在于 Supabase 时（你当前情况）

- **优先**把 Drizzle TS 定义当作 **与线上一致的契约**；用 **`drizzle-kit introspect`** 生成初稿再手调也是一种做法。  
- **谨慎**对生产 Supabase 执行 **`db:push`** / **`db:migrate`**：会先理解命令会 **CREATE / ALTER** 什么，再在副本库或开发分支上试。

### 16.2 新建本地 Postgres 练习 migration 时

- 可在本地 Docker Postgres 上反复 `generate` + `migrate`，熟练后再连 Supabase。

---

## 十七、Supabase RLS 与数据库角色

- 若连接串使用 **高权限数据库用户**（学习常见），RLS 可能不阻挡；仍以 **应用层 `user_id` 条件** 为准，不要依赖“隐式安全”。  
- 若使用 **低权限角色**，需在 Supabase SQL 中为该角色对 `public.users`、`public.todolists` 授予 **`SELECT`/`INSERT`/`UPDATE`/`DELETE`** 中实际需要的权限。  
- **永远不要把 Service Role 密钥或直连密码写进客户端 bundle。**

---

## 十八、自测清单（建议打印打勾）

- [ ] `.env.local` 配置 `DATABASE_MAIN_URL`，重启 `pnpm dev`。  
- [ ] `env.ts`（如需要）已声明 `DATABASE_MAIN_URL`，`pnpm typecheck` 通过。  
- [ ] Drizzle 能只读查询到 `users` / `todolists` 至少一行（或空表但不报错）。  
- [ ] 未登录访问待办接口：返回未授权或跳转登录。  
- [ ] 登录后仅能看到 **当前 `user_id`** 的待办。  
- [ ] 新增待办后 **刷新页面仍存在**（确认写入 Supabase）。  
- [ ] 更新/删除使用 **他人 todo 的 id** 时：应 **0 行影响**，不得修改他人数据。  
- [ ] 全站 `pnpm typecheck`、`pnpm test`（若有）通过。

---

## 十九、建议实施顺序（最小乱序路径）

1. 配好 `DATABASE_MAIN_URL` → 只读验证能访问 `public.users` / `public.todolists`。  
2. 完成 Drizzle `public` 下两张表定义与 `schema/index.ts` 导出。  
3. 实现 `TodolistsRepository` 四个方法并验证 SQL。  
4. 实现 `TodosService` 与错误码。  
5. 实现 `todosRouter` 并合并进 `appRouter`。  
6. 打通 **Cookie + `createTRPCContext` 中的 `userId`**（或短期 mock）。  
7. 实现 `app/[locale]/todolist` 页面与 i18n。  
8. 按需迁移 **登录/注册/个人资料/账号列表**（同一套：Service + tRPC + Drizzle）。

---

## 二十、参考：本仓库关键代码位置

- Drizzle 客户端：`library/db/main/client.ts`  
- Drizzle Kit 配置：`drizzle.main.config.ts`  
- tRPC 根路由：`library/trpc/routers/index.ts`  
- tRPC Context：`library/trpc/context.ts`  
- 示例 tRPC 页面：`app/[locale]/trpc/users/page.tsx`

---

## 二十一、文档维护

- 若在实施中变更了表名、列名或 env 变量名，请同步更新本文档 **第二节** 与 **第七节**。  
- 若将连接从 Supabase 迁到自建 Postgres，复制 **第七节、第十六节、第十七节** 做相应替换说明即可。

---

*文档生成用于个人学习：Surge 目录 + tRPC + Service + Drizzle，底层连接现有 Supabase Postgres（`public.users` / `public.todolists`）。*
