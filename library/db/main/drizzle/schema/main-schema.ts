// import { pgSchema } from "drizzle-orm/pg-core";

// export const mainSchema = pgSchema("public");

import { pgTable } from "drizzle-orm/pg-core";

/**
 * Supabase 业务表在 Postgres 默认 schema `public` 下（如 public.users）。
 * Drizzle 禁止 pgSchema("public")；默认 schema 应使用 pgTable。
 *
 * 为保持模板中 mainSchema.table(...) 的写法，将 pgTable 挂到 table 上。
 * 各 *-table.ts 无需修改。
 */
export const mainSchema = {
  table: pgTable,
};