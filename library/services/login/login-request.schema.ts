import { z } from "zod";

export const LoginPostRequestSchema = z.object({
  data: z.object({
    account: z.string().trim(),
    password: z.string().trim(),
  }),
});
export type LoginPostRequest = z.input<typeof LoginPostRequestSchema>;