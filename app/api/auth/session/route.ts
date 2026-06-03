import { NextResponse } from "next/server";

type SessionBody = {
  userId?: string;
};

// 生产环境建议统一用 env 控制
const isProd = process.env.NODE_ENV === "production";
const COOKIE_NAME = "sg_user_id";

export async function POST(req: Request) {
  // 获取请求体
  const body = (await req.json()) as SessionBody;
  // 获取用户ID
  const userId = body.userId?.trim();

  // 如果用户ID不存在，返回400状态码
  if (!userId) {
    return NextResponse.json({ message: "userId required" }, { status: 400 });
  }

  // 创建响应对象
  const res = NextResponse.json({ ok: true });

  // 设置cookie
  res.cookies.set(COOKIE_NAME, userId, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    path: "/",
  });

  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });

  res.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    path: "/",
    maxAge: 0,
  });

  return res;
}