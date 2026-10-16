import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TestSeries from "@/components/courses/TestSeries";
import { courses } from "@/data/courses";
import { currentLearner, learnerTestAttempts } from "@/lib/lms";
import { publicCourseTests } from "@/lib/test-series";

export const metadata = { title: "Course Test Series | WAARR", robots: { index: false, follow: false } };
export function generateStaticParams() { return courses.map(course => ({ slug: course.slug })); }

async function Tests({ params }) {
  const learner = await currentLearner();
  if (!learner) { const { slug } = await params; redirect(`/portal/login?next=${encodeURIComponent(`/portal/learn/${slug}/tests`)}`); }
  const { slug } = await params;
  const course = courses.find(item => item.slug === slug);
  if (!course) notFound();
  if (!learner.enrolments.some(item => item.courseId === slug)) return <div className="mx-auto max-w-[800px] px-6 py-16"><h1 className="text-3xl font-semibold text-[#302830]">Test access unavailable</h1><p className="mt-5 text-sm leading-7 text-[#171717]">Complete the enrolment form and payment for this course to unlock its test series.</p><Link href={`/courses/${slug}/enrol`} className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-[#780c24]">Enrol and unlock course →</Link></div>;
  return <TestSeries course={{ slug: course.slug, title: course.title, short: course.short }} tests={publicCourseTests(slug)} initialAttempts={await learnerTestAttempts(learner.user.id, slug)} />;
}

export default function TestsPage(props) {
  return <><Header /><main className="min-h-[60vh] bg-[#faf7f5] font-sans"><Suspense fallback={<p role="status" className="p-8 text-sm text-[#171717]">Loading test series…</p>}><Tests {...props} /></Suspense></main><Footer /></>;
}
