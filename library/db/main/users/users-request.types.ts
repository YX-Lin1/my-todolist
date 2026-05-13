import type { usersTable } from "@/library/db/main/drizzle/schema/main-schema/users-table";

type UsersTableRow = typeof usersTable.$inferSelect;

export interface UsersGetRequest {
  id: UsersTableRow["id"];
}

export interface UsersCreateRequest {
  /** Full row; id is snowflake from caller. */
  data: UsersTableRow;
}

export interface UsersUpdateRequest {
  data: Partial<UsersTableRow>;
  id: UsersTableRow["id"];
}
