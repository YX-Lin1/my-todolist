import { z } from "zod";

export const LoginPostRequestSchema = z.object({
  data: z.object({
    account: z.string().trim(),
    password: z.string().trim(),
  }),
});

export const LogoutPostRequestSchema = z.object({
  data: z.object({
    token: z.string().trim(),
  }),
});

export const CheckTokenPostRequestSchema = z.object({
  data: z.object({
    token: z.string().trim(),
  }),
});

export type LoginPostRequest = z.input<typeof LoginPostRequestSchema>;
export type LogoutPostRequest = z.input<typeof LogoutPostRequestSchema>;
export type CheckTokenPostRequest = z.input<typeof CheckTokenPostRequestSchema>;