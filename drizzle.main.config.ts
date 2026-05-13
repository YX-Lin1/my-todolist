import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./library/db/main/drizzle/schema/index.ts",
  out: "./library/db/main/drizzle/migrations",
  dbCredentials: {
    url: process.env.DATABASE_MAIN_URL ?? "",
  },
});
