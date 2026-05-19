import type { UsersFindByAccountResponse } from "@/library/db/main/users/users-response.types";
import type { LoginPostResponse } from "./login-response.schema";

/** 从 DB 行映射为登录成功响应（不含 password） */
export function loginPostResponseMapper(
  row: NonNullable<UsersFindByAccountResponse>
): LoginPostResponse {
  return {
    token: row.id,
    user: {
      id: row.id,
      account: row.account,
      email: row.email,
      status: row.status,
      created_at: row.created_at ?? new Date(),
      updated_at: row.updated_at ?? new Date(),
    },
  };
}