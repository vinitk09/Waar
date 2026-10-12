import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { endSession, sameOrigin, sessionCookie } from "@/lib/lms";
export async function POST(request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  await endSession((await cookies()).get(sessionCookie)?.value);
  const response = NextResponse.json({ ok: true }); response.cookies.delete(sessionCookie); return response;
}
