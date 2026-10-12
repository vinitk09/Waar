import { NextResponse } from "next/server";
import { startSession, sameOrigin, sessionCookie } from "@/lib/lms";

const attempts = new Map();
export async function POST(request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  const recent = (attempts.get(ip) ?? []).filter(time => time > Date.now() - 15 * 60000);
  if (recent.length >= 10) return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  attempts.set(ip, [...recent, Date.now()]);
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid sign-in request." }, { status: 400 }); }
  if (!body || typeof body !== "object" || (!body.demo && (typeof body.email !== "string" || typeof body.password !== "string" || body.email.length > 254 || body.password.length > 256))) return NextResponse.json({ error: "Enter your email and password." }, { status: 400 });
  const token = await startSession(body);
  if (!token) return NextResponse.json({ error: "Unable to sign in. Check your activated account details." }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(sessionCookie, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 8 * 3600 });
  return response;
}
