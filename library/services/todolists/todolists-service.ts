import type {
  TodolistsCreateRequest,
  TodolistsDeleteRequest,
  TodolistsListRequest,
  TodolistsUpdateRequest,
} from "./todolists-request.schema";
import type {
  TodolistsCreateResponse,
  TodolistsDeleteResponse,
  TodolistsListResponse,
  TodolistsUpdateResponse,
} from "./todolists-response.schema";

/**
 * 待办事项业务接口（合同层，不含实现）。
 *
 * 与 `UsersService` 相同：只描述「能做什么、入参/出参类型」；
 * 具体逻辑在 `todolists-service-impl.ts`，并通过 DI 注册到容器。
 *
 * 注意：`userId` 来自服务端 Context（tRPC 登录态），不要放进 request schema，
 * 避免客户端伪造「替别人操作」。
 */
export interface TodolistsService {
  /**
   * 列出当前用户的全部待办（对应旧项目 GET /api/todos）。
   * @param request 列表筛选条件（当前为空对象，后续可加分页）
   * @param ctx.userId 当前登录用户 id，仅服务端注入
   */
  list(
    request: TodolistsListRequest,
    ctx: { userId: string }
  ): Promise<TodolistsListResponse>;

  /**
   * 新增一条待办（对应旧项目 POST /api/todos）。
   * `user_id` 在 impl 内使用 ctx.userId，不信任客户端。
   */
  create(
    request: TodolistsCreateRequest,
    ctx: { userId: string }
  ): Promise<TodolistsCreateResponse>;

  /**
   * 更新待办（对应旧项目 PATCH，如切换 completed）。
   * impl 会校验该 id 是否属于当前用户。
   */
  update(
    request: TodolistsUpdateRequest,
    ctx: { userId: string }
  ): Promise<TodolistsUpdateResponse>;

  /**
   * 删除待办（对应旧项目 DELETE）。
   * impl 会校验该 id 是否属于当前用户。
   */
  delete(
    request: TodolistsDeleteRequest,
    ctx: { userId: string }
  ): Promise<TodolistsDeleteResponse>;
}
