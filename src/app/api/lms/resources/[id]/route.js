import { currentLearner, learningContent } from "@/lib/lms";
export async function GET(request, { params }) {
  const learner = await currentLearner();
  if (!learner) return new Response("Please sign in.", { status: 401 });
  const { id } = await params;
  let resource, course;
  for (const enrolment of learner.enrolments) {
    const content = learningContent(enrolment.courseId);
    resource = content?.resources.find(item => item.id === id);
    if (resource) { course = content.course; break; }
  }
  if (!resource) return new Response("Resource unavailable for your enrolment.", { status: 404 });
  const text = `WAARR - DEMONSTRATION WORKSHEET\nCourse: ${course.title}\n\nThis sample is not approved course teaching material.\n\nMy preparation goal:\n\nTopics to review:\n\nQuestions for my mentor:\n\nNext learning action:\n`;
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8", "Content-Disposition": `attachment; filename="${id}.txt"`, "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" } });
}
