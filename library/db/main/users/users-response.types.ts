import type { usersTable } from "@/library/db/main/drizzle/schema/main-schema/users-table";

type UsersRowResponse = typeof usersTable.$inferSelect;

export type UsersGetResponse = UsersRowResponse | null;
export type UsersCreateResponse = UsersRowResponse;
export type UsersUpdateResponse = UsersRowResponse;
