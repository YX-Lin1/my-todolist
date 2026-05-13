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
        tagsStr: request.data.tagsStr ?? null,
        bio: request.data.bio ?? null,
        avatarUrl: request.data.avatarUrl ?? null,
        extraJson: request.data.extraJson ?? null,
      })
      .returning();
    const row = inserted[0];
    if (!row) {
      throw new Error("UsersRepository.create: insert failed");
    }
    return row;
  }

  async update(request: UsersUpdateRequest): Promise<UsersUpdateResponse> {
    const updated = await this.db
      .update(usersTable)
      .set({
        ...(request.data.tagsStr !== undefined && {
          tagsStr: request.data.tagsStr,
        }),
        ...(request.data.bio !== undefined && { bio: request.data.bio }),
        ...(request.data.avatarUrl !== undefined && {
          avatarUrl: request.data.avatarUrl,
        }),
        ...(request.data.extraJson !== undefined && {
          extraJson: request.data.extraJson,
        }),
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
