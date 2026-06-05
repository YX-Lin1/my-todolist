import { eq } from "drizzle-orm";
import type { MainDbClient } from "@/library/db/main/client";
import { sessionsTable } from "@/library/db/main/drizzle/schema/main-schema/sessions-table";
import type { SessionsRepository } from "@/library/db/main/sessions/sessions-repository";
import type {
  SessionsCreateRequest,
  SessionsDeleteRequest,
  SessionsFindByTokenRequest,
} from "@/library/db/main/sessions/sessions-request.types";
import type {
  SessionsCreateResponse,
  SessionsDeleteResponse,
  SessionsFindByTokenResponse,
} from "@/library/db/main/sessions/sessions-response.types";

export class SessionsRepositoryImpl implements SessionsRepository {
  private readonly db: MainDbClient;

  constructor(db: MainDbClient) {
    this.db = db;
  }

  async create(request: SessionsCreateRequest): Promise<SessionsCreateResponse> {
    const inserted = await this.db
      .insert(sessionsTable)
      .values({
        id: request.data.id,
        user_id: request.data.user_id,
        token: request.data.token,
        expires_at: request.data.expires_at,
      })
      .returning();
      // inserted[0]从数据库中返回的第一个元素
    const row = inserted[0];
    if (!row) {
      throw new Error("SessionsRepository.create: insert failed");
    }
    return row;
  }

  async findByToken(request: SessionsFindByTokenRequest): Promise<SessionsFindByTokenResponse> {
    const rows = await this.db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.token, request.token))
      .limit(1);
    return rows[0] ?? null;
  }

  async delete(request: SessionsDeleteRequest): Promise<SessionsDeleteResponse> {
    const deleted = await this.db
      .delete(sessionsTable)
      .where(eq(sessionsTable.token, request.token))
      .returning();
    const row = deleted[0];
    if (!row) {
      throw new Error("SessionsRepository.delete: delete failed");
    }
    return row;
  }
}