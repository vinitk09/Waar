import { NextResponse } from "next/server";
import { currentLearner, learningContent, setCompletion, sameOrigin } from "@/lib/lms";
export async function POST(request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const learner = await currentLearner();
  if (!learner) return NextResponse.json({ error: "Please sign in." }, { status: 401 });
  let body; try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid progress update." }, { status: 400 }); }
  if (!body || typeof body.courseId !== "string" || typeof body.lessonId !== "string" || typeof body.completed !== "boolean") return NextResponse.json({ error: "Invalid progress update." }, { status: 400 });
  if (!learningContent(body.courseId)?.lessons.some(item => item.id === body.lessonId)) return NextResponse.json({ error: "Lesson not found." }, { status: 404 });
  if (!await setCompletion(learner.user.id, body.courseId, body.lessonId, body.completed)) return NextResponse.json({ error: "This course is outside your active enrolments." }, { status: 403 });
  return NextResponse.json({ ok: true });
}
