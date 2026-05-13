import { z } from "zod";
import { isoDateSchema, snowflakeStringSchema } from "../common/schemas";

export const MainApiLoginPostResponseSchema = z
  .object({
    token: z.string(),
    user: z.object({
      id: z.string(),
      account: z.string(),
      email: z.string(),
      status: z.boolean(),
      createdAt: z.string(),
      updatedAt: z.string(),
    }),
  })
  .transform((raw:any) => ({
    token: raw.token,
    user: {
      id: raw.user.id,
      account: raw.user.account,
      email: raw.user.email,
      status: raw.user.status,
      createdAt: isoDateSchema.parse(raw.user.createdAt),
      updatedAt: isoDateSchema.parse(raw.user.updatedAt),
    },
  }));

export const LoginPostResponseSchema = MainApiLoginPostResponseSchema;
export type LoginPostResponse = z.infer<typeof LoginPostResponseSchema>;