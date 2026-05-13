import type { IHttpClient } from "@surgeteam/http-client/types";
import type { LoginApi } from "./login-api";
import type { LoginPostRequest } from "./login-request.types";
import type { LoginPostResponse } from "./login-response.types";

export class LoginApiImpl implements LoginApi {
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async post(request: LoginPostRequest): Promise<LoginPostResponse> {
    const res = await this.httpClient.post<LoginPostResponse>(
      `/login`,
      request.data
    );
    return res.data;
  }
}