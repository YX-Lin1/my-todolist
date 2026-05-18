import type {
  UsersCreateRequest,
  UsersGetRequest,
  UsersUpdateRequest,
  UsersDeleteRequest,
  UsersListRequest,
  UsersFindByAccountRequest,
} from "./users-request.types";
import type {
  UsersCreateResponse,
  UsersGetResponse,
  UsersUpdateResponse,
  UsersDeleteResponse,
  UsersListResponse,
  UsersFindByAccountResponse,
} from "./users-response.types";

export interface UsersRepository {
  create(request: UsersCreateRequest): Promise<UsersCreateResponse>;
  get(request: UsersGetRequest): Promise<UsersGetResponse>;
  update(request: UsersUpdateRequest): Promise<UsersUpdateResponse>;
  delete(request: UsersDeleteRequest): Promise<UsersDeleteResponse>;
  list(request: UsersListRequest): Promise<UsersListResponse>;
  findByAccount(request: UsersFindByAccountRequest): Promise<UsersFindByAccountResponse>;
}
