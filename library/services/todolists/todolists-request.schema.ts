import { z } from "zod";

export const TodolistsListRequestSchema = z.object({});
export const TodolistsCreateRequestSchema = z.object({
  data: z.object({
    todo: z.string().trim(),
    completed: z.boolean(),
  }),
});
export const TodolistsUpdateRequestSchema = z.object({
  data: z.object({
    id: z.pipe(z.string(), z.uuid()),
    todo: z.string().trim(),
    completed: z.boolean(),
  }),
});
export const TodolistsDeleteRequestSchema = z.object({
  data: z.object({
    id: z.pipe(z.string(), z.uuid()),
  }),
});
export type TodolistsListRequest = z.input<typeof TodolistsListRequestSchema>
export type TodolistsCreateRequest = z.input<typeof TodolistsCreateRequestSchema>
export type TodolistsUpdateRequest = z.input<typeof TodolistsUpdateRequestSchema>
export type TodolistsDeleteRequest = z.input<typeof TodolistsDeleteRequestSchema> 