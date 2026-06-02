import bcrypt from "bcrypt";
import type { UsersRepository } from "@/library/db/main/users/users-repository";
import { ServiceError } from "../error";
import { ServiceErrorCodes } from "../error-codes";
import { parseRequest } from "../common/parse";
import { loginPostResponseMapper } from "./login-mapper";
import {
  LoginPostRequestSchema,
  type LoginPostRequest,
} from "./login-request.schema";
import type { LoginPostResponse } from "./login-response.schema";
import type { LoginService } from "./login-service";

export class LoginServiceImpl implements LoginService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async login(request: LoginPostRequest): Promise<LoginPostResponse> {
    // parseRequest检查前端传入的请求是否符合schema
    const { data: { account, password } } = parseRequest(
      LoginPostRequestSchema,
      request
    );

    const row = await this.usersRepository.findByAccount({ account });
    if (!row) {
      throw new ServiceError(
        new Error("login failed"),
        ServiceErrorCodes.LOGIN_FAILED
      );
    }

    const ok = await bcrypt.compare(password, row.password);
    if (!ok) {
      throw new ServiceError(
        new Error("login failed"),
        ServiceErrorCodes.LOGIN_FAILED
      );
    }

    return loginPostResponseMapper(row);
  }
}