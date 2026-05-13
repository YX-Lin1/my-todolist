import type { productsTable } from "@/library/db/main/drizzle/schema/main-schema/products-table";

type ProductsTableRow = typeof productsTable.$inferSelect;

export interface ProductsGetRequest {
  id: ProductsTableRow["id"];
}

export interface ProductsCreateRequest {
  /** Row with snowflake id; timestamps set by repo. */
  data: Omit<ProductsTableRow, "createdAt" | "updatedAt">;
}

export interface ProductsUpdateRequest {
  data: Partial<Omit<ProductsTableRow, "createdAt" | "updatedAt">>;
  id: ProductsTableRow["id"];
}
