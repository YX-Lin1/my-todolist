import { eq } from "drizzle-orm";
import type { MainDbClient } from "@/library/db/main/client";
import { productsTable } from "@/library/db/main/drizzle/schema/main-schema/products-table";
import type { ProductsRepository } from "@/library/db/main/products/products-repository";
import type {
  ProductsCreateRequest,
  ProductsGetRequest,
  ProductsUpdateRequest,
} from "@/library/db/main/products/products-request.types";
import type {
  ProductsCreateResponse,
  ProductsGetResponse,
  ProductsUpdateResponse,
} from "@/library/db/main/products/products-response.types";

export class ProductsRepositoryImpl implements ProductsRepository {
  private readonly db: MainDbClient;

  constructor(db: MainDbClient) {
    this.db = db;
  }

  async get(request: ProductsGetRequest): Promise<ProductsGetResponse> {
    const rows = await this.db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, request.id))
      .limit(1);
    return rows[0] ?? null;
  }

  async create(
    request: ProductsCreateRequest
  ): Promise<ProductsCreateResponse> {
    const now = new Date();
    const inserted = await this.db
      .insert(productsTable)
      .values({
        id: request.data.id,
        name: request.data.name,
        sku: request.data.sku ?? null,
        price: request.data.price,
        status: request.data.status ?? null,
        createdAt: now,
        updatedAt: now,
      })
      .returning();
    const row = inserted[0];
    if (!row) {
      throw new Error("ProductsRepository.create: insert failed");
    }
    return row;
  }

  async update(
    request: ProductsUpdateRequest
  ): Promise<ProductsUpdateResponse> {
    const now = new Date();
    const updated = await this.db
      .update(productsTable)
      .set({
        ...(request.data.name !== undefined && { name: request.data.name }),
        ...(request.data.sku !== undefined && { sku: request.data.sku }),
        ...(request.data.price !== undefined && {
          price: request.data.price,
        }),
        ...(request.data.status !== undefined && {
          status: request.data.status,
        }),
        updatedAt: now,
      })
      .where(eq(productsTable.id, request.id))
      .returning();
    const row = updated[0];
    if (!row) {
      throw new Error("ProductsRepository.update: row not found");
    }
    return row;
  }
}
