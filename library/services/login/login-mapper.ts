import type { UsersFindByAccountResponse } from "@/library/db/main/users/users-response.types";
import type { LoginPostResponse, LogoutPostResponse, CheckTokenPostResponse } from "./login-response.schema";
import type { SessionsFindByTokenResponse } from "@/library/db/main/sessions/sessions-response.types";

/** 从 DB 行映射为登录成功响应（不含 password） */
export function loginPostResponseMapper(
  row: NonNullable<UsersFindByAccountResponse>,
  token: string
): LoginPostResponse {
  return {
    token: token,
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

export function logoutPostResponseMapper(row: NonNullable<SessionsFindByTokenResponse>): LogoutPostResponse {
  return {
    success: true,
  };
}

export function checkTokenPostResponseMapper(row: NonNullable<SessionsFindByTokenResponse>): CheckTokenPostResponse {
  return {
    userId: row.user_id,
  };
}