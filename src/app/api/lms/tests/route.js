import { NextResponse } from "next/server";
import { currentLearner, sameOrigin, submitTest } from "@/lib/lms";

export async function POST(request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const learner = await currentLearner();
  if (!learner) return NextResponse.json({ error: "Please sign in." }, { status: 401 });
  let body;
  try {
    const text = await request.text();
    if (text.length > 32768) return NextResponse.json({ error: "Submission is too large." }, { status: 413 });
    body = JSON.parse(text);
  } catch { return NextResponse.json({ error: "Invalid test submission." }, { status: 400 }); }
  if (!body || typeof body.courseId !== "string" || typeof body.testId !== "string" ||
    typeof body.requestId !== "string" || !/^[a-f0-9-]{36}$/i.test(body.requestId)) {
    return NextResponse.json({ error: "Invalid test submission." }, { status: 400 });
  }
  try {
    const result = await submitTest(learner.user.id, body);
    return NextResponse.json(result.error ? { error: result.error } : { attempt: result.attempt },
      { status: result.status ?? 200, headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not save your result. Please retry your submission." }, { status: 500 });
  }
}
