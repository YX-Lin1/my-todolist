import { z } from "zod";

export const LoginUserSchema = z
  .object({
      id: z.string(),
      account: z.string(),
      email: z.string(),
      status: z.boolean(),
      created_at: z.coerce.date(),
      updated_at: z.coerce.date(),
  });
export const LoginPostResponseSchema = z.object({
    token: z.string(), 
    user: LoginUserSchema,
  });

export type LoginPostResponse = z.infer<typeof LoginPostResponseSchema>;