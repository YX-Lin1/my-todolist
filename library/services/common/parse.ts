import type { z } from "zod";

import { ServiceError } from "../error";
import { ServiceErrorCodes } from "../error-codes";

function fieldsFromZodError(error: z.ZodError): string[] {
  const paths = new Set<string>();
  for (const issue of error.issues) {
    const path =
      issue.path.length > 0 ? issue.path.map(String).join(".") : "(root)";
    paths.add(path);
  }
  return [...paths];
}

function parse<Schema extends z.ZodType>(
  schema: Schema,
  value: unknown,
  code: ServiceErrorCodes
): z.infer<Schema> {
  const result = schema.safeParse(value);
  if (result.success) {
    return result.data;
  }
  throw new ServiceError(result.error, code, {
    fields: fieldsFromZodError(result.error),
  });
}

export function parseRequest<Schema extends z.ZodType>(
  schema: Schema,
  value: unknown
): z.infer<Schema> {
  return parse(schema, value, ServiceErrorCodes.INVALID_REQUEST);
}

export function parseResponse<Schema extends z.ZodType>(
  schema: Schema,
  value: unknown
): z.infer<Schema> {
  return parse(schema, value, ServiceErrorCodes.INVALID_RESPONSE);
}
