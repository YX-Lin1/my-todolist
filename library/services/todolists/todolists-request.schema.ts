import { z } from "zod";

export const TodolistsListRequestSchema = z.object({});
export const TodolistsCreateRequestSchema = z.object({
  data: z.object({
    todo: z.string().trim().min(1),
    completed: z.boolean(),
    priority: z.enum(["low", "medium", "high"]),
    deadline: z.date().optional().nullable(),
  }),
});
export const TodolistsUpdateRequestSchema = z.object({
  data: z.object({
    id: z.pipe(z.string(), z.uuid()),
    todo: z.string().trim().min(1),
    completed: z.boolean(),
    priority: z.enum(["low", "medium", "high"]),
    deadline: z.date().optional().nullable(),
  }),
});
export const TodolistsDeleteRequestSchema = z.object({
  data: z.object({
    id: z.pipe(z.string(), z.uuid()),
  }),
});
// z.input<typeof TodolistsListRequestSchema> 表示将 TodolistsListRequestSchema 转换为 zod 的输入类型
// TodolistsListRequest 只是告诉 TypeScript「request 按规定应该是空对象 {}」，并不是 request 的数据来源
export type TodolistsListRequest = z.input<typeof TodolistsListRequestSchema>
export type TodolistsCreateRequest = z.input<typeof TodolistsCreateRequestSchema>
export type TodolistsUpdateRequest = z.input<typeof TodolistsUpdateRequestSchema>
export type TodolistsDeleteRequest = z.input<typeof TodolistsDeleteRequestSchema> 