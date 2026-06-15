import type { RegisterService } from "./register-service";
import { RegisterPostRequestSchema, type RegisterPostRequest } from "./register-request.schema";
import { RegisterPostResponse } from "./register-response.schema";
import { parseRequest } from "../common/parse";
import { registerPostResponseMapper } from "./register-mapper";
import type { UsersRepository } from "@/library/db/main/users/users-repository";
import { ServiceError } from "../error";
import { ServiceErrorCodes } from "../error-codes";
import bcrypt from "bcrypt";
import { randomUUID } from "node:crypto";

export class RegisterServiceImpl implements RegisterService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async register(request: RegisterPostRequest): Promise<RegisterPostResponse> {
    const { data: { account, password} } = parseRequest(RegisterPostRequestSchema, request);

    const existingUser = await this.usersRepository.findByAccount({ account });
    if (existingUser) {
      throw new ServiceError(new Error("User already exists"), ServiceErrorCodes.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const row = await this.usersRepository.create({
      data: {
        id: randomUUID(),
        account,
        password: hashedPassword,
        email:"",
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return registerPostResponseMapper(row);
  }
}