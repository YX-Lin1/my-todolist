/**
 * API request shapes (TypeScript only).
 * Naming convention: ClassName(method) + MethodName + Request.
 * UsersApi -> UsersGetRequest / UsersListRequest.
 */

export interface UsersGetRequest {
  /** Snowflake ID, transmitted as string in JSON */
  path: { id: string };
}

export interface UsersListRequest {
  query?: { skip?: number; limit?: number };
}
