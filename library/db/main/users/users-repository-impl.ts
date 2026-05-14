import { eq } from "drizzle-orm";
import type { MainDbClient } from "@/library/db/main/client";
import { usersTable } from "@/library/db/main/drizzle/schema/main-schema/users-table";
import type { UsersRepository } from "@/library/db/main/users/users-repository";
import type {
  UsersCreateRequest,
  UsersGetRequest,
  UsersUpdateRequest,
} from "@/library/db/main/users/users-request.types";
import type {
  UsersCreateResponse,
  UsersGetResponse,
  UsersUpdateResponse,
} from "@/library/db/main/users/users-response.types";

export class UsersRepositoryImpl implements UsersRepository {
  private readonly db: MainDbClient;

  constructor(db: MainDbClient) {
    this.db = db;
  }

  async get(request: UsersGetRequest): Promise<UsersGetResponse> {
    const rows = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, request.id))
      .limit(1);
    return rows[0] ?? null;
  }

  async create(request: UsersCreateRequest): Promise<UsersCreateResponse> {
    const inserted = await this.db
      .insert(usersTable)
      .values({
        id: request.data.id,
        account: request.data.account,
        password: request.data.password,
        email: request.data.email,
        status: request.data.status,
        created_at: request.data.created_at,
        updated_at: request.data.updated_at,
      })
      .returning();
    const row = inserted[0];
    if (!row) {
      throw new Error("UsersRepository.create: insert failed");
    }
    return row;
  }

  async update(request: UsersUpdateRequest): Promise<UsersUpdateResponse> {
    const now = new Date();
    const updated = await this.db
      .update(usersTable)
      .set({
        ...(request.data.account !== undefined && {
          account: request.data.account,
        }),
        ...(request.data.password !== undefined && { password: request.data.password }),
        ...(request.data.email !== undefined && { email: request.data.email }),
        ...(request.data.status !== undefined && { status: request.data.status }),
        ...(request.data.created_at !== undefined && { created_at: request.data.created_at }),
        updated_at: now,
      })
      .where(eq(usersTable.id, request.id))
      .returning();
    const row = updated[0];
    if (!row) {
      throw new Error("UsersRepository.update: row not found");
    }
    return row;
  }
}
