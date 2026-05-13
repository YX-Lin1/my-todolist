import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/env";
// biome-ignore lint/performance/noNamespaceImport: avoid namespace imports
import * as schema from "./drizzle/schema";

export interface MainDbClientOptions {
  connectionUrl?: string;
  maxConnections?: number;
}

export function createMainDbClient(options?: MainDbClientOptions) {
  const url = options?.connectionUrl ?? env.DATABASE_MAIN_URL;
  if (!url) {
    throw new Error("DATABASE_MAIN_URL is required for main DB");
  }
  const sql = postgres(url, { max: options?.maxConnections ?? 10 });
  return drizzle(sql, { schema });
}

export type MainDbClient = ReturnType<typeof createMainDbClient>;
