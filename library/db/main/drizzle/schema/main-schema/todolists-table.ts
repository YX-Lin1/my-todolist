import { boolean, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./users-table";
import { mainSchema } from "../main-schema";

export const todoTable = mainSchema.table("todolists", {
  id: uuid("id").primaryKey(),
  user_id:uuid("user_id").references(() => usersTable.id).notNull(),
  todo:varchar("todo", { length: 255 }).notNull(),
  completed:boolean("completed").notNull().default(false),
  created_at:timestamp("created_at").defaultNow(),
  updated_at:timestamp("updated_at").defaultNow(),
});