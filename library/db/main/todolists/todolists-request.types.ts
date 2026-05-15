import type { todoTable } from "@/library/db/main/drizzle/schema/main-schema/todolists-table";

type TodoTableRow = typeof todoTable.$inferSelect;

export interface TodoGetRequest {
  id: TodoTableRow["id"];
}

export interface TodoFindByUserIdRequest {
  user_id: TodoTableRow["user_id"];
}

export interface TodoCreateRequest {
  data: TodoTableRow;
}

export interface TodoUpdateRequest {
  data: Partial<TodoTableRow>;
  id: TodoTableRow["id"];
}

export interface TodoDeleteRequest {
  id: TodoTableRow["id"];
}