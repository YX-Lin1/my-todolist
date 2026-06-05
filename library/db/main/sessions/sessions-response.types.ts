import type { sessionsTable } from "@/library/db/main/drizzle/schema/main-schema/sessions-table";

type SessionsRowResponse = typeof sessionsTable.$inferSelect;

export type SessionsCreateResponse = SessionsRowResponse;
export type SessionsFindByTokenResponse = SessionsRowResponse | null;
export type SessionsDeleteResponse = SessionsRowResponse;