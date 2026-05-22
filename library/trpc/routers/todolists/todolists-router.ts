import { z } from "zod";
import type {TodolistsListRequest, TodolistsCreateRequest, TodolistsUpdateRequest, TodolistsDeleteRequest} from "@/library/services/todolists/todolists-request.schema";
import { protectedProcedure, router } from "@/library/trpc/trpc";

export const todolistsRouter = router({
  list: protectedProcedure
    .input(z.custom<TodolistsListRequest>())
    .query(({ input, ctx }) => {
      const todolistsService = ctx.container.services.getTodolistsService();
      return todolistsService.list(input, { userId: ctx.userId });
    }),
  create: protectedProcedure
    .input(z.custom<TodolistsCreateRequest>())
    .mutation(({ input, ctx }) => {
      const todolistsService = ctx.container.services.getTodolistsService();
      return todolistsService.create(input, { userId: ctx.userId });
    }),
  update: protectedProcedure
    .input(z.custom<TodolistsUpdateRequest>())
    .mutation(({ input, ctx }) => {
      const todolistsService = ctx.container.services.getTodolistsService();
      return todolistsService.update(input, { userId: ctx.userId });
    }),
  delete: protectedProcedure
    .input(z.custom<TodolistsDeleteRequest>())
    .mutation(({ input, ctx }) => {
      const todolistsService = ctx.container.services.getTodolistsService();
      return todolistsService.delete(input, { userId: ctx.userId });
    }),
});