import type {
  TodoCreateRequest,
  TodoDeleteRequest,
  TodoFindByUserIdRequest,
  TodoGetRequest,
  TodoUpdateRequest,
} from "./todolists-request.types";
import type {
  TodoCreateResponse,
  TodoDeleteResponse,
  TodoFindByUserIdResponse,
  TodoGetResponse,
  TodoUpdateResponse,
} from "./todolists-response.types";

export interface TodoRepository {
  create(request: TodoCreateRequest): Promise<TodoCreateResponse>;
  findByUserId(
    request: TodoFindByUserIdRequest
  ): Promise<TodoFindByUserIdResponse>;
  get(request: TodoGetRequest): Promise<TodoGetResponse>;
  update(request: TodoUpdateRequest): Promise<TodoUpdateResponse>;
  delete(request: TodoDeleteRequest): Promise<TodoDeleteResponse>;
}