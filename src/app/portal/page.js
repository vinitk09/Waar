import { Suspense } from "react";
import { redirect } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LearnerDashboard from "@/components/courses/LearnerDashboard";
import { currentLearner, learningContent, demoTimetable } from "@/lib/lms";

export const metadata = { title: "My Learning | WAARR", robots: { index: false, follow: false } };
async function Dashboard() {
  const learner=await currentLearner(); if(!learner) redirect("/portal/login");
  const enrolled=learner.enrolments.map(enrolment=>{const content=learningContent(enrolment.courseId);return content ? {...content,enrolment,completed:(learner.progress[enrolment.courseId]??[]).filter(id=>content.lessons.some(item=>item.id===id))} : null;}).filter(Boolean);
  return <LearnerDashboard learner={learner.user} enrolled={enrolled} sessions={learner.user.demo ? demoTimetable(learner.enrolments) : []} />;
}
export default function PortalPage(){return <><Header /><main className="min-h-[60vh] bg-[#faf7f5] font-sans"><Suspense fallback={<p className="p-8 text-sm text-[#171717]">Loading your learning area…</p>}><Dashboard /></Suspense></main><Footer /></>;}
