import { z } from "zod";
import type { LoginPostRequest } from "@/library/services/login/login-request.schema";
import { publicProcedure, router } from "@/library/trpc/trpc";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "MY-TOKEN";
const SESSION_COOKIE_MAX_AGE = 1 * 24 * 60 * 60; // 1 day
const isProd = process.env.NODE_ENV === "production";

export const loginRouter = router({
  login: publicProcedure
    .input(z.custom<LoginPostRequest>())
    .mutation(async ({ input, ctx }) => {
      const loginService = ctx.container.services.getLoginService();
      const result = await loginService.login(input);

      const cookieStore = await cookies();
      cookieStore.set(SESSION_COOKIE_NAME, result.token, {
        httpOnly: true,
        sameSite: "lax",
        secure: isProd,
        path: "/",
        maxAge: SESSION_COOKIE_MAX_AGE,
      });

      return result;
    }),

  logout: publicProcedure
    .mutation(async () => {
      const cookieStore = await cookies();
      cookieStore.delete(SESSION_COOKIE_NAME);

      return { success: true };
    }),
});