import { eq } from "drizzle-orm";
import type { MainDbClient } from "@/library/db/main/client";
import { ordersTable } from "@/library/db/main/drizzle/schema/main-schema/orders-table";
import type { OrdersRepository } from "@/library/db/main/orders/orders-repository";
import type {
  OrdersCreateRequest,
  OrdersFindByUserIdRequest,
  OrdersGetRequest,
  OrdersUpdateRequest,
} from "@/library/db/main/orders/orders-request.types";
import type {
  OrdersCreateResponse,
  OrdersFindByUserIdResponse,
  OrdersGetResponse,
  OrdersUpdateResponse,
} from "@/library/db/main/orders/orders-response.types";

export class OrdersRepositoryImpl implements OrdersRepository {
  private readonly db: MainDbClient;

  constructor(db: MainDbClient) {
    this.db = db;
  }

  async get(request: OrdersGetRequest): Promise<OrdersGetResponse> {
    const rows = await this.db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.id, request.id))
      .limit(1);
    return rows[0] ?? null;
  }

  async findByUserId(
    request: OrdersFindByUserIdRequest
  ): Promise<OrdersFindByUserIdResponse> {
    const rows = await this.db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.userId, request.userId));
    return rows;
  }

  async create(request: OrdersCreateRequest): Promise<OrdersCreateResponse> {
    const now = new Date();
    const inserted = await this.db
      .insert(ordersTable)
      .values({
        id: request.data.id,
        userId: request.data.userId,
        productId: request.data.productId,
        amount: request.data.amount,
        status: request.data.status,
        createdAt: now,
        updatedAt: now,
      })
      .returning();
    const row = inserted[0];
    if (!row) {
      throw new Error("OrdersRepository.create: insert failed");
    }
    return row;
  }

  async update(request: OrdersUpdateRequest): Promise<OrdersUpdateResponse> {
    const now = new Date();
    const updated = await this.db
      .update(ordersTable)
      .set({
        ...(request.data.userId !== undefined && {
          userId: request.data.userId,
        }),
        ...(request.data.productId !== undefined && {
          productId: request.data.productId,
        }),
        ...(request.data.amount !== undefined && {
          amount: request.data.amount,
        }),
        ...(request.data.status !== undefined && {
          status: request.data.status,
        }),
        updatedAt: now,
      })
      .where(eq(ordersTable.id, request.id))
      .returning();
    const row = updated[0];
    if (!row) {
      throw new Error("OrdersRepository.update: row not found");
    }
    return row;
  }
}
