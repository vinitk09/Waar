import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EnrolmentForm from "@/components/courses/EnrolmentForm";
import { courses } from "@/data/courses";
import { currentLearner, courseRegistration, demoPaymentsEnabled } from "@/lib/lms";

export const metadata = { title: "Course Enrolment | WAARR", robots: { index: false, follow: false } };
export function generateStaticParams() { return courses.map(course => ({ slug: course.slug })); }

async function Enrol({ params }) {
  const { slug } = await params;
  const course = courses.find(item => item.slug === slug);
  if (!course) notFound();
  const learner = await currentLearner();
  const unlocked = learner?.enrolments.some(item => item.courseId === slug);
  const registration = learner ? await courseRegistration(learner.user.id, slug) : null;
  return <div className="mx-auto max-w-[1160px] px-6 py-8 sm:px-10 lg:px-12">
    <Link href={`/courses/${slug}`} className="inline-flex min-h-11 items-center text-sm font-semibold text-[#780c24]">← Course details</Link>
    <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
      <section className="rounded-2xl border border-[#e3d5db] bg-white p-6 sm:p-8">
        <h1 className="mb-7 text-3xl font-semibold tracking-tight text-[#232025]">{unlocked ? "Your course is unlocked" : "Unlock your course"}</h1>
        {unlocked ? <><p className="text-sm leading-7 text-[#171717]">You have completed enrolment and payment for {course.title}.</p><Link href={`/portal/learn/${slug}`} className="mt-6 inline-flex min-h-12 items-center rounded-lg bg-[#780c24] px-5 py-3 text-sm font-semibold text-white">Continue to course →</Link></> : <EnrolmentForm key={learner?.user.id ?? "guest"} course={{ slug, title: course.title }} learner={learner?.user ?? null} registration={registration} demoPayment={demoPaymentsEnabled()} />}
      </section>
      <aside className="h-fit rounded-2xl border border-[#e9e1e4] bg-white p-6"><p className="text-xs font-semibold tracking-wider text-[#780c24] uppercase">{unlocked ? "Course unlocked" : "Course locked"}</p><h2 className="mt-4 text-xl font-semibold text-[#302830]">{course.title}</h2><p className="mt-4 text-sm leading-7 text-[#171717]">{course.description}</p><h3 className="mt-6 text-sm font-semibold text-[#40323a]">Access after enrolment and payment</h3><ul className="mt-3 space-y-2 text-sm leading-7 text-[#171717]"><li>Course lessons and learning resources</li><li>Course test series and answer reviews</li><li>Progress and saved test results</li><li>Your course timetable</li></ul></aside>
    </div>
  </div>;
}

export default function EnrolPage(props) {
  return <><Header /><main className="min-h-[60vh] bg-[#faf7f5] font-sans"><Suspense fallback={<p role="status" className="p-8 text-sm text-[#171717]">Loading enrolment…</p>}><Enrol {...props} /></Suspense></main><Footer /></>;
}
