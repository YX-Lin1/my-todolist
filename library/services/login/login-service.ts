import type { LoginPostRequest } from "./login-request.schema";
import { LoginPostResponse } from "./login-response.schema";

export interface LoginService {
  login(request: LoginPostRequest): Promise<LoginPostResponse>;
}