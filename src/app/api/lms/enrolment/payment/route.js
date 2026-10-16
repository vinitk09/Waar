import { NextResponse } from "next/server";
import { currentLearner, sameOrigin, completeDemoPayment } from "@/lib/lms";

export async function POST(request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const learner = await currentLearner();
  if (!learner) return NextResponse.json({ error: "Please sign in before completing payment." }, { status: 401 });
  let body;
  try {
    const text = await request.text();
    if (text.length > 1024) return NextResponse.json({ error: "Invalid payment request." }, { status: 400 });
    body = JSON.parse(text);
  } catch { return NextResponse.json({ error: "Invalid payment request." }, { status: 400 }); }
  if (typeof body?.registrationId !== "string" || !/^[a-f0-9]{32}$/.test(body.registrationId) || body.confirmDemo !== true) {
    return NextResponse.json({ error: "Confirm the demo payment for your submitted enrolment." }, { status: 400 });
  }
  try {
    const result = await completeDemoPayment(learner.user.id, body.registrationId);
    return NextResponse.json(result.error ? { error: result.error } : { courseId: result.courseId, demo: true },
      { status: result.status ?? 200, headers: { "Cache-Control": "no-store" } });
  } catch { return NextResponse.json({ error: "Could not complete the demo payment. Please retry." }, { status: 500 }); }
}
