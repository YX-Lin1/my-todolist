import type { UsersGetResponse } from "@/library/db/main/users/users-response.types";
import type { LoginPostResponse } from "./login-response.schema";

/** 从 DB 行映射为登录成功响应（不含 password） */
export function loginPostResponseMapper(
  row: NonNullable<UsersGetResponse>
): LoginPostResponse {
  return {
    token: row.id,
    user: {
      id: row.id,
      account: row.account,
      email: row.email,
      status: row.status,
      createdAt: row.created_at ?? new Date(),
      updatedAt: row.updated_at ?? new Date(),
    },
  };
}