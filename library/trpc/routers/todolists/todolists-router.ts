import { z } from "zod";
import type {TodolistsListRequest, TodolistsCreateRequest, TodolistsUpdateRequest, TodolistsDeleteRequest} from "@/library/services/todolists/todolists-request.schema";
import { protectedProcedure, router } from "@/library/trpc/trpc";

export const todolistsRouter = router({
  list: protectedProcedure
  // .input(...)声明前端传来的参数类型
  // TodolistsListRequest告诉 tRPC：input 应该长什么样子
  // z.custom<TodolistsListRequest>() 表示将 TodolistsListRequest 转换为 zod 的输入类型
    .input(z.custom<TodolistsListRequest>())
    .query(({ input, ctx }) => {
      // 从依赖注入容器里取出待办事项 Service
      const todolistsService = ctx.container.services.getTodolistsService();
      // 把参数交给 Service，并带上当前用户 id
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