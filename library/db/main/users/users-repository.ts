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

export interface UsersRepository {
  create(request: UsersCreateRequest): Promise<UsersCreateResponse>;
  get(request: UsersGetRequest): Promise<UsersGetResponse>;
  update(request: UsersUpdateRequest): Promise<UsersUpdateResponse>;
}
