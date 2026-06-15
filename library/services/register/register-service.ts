import type { RegisterPostRequest } from "./register-request.schema.js";
import type { RegisterPostResponse } from "./register-response.schema.js";

export interface RegisterService {
  register(request: RegisterPostRequest): Promise<RegisterPostResponse>;
}