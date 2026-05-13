import { z } from "zod";
import { isoDateSchema, snowflakeStringSchema } from "../common/schemas";

/**
 * Parse API get response (e.g. string dates -> Date) into normalized shape.
 */
export const MainApiUsersGetResponseSchema = z
  .object({
    id: snowflakeStringSchema,
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .transform((raw) => ({
    id: raw.id,
    email: raw.email,
    firstName: raw.firstName,
    lastName: raw.lastName,
    createdAt: isoDateSchema.parse(raw.createdAt),
    updatedAt: isoDateSchema.parse(raw.updatedAt),
  }));

/** Flattened get response: API + DB parts merged. */
export const UsersGetResponseSchema = MainApiUsersGetResponseSchema;
export type UsersGetResponse = z.infer<typeof UsersGetResponseSchema>;
