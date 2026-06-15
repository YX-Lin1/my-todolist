import { z } from "zod";

export const RegisterPostResponseSchema = z.object({
  data: z.object({
    id: z.string(),
    account: z.string(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date()
  }),
  success: z.boolean(),
});

export type RegisterPostResponse = z.infer<typeof RegisterPostResponseSchema>;