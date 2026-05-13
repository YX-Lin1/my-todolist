import type {
  UsersCreateRequest,
  UsersGetRequest,
  UsersUpdateRequest,
} from "./users-request.types";
import type {
  UsersCreateResponse,
  UsersGetResponse,
  UsersUpdateResponse,
} from "./users-response.types";

/**
 * Port: users persistence (extension storage). Implementations use Drizzle in db/main/users.
 * All methods use request for params and response for return types (aligned with api layer).
 */
export interface UsersRepository {
  create(request: UsersCreateRequest): Promise<UsersCreateResponse>;
  get(request: UsersGetRequest): Promise<UsersGetResponse>;
  update(request: UsersUpdateRequest): Promise<UsersUpdateResponse>;
}
