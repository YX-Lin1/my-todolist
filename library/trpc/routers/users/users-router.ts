import { z } from "zod";
import type { UsersGetRequest } from "@/library/services/users/users-request.schema";
import { publicProcedure, router } from "@/library/trpc/trpc";

export const usersRouter = router({
  get: publicProcedure
    /**
     * Project convention:
     * 1. tRPC procedures provide TypeScript input typing and type inference only,
     * and do not perform runtime structural validation at this layer.
     * 2. Runtime validation (input shape and business rules) is centralized in
     * the Service layer (and its schemas).
     */
    .input(z.custom<UsersGetRequest>())
    .query(({ input, ctx }) => {
      const usersService = ctx.container.services.getUsersService();
      return usersService.get(input);
    }),
});
