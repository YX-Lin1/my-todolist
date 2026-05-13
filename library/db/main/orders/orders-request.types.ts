import type { ordersTable } from "@/library/db/main/drizzle/schema/main-schema/orders-table";

type OrdersTableRow = typeof ordersTable.$inferSelect;

export interface OrdersGetRequest {
  id: OrdersTableRow["id"];
}

export interface OrdersFindByUserIdRequest {
  userId: OrdersTableRow["userId"];
}

export interface OrdersCreateRequest {
  /** Row with snowflake id; timestamps set by repo. */
  data: Omit<OrdersTableRow, "createdAt" | "updatedAt">;
}

export interface OrdersUpdateRequest {
  data: Partial<Omit<OrdersTableRow, "createdAt" | "updatedAt">>;
  id: OrdersTableRow["id"];
}
