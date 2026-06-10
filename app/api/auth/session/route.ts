// 登录成功后，把 token 写进浏览器 Cookie；退出登录时清掉 Cookie
import { NextResponse } from "next/server";

type SessionBody = {
  token?: string;
};

const isProd = process.env.NODE_ENV === "production";
const SESSION_COOKIE_NAME = "MY-TOKEN";
const SESSION_COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days

export async function POST(req: Request) {
  // 获取请求体
  const body = (await req.json()) as SessionBody;
  // 获取token
  const token = body.token?.trim();
  if (!token) {
    return NextResponse.json({ message: "token required" }, { status: 400 });
  }

  // 设置cookie
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    path: "/", 
    maxAge: SESSION_COOKIE_MAX_AGE,
  });

  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });

  res.cookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    path: "/",
    maxAge: 0,
  });

  return res;
}