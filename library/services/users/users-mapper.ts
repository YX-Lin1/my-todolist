import type { UsersGetResponse as ApiUsersGetResponse } from "@/library/api/main/users/users-response.types";
import { parseResponse } from "../common/parse";
import type { UsersGetResponse } from "./users-response.schema";
import { MainApiUsersGetResponseSchema } from "./users-response.schema";

/**
 * Map API response + optional DB row into flattened get response.
 */
export function usersGetResponseMapper(
  apiUser: ApiUsersGetResponse
): UsersGetResponse {
  return {
    ...parseResponse(MainApiUsersGetResponseSchema, apiUser),
  };
}
