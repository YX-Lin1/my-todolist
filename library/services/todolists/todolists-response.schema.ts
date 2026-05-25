import { z } from "zod";

export const TodolistsListResponseSchema = z.object({
  data: z.array(z.object({
    id: z.pipe(z.string(), z.uuid()),
    todo: z.string().trim(),
    completed: z.boolean(),
  })),
});
export const TodolistsCreateResponseSchema = z.object({
  data: z.object({
    id: z.pipe(z.string(), z.uuid()),
    user_id: z.pipe(z.string(), z.uuid()),
    todo: z.string().trim(),
    completed: z.boolean(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
  }),
});
export const TodolistsUpdateResponseSchema = z.object({
  data: z.object({
    id: z.pipe(z.string(), z.uuid()),
    todo: z.string().trim(),
    completed: z.boolean(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
  }),
});
export const TodolistsDeleteResponseSchema = z.object({
  data: z.object({
    id: z.pipe(z.string(), z.uuid()),
  }),
});

export type TodolistsListResponse = z.infer<typeof TodolistsListResponseSchema>;
export type TodolistsCreateResponse = z.infer<typeof TodolistsCreateResponseSchema>;
export type TodolistsUpdateResponse = z.infer<typeof TodolistsUpdateResponseSchema>;
export type TodolistsDeleteResponse = z.infer<typeof TodolistsDeleteResponseSchema>;