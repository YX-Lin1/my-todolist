import { eq, desc } from "drizzle-orm";
import type { MainDbClient } from "@/library/db/main/client";
import { todoTable } from "@/library/db/main/drizzle/schema/main-schema/todolists-table";
import type { TodoRepository } from "@/library/db/main/todolists/todolists-repository";
import type {
  TodoCreateRequest,
  TodoFindByUserIdRequest,
  TodoGetRequest,
  TodoUpdateRequest,
  TodoDeleteRequest,
} from "@/library/db/main/todolists/todolists-request.types";
import type {
  TodoCreateResponse,
  TodoFindByUserIdResponse,
  TodoGetResponse,
  TodoUpdateResponse,
  TodoDeleteResponse,
} from "@/library/db/main/todolists/todolists-response.types";

export class TodoRepositoryImpl implements TodoRepository {
  private readonly db: MainDbClient;

  constructor(db: MainDbClient) {
    this.db = db;
  }
  async get(request: TodoGetRequest): Promise<TodoGetResponse> {
      const rows = await this.db
        .select()
        .from(todoTable)
        .where(eq(todoTable.id, request.id))
        .limit(1);
      return rows[0] ?? null;
    }
  
    async findByUserId(
      request: TodoFindByUserIdRequest
    ): Promise<TodoFindByUserIdResponse> {
      const rows = await this.db
        .select()
        .from(todoTable)
        .where(eq(todoTable.user_id, request.user_id))
        .orderBy(desc(todoTable.created_at));
      return rows;
    }
  
    async create(request: TodoCreateRequest): Promise<TodoCreateResponse> {
      const now = new Date();
      const inserted = await this.db
        .insert(todoTable)
        .values({
          id: request.data.id,
          user_id: request.data.user_id,
          todo: request.data.todo,
          completed: request.data.completed,
          created_at: now,
          updated_at: now,
          priority: request.data.priority,
          deadline: request.data.deadline,
        })
        .returning();
      const row = inserted[0];
      if (!row) {
        throw new Error("TodoRepository.create: insert failed");
      }
      return row;
    }
  
    async update(request: TodoUpdateRequest): Promise<TodoUpdateResponse> {
      const now = new Date();
      const updated = await this.db
        .update(todoTable)
        .set({
          ...(request.data.user_id !== undefined && {
            user_id: request.data.user_id,
          }),
          ...(request.data.todo !== undefined && {
            todo: request.data.todo,
          }),
          ...(request.data.completed !== undefined && {
            completed: request.data.completed,
          }),
          updated_at: now,
          priority: request.data.priority,
          deadline: request.data.deadline,
        })
        .where(eq(todoTable.id, request.id))
        .returning();
      const row = updated[0];
      if (!row) {
        throw new Error("TodoRepository.update: row not found");
      }
      return row;
    }

    async delete(request: TodoDeleteRequest): Promise<TodoDeleteResponse> {
      const deleted = await this.db
        .delete(todoTable)
        .where(eq(todoTable.id, request.id))
        .returning();
      if (deleted.length === 0) {
        throw new Error("TodoRepository.delete: row not found");
      }
      return deleted[0];
    }
  }
  
