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

export interface TodolistsService {
  list(
    request: TodolistsListRequest,
    ctx: { userId: string }
  ): Promise<TodolistsListResponse>;

  create(
    request: TodolistsCreateRequest,
    ctx: { userId: string }
  ): Promise<TodolistsCreateResponse>;

  update(
    request: TodolistsUpdateRequest,
    ctx: { userId: string }
  ): Promise<TodolistsUpdateResponse>;

  delete(
    request: TodolistsDeleteRequest,
    ctx: { userId: string }
  ): Promise<TodolistsDeleteResponse>;
}
