import { z } from "zod";
import type { RegisterPostRequest } from "@/library/services/register/register-request.schema";
import { publicProcedure, router } from "@/library/trpc/trpc";

export const registerRouter = router({
  register: publicProcedure
    .input(z.custom<RegisterPostRequest>())
    .mutation(async ({ input, ctx }) => {
      const registerService = ctx.container.services.getRegisterService();
      return registerService.register(input);
    }),
});