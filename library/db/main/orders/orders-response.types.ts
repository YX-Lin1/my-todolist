import type { ordersTable } from "@/library/db/main/drizzle/schema/main-schema/orders-table";

/** Single row from orders table. */
export type OrdersRowResponse = typeof ordersTable.$inferSelect;

export type OrdersGetResponse = OrdersRowResponse | null;
export type OrdersFindByUserIdResponse = OrdersRowResponse[];
export type OrdersCreateResponse = OrdersRowResponse;
export type OrdersUpdateResponse = OrdersRowResponse;
