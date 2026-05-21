import { z } from "zod";
import type {TodolistsListRequest, TodolistsCreateRequest, TodolistsUpdateRequest, TodolistsDeleteRequest} from "@/library/services/todolists/todolists-request.schema";
import { publicProcedure, router } from "@/library/trpc/trpc";

export const todolistsRouter = router({
  list: publicProcedure
    .input(z.custom<TodolistsListRequest>())
    .query(({ input, ctx }) => {
      const todolistsService = ctx.container.services.getTodolistsService();
      return todolistsService.list(input, { userId: ctx.userId });
    }),
  create: publicProcedure
    .input(z.custom<TodolistsCreateRequest>())
    .mutation(({ input, ctx }) => {
      const todolistsService = ctx.container.services.getTodolistsService();
      return todolistsService.create(input, ctx.userId);
    }),
  update: publicProcedure
    .input(z.custom<TodolistsUpdateRequest>())
    .mutation(({ input, ctx }) => {
      const todolistsService = ctx.container.services.getTodolistsService();
      return todolistsService.update(input, ctx.userId);
    }),
  delete: publicProcedure
    .input(z.custom<TodolistsDeleteRequest>())
    .mutation(({ input, ctx }) => {
      const todolistsService = ctx.container.services.getTodolistsService();
      return todolistsService.delete(input, ctx.userId);
    }),
});