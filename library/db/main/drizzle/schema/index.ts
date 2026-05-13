/** biome-ignore-all lint/performance/noBarrelFile: must export the schema-dts for Drizzle */

export { mainSchema as publicSchema } from "./main-schema";
export { ordersTable } from "./main-schema/orders-table";
export { productsTable } from "./main-schema/products-table";
export { usersTable } from "./main-schema/users-table";
export { todoTable } from "./main-schema/todolists-table";
