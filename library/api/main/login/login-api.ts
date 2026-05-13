import type { LoginPostRequest } from "./login-request.types";
import type { LoginPostResponse } from "./login-response.types";

export interface LoginApi {
  post(request: LoginPostRequest): Promise<LoginPostResponse>;
}