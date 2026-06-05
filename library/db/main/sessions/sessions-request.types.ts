import type { sessionsTable } from "@/library/db/main/drizzle/schema/main-schema/sessions-table";

type SessionsTableRow = typeof sessionsTable.$inferSelect;

export interface SessionsCreateRequest {
  data: SessionsTableRow;
}

export interface SessionsFindByTokenRequest {
  token: SessionsTableRow["token"];
}

export interface SessionsDeleteRequest {
  token: SessionsTableRow["token"];
}