import bcrypt from "bcrypt";
import type { UsersRepository } from "@/library/db/main/users/users-repository";
import { ServiceError } from "../error";
import { ServiceErrorCodes } from "../error-codes";
import { parseRequest } from "../common/parse";
import { loginPostResponseMapper, checkTokenPostResponseMapper } from "./login-mapper";
import {
  LoginPostRequestSchema,
  type LoginPostRequest,
  LogoutPostRequestSchema,
  type LogoutPostRequest,
  CheckTokenPostRequestSchema,
  type CheckTokenPostRequest,
} from "./login-request.schema";
import { LoginPostResponse, LogoutPostResponse, CheckTokenPostResponse } from "./login-response.schema";
import type { LoginService } from "./login-service";
import type { SessionsRepository } from "@/library/db/main/sessions/sessions-repository";
import { randomUUID } from "node:crypto";

export class LoginServiceImpl implements LoginService {
  constructor(private readonly usersRepository: UsersRepository,private readonly sessionsRepository: SessionsRepository,) {}

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
    const token = randomUUID();
    const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
    await this.sessionsRepository.create({
      data: {
        id: randomUUID(),
        token,
        user_id: row.id,
        expires_at: expiresAt,
      },
    });

    return loginPostResponseMapper(row, token);
  }

  async logout(request: LogoutPostRequest): Promise<LogoutPostResponse> {
    const { data: { token } } = parseRequest(
      LogoutPostRequestSchema,
      request
    );

    // const row = await this.sessionsRepository.delete({ token });
    // return logoutPostResponseMapper(row);
    return { success: true };
  }

  async checkToken(request: CheckTokenPostRequest): Promise<CheckTokenPostResponse> {
    const { data: { token } } = parseRequest(
      CheckTokenPostRequestSchema,
      request
    );

    const row = await this.sessionsRepository.findByToken({ token });
    if (!row) {
      throw new ServiceError(
        new Error("check token failed"),
        ServiceErrorCodes.CHECK_TOKEN_FAILED
      );
    }
    if (row.expires_at < new Date()) {
      throw new ServiceError(
        new Error("token expired"),
        ServiceErrorCodes.TOKEN_EXPIRED
      );
    }
    return checkTokenPostResponseMapper(row);
  }
}