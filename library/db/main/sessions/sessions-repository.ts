import type {
  SessionsCreateRequest,
  SessionsDeleteRequest,
  SessionsFindByTokenRequest,
} from "./sessions-request.types";
import type {
  SessionsCreateResponse,
  SessionsDeleteResponse,
  SessionsFindByTokenResponse,
} from "./sessions-response.types";

export interface SessionsRepository {
  create(request: SessionsCreateRequest): Promise<SessionsCreateResponse>;
  findByToken(request: SessionsFindByTokenRequest): Promise<SessionsFindByTokenResponse>;
  delete(request: SessionsDeleteRequest): Promise<SessionsDeleteResponse>;  
}