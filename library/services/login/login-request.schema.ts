import { z } from "zod";

export const LoginPostRequestSchema = z.object({
  data: z.object({
    account: z.string(),
    password: z.string(),
  }),
});
export type LoginPostRequest = z.input<typeof LoginPostRequestSchema>;