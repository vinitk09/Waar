import { NextResponse } from "next/server";
import { courses } from "@/data/courses";
import { currentLearner, registerForCourse, sameOrigin, sessionCookie } from "@/lib/lms";
import { validateEnrolment } from "@/lib/enrolment-validation";

const attempts = new Map();
export async function POST(request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  let input;
  try {
    const text = await request.text();
    if (text.length > 8192) return NextResponse.json({ error: "Form is too large." }, { status: 413 });
    input = JSON.parse(text);
  } catch { return NextResponse.json({ error: "Invalid enrolment form." }, { status: 400 }); }
  const learner = await currentLearner();
  const validation = validateEnrolment(input, Boolean(learner));
  if (validation.error) return NextResponse.json(validation, { status: 400 });
  if (!courses.some(item => item.slug === validation.fields.courseId)) return NextResponse.json({ error: "Course not found." }, { status: 404 });
  const key = request.headers.get("x-forwarded-for") ?? "local";
  const recent = (attempts.get(key) ?? []).filter(time => time > Date.now() - 15 * 60000);
  if (recent.length >= 10) return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  attempts.set(key, [...recent, Date.now()]);
  try {
    const result = await registerForCourse(validation.fields, learner?.user.id);
    if (result.error) return NextResponse.json({ error: result.error }, { status: result.status });
    const response = NextResponse.json({ registrationId: result.registrationId }, { headers: { "Cache-Control": "no-store" } });
    if (result.token) response.cookies.set(sessionCookie, result.token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 8 * 3600 });
    return response;
  } catch { return NextResponse.json({ error: "Unable to save your enrolment. Please try again." }, { status: 500 }); }
}
