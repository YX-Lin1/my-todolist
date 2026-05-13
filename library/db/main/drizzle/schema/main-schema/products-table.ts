import { bigint, numeric, timestamp, varchar } from "drizzle-orm/pg-core";
import { mainSchema } from "../main-schema";

/**
 * Products table: id (snowflake), name, price, optional sku and status.
 */
export const productsTable = mainSchema.table("products", {
  id: bigint("id", { mode: "bigint" }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  sku: varchar("sku", { length: 64 }),
  price: numeric("price", { precision: 14, scale: 2 }).notNull(),
  status: varchar("status", { length: 32 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
