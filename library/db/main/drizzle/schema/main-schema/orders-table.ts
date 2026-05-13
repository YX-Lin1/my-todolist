import { bigint, numeric, timestamp, varchar } from "drizzle-orm/pg-core";
import { mainSchema } from "../main-schema";

/**
 * Orders table: id (snowflake); userId/productId reference users/products (bigint); amount in a fixed decimal form.
 */
export const ordersTable = mainSchema.table("orders", {
  id: bigint("id", { mode: "bigint" }).primaryKey(),
  userId: bigint("user_id", { mode: "bigint" }).notNull(),
  productId: bigint("product_id", { mode: "bigint" }).notNull(),
  amount: numeric("amount", { precision: 14, scale: 2 }).notNull(),
  status: varchar("status", { length: 32 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
