import type { TodoCreateResponse } from "@/library/db/main/todolists/todolists-response.types";
import { parseResponse } from "../common/parse";
import type {
  TodolistsCreateResponse,
  TodolistsDeleteResponse,
  TodolistsListResponse,
  TodolistsUpdateResponse,
} from "./todolists-response.schema";
import {
  TodolistsCreateResponseSchema,
  TodolistsDeleteResponseSchema,
  TodolistsListResponseSchema,
  TodolistsUpdateResponseSchema,
} from "./todolists-response.schema";

type TodoRow = TodoCreateResponse;

/** 将 Repository 返回的数据库行 → Service 对外结构，并用 Zod 做运行时校验 */
function mapListRow(row: TodoRow) {
  return {
    id: row.id,
    todo: row.todo,
    completed: row.completed,
  };
}

export function todolistsListResponseMapper(
  rows: TodoRow[]
): TodolistsListResponse {
  return parseResponse(TodolistsListResponseSchema, {
    data: rows.map(mapListRow),
  });
}

export function todolistsCreateResponseMapper(
  row: TodoRow
): TodolistsCreateResponse {
  return parseResponse(TodolistsCreateResponseSchema, {
    data: {
      id: row.id,
      user_id: row.user_id,
      todo: row.todo,
      completed: row.completed,
      created_at: row.created_at,
      updated_at: row.updated_at,
    },
  });
}

export function todolistsUpdateResponseMapper(
  row: TodoRow
): TodolistsUpdateResponse {
  return parseResponse(TodolistsUpdateResponseSchema, {
    data: {
      id: row.id,
      todo: row.todo,
      completed: row.completed,
      created_at: row.created_at,
      updated_at: row.updated_at,
    },
  });
}

export function todolistsDeleteResponseMapper(
  id: string
): TodolistsDeleteResponse {
  return parseResponse(TodolistsDeleteResponseSchema, {
    data: { id },
  });
}
