import type { usersTable } from "@/library/db/main/drizzle/schema/main-schema/users-table";

type UsersTableRow = typeof usersTable.$inferSelect;

export interface UsersGetRequest {
  id: UsersTableRow["id"];
}

export interface UsersCreateRequest {
  data: UsersTableRow;
}

export interface UsersUpdateRequest {
  // 只传入需要更新的字段
  data: Partial<UsersTableRow>;
  id: UsersTableRow["id"];
}

export interface UsersDeleteRequest {
  id: UsersTableRow["id"];
}

export interface UsersListRequest { }

export interface UsersFindByAccountRequest {
  account: UsersTableRow["account"];
}