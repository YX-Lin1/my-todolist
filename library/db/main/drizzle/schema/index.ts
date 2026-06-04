/** biome-ignore-all lint/performance/noBarrelFile: must export the schema-dts for Drizzle */

export { mainSchema as publicSchema } from "./main-schema";
export { usersTable } from "./main-schema/users-table";
export { todoTable } from "./main-schema/todolists-table";
export { sessionsTable } from "./main-schema/sessions-table";