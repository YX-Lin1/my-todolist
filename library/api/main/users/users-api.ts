import type { UsersGetRequest, UsersListRequest } from "./users-request.types";
import type {
  UsersGetResponse,
  UsersListResponse,
} from "./users-response.types";

/**
 * Port: users API for the main provider. Implementations use HttpClient.
 * Returns API response types only; services map to domain.
 */
export interface UsersApi {
  get(request: UsersGetRequest): Promise<UsersGetResponse>;
  list(request?: UsersListRequest): Promise<UsersListResponse>;
}
