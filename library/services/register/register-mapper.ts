import type { RegisterPostResponse } from "./register-response.schema.js";
import type { UsersCreateResponse } from "@/library/db/main/users/users-response.types";

export function registerPostResponseMapper(
  row: NonNullable<UsersCreateResponse>
): RegisterPostResponse {
  return {
    data: {
      id: row.id,
      account: row.account,
      created_at: row.created_at ?? new Date(),
      updated_at: row.updated_at ?? new Date(),
    },
    success: true,
  };
}