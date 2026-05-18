import { z } from "zod";
import type { LoginPostRequest } from "@/library/services/login/login-request.schema";
import { publicProcedure, router } from "@/library/trpc/trpc";

export const loginRouter = router({
  login: publicProcedure
    .input(z.custom<LoginPostRequest>())
    .mutation(({ input, ctx }) => {
      const loginService = ctx.container.services.getLoginService();
      return loginService.login(input);
    }),
});