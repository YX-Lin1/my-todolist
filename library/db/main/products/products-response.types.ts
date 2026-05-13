import type { productsTable } from "@/library/db/main/drizzle/schema/main-schema/products-table";

type ProductsRowResponse = typeof productsTable.$inferSelect;

export type ProductsGetResponse = ProductsRowResponse | null;
export type ProductsCreateResponse = ProductsRowResponse;
export type ProductsUpdateResponse = ProductsRowResponse;
