import { z } from "zod";

export const RegisterPostRequestSchema = z.object({
  data: z.object({
    account: z.string().trim(),
    password: z.string().trim(),
    confirmPassword: z.string().trim(),
  }),
});

export type RegisterPostRequest = z.input<typeof RegisterPostRequestSchema>;