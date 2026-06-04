import { timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./users-table";
import { mainSchema } from "../main-schema";

export const sessionsTable = mainSchema.table("sessions", {
  id: uuid("id").primaryKey(),
  token:varchar("token", { length: 255 }).notNull().unique(),
  user_id:uuid("user_id").references(() => usersTable.id).notNull(),
  expires_at:timestamp("expires_at").notNull(),
});