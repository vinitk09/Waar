import { Suspense } from "react";
import { redirect } from "next/navigation";
import { learningDestination } from "@/lib/course-access";
import { currentLearner } from "@/lib/lms";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PortalLogin from "@/components/courses/PortalLogin";
import PortalSignup from "@/components/courses/PortalSignup";

function LoginScreen({ next, signup }) {
  return <><Header /><main className="bg-[#faf7f5] font-sans"><div className="mx-auto grid max-w-[1160px] gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_440px] lg:items-center lg:gap-16 lg:py-16"><div><p className="mb-5 text-[11px] font-semibold tracking-[0.18em] text-[#780c24] uppercase">WAARR Learning</p><h1 className="text-4xl leading-[1.1] font-bold tracking-[-0.04em] text-[#232025] sm:text-5xl">Your courses.<br /><span className="text-[#780c24]">Your learning journey.</span></h1><p className="mt-6 max-w-[500px] text-sm leading-7 text-[#171717]">Keep your enrolled courses, lesson progress, resources and timetable together in one place.</p><ul className="mt-7 space-y-3 text-sm text-[#59454e]"><li>✓ Course-by-course learning progress</li><li>✓ Your assigned timetable in IST</li><li>✓ Enrolment-controlled resource access</li></ul><Link href="/courses" className="mt-7 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-[#780c24]">Browse all courses<span aria-hidden="true">→</span></Link></div><section aria-labelledby="sign-in-heading" className="rounded-2xl border border-[#e3d5db] bg-white p-6 sm:p-8"><h2 id="sign-in-heading" className="mb-2 text-2xl font-semibold text-[#302830]">{signup ? "Create your learner account" : "Welcome back"}</h2><p className="mb-7 text-xs leading-6 text-[#171717]">{signup ? "Sign up to keep your purchases, courses and learning progress together. Enrol in a course whenever you're ready." : "Sign in to see your purchased courses and continue learning. A course unlocks after enrolment and payment are completed."}</p>{signup ? <PortalSignup next={next} /> : <PortalLogin next={next} />}</section></div></main><Footer /></>;
}


async function LoginGate({ searchParams, signup }) {
  const query = await searchParams;
  const next = learningDestination(query?.next);
  if (await currentLearner()) redirect(next);
  return <LoginScreen next={next} signup={signup} />;
}

export default function LearnerAccountPage(props) {
  return <Suspense fallback={<><Header /><main className="min-h-[60vh] bg-[#faf7f5] p-8 font-sans"><p role="status" className="text-sm text-[#171717]">Loading your learner account...</p></main><Footer /></>}><LoginGate {...props} /></Suspense>;
}
