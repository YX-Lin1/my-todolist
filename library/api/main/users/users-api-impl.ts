import type { IHttpClient } from "@surgeteam/http-client/types";
import type { UsersApi } from "./users-api";
import type { UsersGetRequest, UsersListRequest } from "./users-request.types";
import type {
  UsersGetResponse,
  UsersListResponse,
} from "./users-response.types";

/**
 * Main provider users API implementation (e.g. DummyJSON /users). Uses injected IHttpClient.
 * Returns external API response shape only; no Zod, validation in services.
 */
export class UsersApiImpl implements UsersApi {
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async get(request: UsersGetRequest): Promise<UsersGetResponse> {
    const res = await this.httpClient.get<UsersGetResponse>(
      `/c/1317-6950-43be-866b/${request.path.id}`
    );
    return res.data;
  }

  async list(request?: UsersListRequest): Promise<UsersListResponse> {
    const skip = request?.query?.skip ?? 0;
    const limit = request?.query?.limit ?? 10;
    const res = await this.httpClient.get<UsersListResponse>(
      `/c/5f44-2083-4c58-ac70?skip=${skip}&limit=${limit}`
    );
    return res.data;
  }
}
