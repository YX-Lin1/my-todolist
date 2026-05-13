import type { LoginPostRequest } from "./login-request.schema";
import { LoginPostResponse } from "./login-response.schema";

export interface UsersService {
  post(request: LoginPostRequest): Promise<LoginPostResponse>;
}