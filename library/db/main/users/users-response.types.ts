import type { usersTable } from "@/library/db/main/drizzle/schema/main-schema/users-table";

type UsersRowResponse = typeof usersTable.$inferSelect;

export type UsersGetResponse = UsersRowResponse | null;
export type UsersCreateResponse = UsersRowResponse;
export type UsersUpdateResponse = UsersRowResponse;
export type UsersDeleteResponse = UsersRowResponse;
export type UsersFindByAccountResponse = UsersRowResponse | null;

export type UsersListItem = Pick<UsersRowResponse, "id" | "account" | "email" | "status" | "created_at" | "updated_at">;
export type UsersListResponse = UsersListItem[];