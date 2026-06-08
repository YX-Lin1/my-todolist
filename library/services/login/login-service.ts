import type { LoginPostRequest, LogoutPostRequest, CheckTokenPostRequest } from "./login-request.schema";
import { LoginPostResponse, LogoutPostResponse, CheckTokenPostResponse } from "./login-response.schema";

export interface LoginService {
  login(request: LoginPostRequest): Promise<LoginPostResponse>;
  logout(request: LogoutPostRequest): Promise<LogoutPostResponse>;
  checkToken(request: CheckTokenPostRequest): Promise<CheckTokenPostResponse>;
}