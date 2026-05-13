/**
 * External API response shapes (TypeScript only; validation in services).
 * Naming convention: ClassName(method) + MethodName + Response.
 * UsersApi -> UsersGetResponse / UsersListResponse.
 */

export interface UsersGetResponse {
  /** ISO 8601 datetime string */
  createdAt: string;
  email: string;
  firstName: string;
  /** Snowflake ID, transmitted as string in JSON */
  id: string;
  lastName: string;
  /** ISO 8601 datetime string */
  updatedAt: string;
}

export interface UsersListResponseUser {
  /** ISO 8601 datetime string */
  createdAt: string;
  email: string;
  firstName: string;
  /** Snowflake ID, transmitted as string in JSON */
  id: string;
  lastName: string;
  /** ISO 8601 datetime string */
  updatedAt: string;
}

export interface UsersListResponse {
  limit: number;
  skip: number;
  total: number;
  users: UsersListResponseUser[];
}
