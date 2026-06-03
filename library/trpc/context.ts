import { createAppContainer } from "@/library/di/container";

const COOKIE_NAME = "sg_user_id";

function readCookieUserId(req?: Request): string | undefined {
  if (!req) return undefined;

  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return undefined;

  const parts = cookieHeader.split(";").map((v) => v.trim());
  const found = parts.find((v) => v.startsWith(`${COOKIE_NAME}=`));
  if (!found) return undefined;

  const value = decodeURIComponent(found.slice(`${COOKIE_NAME}=`.length)).trim();
  return value || undefined;
}

function readMockUserId(): string | undefined {
  const id = process.env.MOCK_USER_ID?.trim();
  return id && id.length > 0 ? id : undefined;
}

function resolveUserId(req?: Request): string | undefined {
  // 1) 优先真实登录 Cookie
  const fromCookie = readCookieUserId(req);
  if (fromCookie) return fromCookie;

  // 2) 本地开发兜底（生产可移除）
  return readMockUserId();
}

export function createTRPCContext(opts?: { req?: Request }) {
  const container = createAppContainer();

  return {
    signal: opts?.req?.signal,
    container,
    userId: resolveUserId(opts?.req),
  };
}

export type Context = ReturnType<typeof createTRPCContext>;



// import { createAppContainer } from "@/library/di/container";

/**
 * Creates context for tRPC requests. Container is request-scoped for testability.
 */
// export function createTRPCContext(opts?: { req?: Request }) {
//   const container = createAppContainer();
//   return {
//     signal: opts?.req?.signal,
//     container,
//   };
// }

// export type Context = ReturnType<typeof createTRPCContext>;
