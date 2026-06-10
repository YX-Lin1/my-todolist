// 读取浏览器 Cookie 中的 token，并设置到 tRPC 的 context 中
import { createAppContainer } from "@/library/di/container";

const SESSION_COOKIE_NAME = "MY-TOKEN";

function readCookieToken(req?: Request): string | undefined {
  if (!req) return undefined;

  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return undefined;

  const parts = cookieHeader.split(";").map((v) => v.trim());
  const found = parts.find((v) => v.startsWith(`${SESSION_COOKIE_NAME}=`));
  if (!found) return undefined;

  const value = decodeURIComponent(found.slice(`${SESSION_COOKIE_NAME}=`.length)).trim();
  return value || undefined;
}

async function resolveUserId(
  req: Request | undefined,
  // container的类型是 createAppContainer 返回的类型
  container: ReturnType<typeof createAppContainer>,
): Promise<string | undefined> {
  const token = readCookieToken(req);
  if (!token) return undefined; // 没有 Cookie → 未登录

  try {
    const loginService = container.services.getLoginService();
    const { userId } = await loginService.checkToken({ data: { token } });
    return userId;
  } catch {
    return undefined; // token 无效或过期 → 视为未登录
  }
}

// 上下文
export async function createTRPCContext(opts?: { req?: Request }) {
  const container = createAppContainer();

  return {
    signal: opts?.req?.signal,
    container,
    userId: await resolveUserId(opts?.req, container),
  };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;