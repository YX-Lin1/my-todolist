import { boolean, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { mainSchema } from "../main-schema";

export const usersTable = mainSchema.table("users", {
  id: uuid("id").primaryKey(),
  account:varchar("account", { length: 255 }).notNull(),
  password:varchar("password", { length: 255 }).notNull(),
  email:varchar("email", { length: 255 }).notNull(),
  status:boolean("status").notNull().default(true),
  created_at:timestamp("created_at").defaultNow(),
  updated_at:timestamp("updated_at").defaultNow(),
});
