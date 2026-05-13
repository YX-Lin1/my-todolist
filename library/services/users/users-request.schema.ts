import { z } from "zod";
import { snowflakeStringSchema } from "../common/schemas";

export const UsersGetRequestSchema = z.object({
  id: snowflakeStringSchema,
});
export type UsersGetRequest = z.input<typeof UsersGetRequestSchema>;
