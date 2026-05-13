import type { UsersGetRequest } from "./users-request.schema";
import type { UsersGetResponse } from "./users-response.schema";

/**
 * Service to get user info (main user + DB part) by id.
 */
export interface UsersService {
  get(request: UsersGetRequest): Promise<UsersGetResponse>;
}
