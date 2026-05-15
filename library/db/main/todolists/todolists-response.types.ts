import type { todoTable } from "@/library/db/main/drizzle/schema/main-schema/todolists-table";

type TodoRowResponse = typeof todoTable.$inferSelect;

export type TodoGetResponse = TodoRowResponse | null;
export type TodoFindByUserIdResponse = TodoRowResponse[];
export type TodoCreateResponse = TodoRowResponse;
export type TodoUpdateResponse = TodoRowResponse;
