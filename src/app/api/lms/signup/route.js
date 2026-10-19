import { NextResponse } from "next/server";
import { createLearner, currentLearner, sameOrigin, sessionCookie } from "@/lib/lms";
import { validateSignup } from "@/lib/signup-validation";

const attempts = new Map();
export async function POST(request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const key = request.headers.get("x-forwarded-for") ?? "local";
  const recent = (attempts.get(key) ?? []).filter(time => time > Date.now() - 15 * 60000);
  if (recent.length >= 10) return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  attempts.set(key, [...recent, Date.now()]);
  let input;
  try {
    const text = await request.text();
    if (text.length > 8192) return NextResponse.json({ error: "Form is too large." }, { status: 413 });
    input = JSON.parse(text);
  } catch { return NextResponse.json({ error: "Invalid sign-up form." }, { status: 400 }); }
  const validation = validateSignup(input);
  if (validation.error) return NextResponse.json(validation, { status: 400 });
  if (await currentLearner()) return NextResponse.json({ error: "You are already signed in. Sign out before creating another account." }, { status: 409 });
  try {
    const result = await createLearner(validation.fields);
    if (result.error) return NextResponse.json({ error: result.error }, { status: result.status });
    const response = NextResponse.json({ ok: true }, { status: 201, headers: { "Cache-Control": "no-store" } });
    response.cookies.set(sessionCookie, result.token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 8 * 3600 });
    return response;
  } catch { return NextResponse.json({ error: "Unable to create your account. Please try again." }, { status: 500 }); }
}
