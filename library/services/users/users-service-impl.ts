import type { UsersApi } from "@/library/api/main/users/users-api";
import { parseRequest } from "../common/parse";
import { usersGetResponseMapper } from "./users-mapper";
import {
  type UsersGetRequest,
  UsersGetRequestSchema,
} from "./users-request.schema";
import type { UsersGetResponse } from "./users-response.schema";
import type { UsersService } from "./users-service";

export class UsersServiceImpl implements UsersService {
  private readonly usersApi: UsersApi;

  constructor(usersApi: UsersApi) {
    this.usersApi = usersApi;
  }

  async get(request: UsersGetRequest): Promise<UsersGetResponse> {
    const parsed = parseRequest(UsersGetRequestSchema, request);
    const idStr = parsed.id;

    const [apiUser] = await Promise.all([
      this.usersApi.get({ path: { id: idStr } }),
    ]);

    return usersGetResponseMapper(apiUser);
  }
}
