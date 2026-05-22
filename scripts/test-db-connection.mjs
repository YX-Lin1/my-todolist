import { readFileSync } from "node:fs";
import postgres from "postgres";

for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m) process.env[m[1]] = m[2].replace(/^"|"$/g, "");
}

const url = process.env.DATABASE_MAIN_URL;
if (!url) {
  console.error("DATABASE_MAIN_URL missing");
  process.exit(1);
}

console.log("Connecting to:", url.replace(/:[^:@]+@/, ":***@"));

const sql = postgres(url, { max: 1, ssl: "require" });

try {
  const ping = await sql`select 1 as ok`;
  console.log("ping:", ping);

  const rows = await sql`
    select id, user_id, todo, completed
    from public.todolists
    where user_id = ${process.env.MOCK_USER_ID}
    limit 5
  `;
  console.log("todolists rows:", rows.length, rows);
} catch (e) {
  console.error("FAIL:", e.message);
  if (e.cause) console.error("cause:", e.cause);
  console.error(e);
  process.exit(1);
} finally {
  await sql.end();
}
