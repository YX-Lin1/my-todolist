import type { TodoRepository } from "@/library/db/main/todolists/todolists-repository";
import { ServiceError } from "../error";
import { ServiceErrorCodes } from "../error-codes";
import { parseRequest } from "../common/parse";
import {
  todolistsCreateResponseMapper,
  todolistsDeleteResponseMapper,
  todolistsListResponseMapper,
  todolistsUpdateResponseMapper,
} from "./todolists-mapper";
import {
  TodolistsCreateRequestSchema,
  TodolistsDeleteRequestSchema,
  TodolistsListRequestSchema,
  TodolistsUpdateRequestSchema,
  type TodolistsCreateRequest,
  type TodolistsDeleteRequest,
  type TodolistsListRequest,
  type TodolistsUpdateRequest,
} from "./todolists-request.schema";
import type {
  TodolistsCreateResponse,
  TodolistsDeleteResponse,
  TodolistsListResponse,
  TodolistsUpdateResponse,
} from "./todolists-response.schema";
import type { TodolistsService } from "./todolists-service";

export class TodolistsServiceImpl implements TodolistsService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async list(
    request: TodolistsListRequest,
    ctx: { userId: string }
  ): Promise<TodolistsListResponse> {
    // 1. 运行时校验入参
    // parseRequest()第一个参数是校验规则，第二个参数是要被检查的数据
    // parseRequest检查传进来的数据是否符合规则
    parseRequest(TodolistsListRequestSchema, request);

    // 2. 只按服务端提供的 userId 查询
    const rows = await this.todoRepository.findByUserId({
      user_id: ctx.userId,
    });

    // 3. 映射为 Service 对外类型
    return todolistsListResponseMapper(rows);
  }

  async create(
    request: TodolistsCreateRequest,
    ctx: { userId: string }
  ): Promise<TodolistsCreateResponse> {
    const { data } = parseRequest(TodolistsCreateRequestSchema, request);

    const row = await this.todoRepository.create({
      data: {
        id: crypto.randomUUID(),
        user_id: ctx.userId,
        todo: data.todo,
        completed: false,
        // Repository 插入时会覆盖为 now；此处满足 TodoTableRow 类型占位
        created_at: null,
        updated_at: null,
        priority: data.priority,
        deadline: data.deadline ? data.deadline.toISOString().slice(0, 10) : null,
        // slice(0, 10) 截取日期部分
      },
    });

    return todolistsCreateResponseMapper(row);
  }

  async update(
    request: TodolistsUpdateRequest,
    ctx: { userId: string }
  ): Promise<TodolistsUpdateResponse> {
    const { data } = parseRequest(TodolistsUpdateRequestSchema, request);

    // 先校验归属，再更新（Repository 的 update 仅按 id，不含 user_id 条件）
    await this.assertTodoOwnedByUser(data.id, ctx.userId);

    const row = await this.todoRepository.update({
      id: data.id,
      data: {
        todo: data.todo,
        completed: data.completed,
        priority: data.priority,
        deadline: data.deadline ? data.deadline.toISOString().slice(0, 10) : null,
      },
    });

    return todolistsUpdateResponseMapper(row);
  }

  async delete(
    request: TodolistsDeleteRequest,
    ctx: { userId: string }
  ): Promise<TodolistsDeleteResponse> {
    const { data } = parseRequest(TodolistsDeleteRequestSchema, request);

    await this.assertTodoOwnedByUser(data.id, ctx.userId);

    await this.todoRepository.delete({ id: data.id });

    return todolistsDeleteResponseMapper(data.id);
  }

  /**
   * 确认待办存在且属于当前用户；否则统一报「未找到」，
   * 避免泄露「存在但属于别人」的信息（与落地计划一致）。
   */
  private async assertTodoOwnedByUser(
    todoId: string,
    userId: string
  // promise<void> 表示这个函数没有返回值
  // promise表示等异步执行完成再返回
  ): Promise<void> {
    const existing = await this.todoRepository.get({ id: todoId });
    if (!existing || existing.user_id !== userId) {
      throw new ServiceError(
        new Error("todo not found"),
        ServiceErrorCodes.TODO_NOT_FOUND
      );
    }
  }
}
