import { z } from "zod";

/** Numeric string (e.g. snowflake id). */
export const snowflakeStringSchema = z
  .string()
  .regex(/^\d+$/, "id must be a numeric string");

/** ISO date string -> Date (for API/DB string dates). */
export const isoDateSchema = z.string().pipe(z.coerce.date());

/** Comma-separated string -> string[]; already array passed through. */
export const tagsSchema = z
  .union([
    z.string().transform((s) =>
      s
        ? s
            .split(",")
            .map((x) => x.trim())
            .filter(Boolean)
        : []
    ),
    z.array(z.string()),
  ])
  .default([]);
