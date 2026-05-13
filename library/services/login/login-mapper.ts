import type { LoginPostResponse as ApiLoginPostResponse } from "@/library/api/main/login/login-response.types";
import { parseResponse } from "../common/parse";
import type { LoginPostResponse } from "./login-response.schema";
import { MainApiLoginPostResponseSchema } from "./login-response.schema";

export function loginPostResponseMapper(
    apiLogin: ApiLoginPostResponse
): LoginPostResponse {
  return {
    ...parseResponse(MainApiLoginPostResponseSchema, apiLogin),
  };
}