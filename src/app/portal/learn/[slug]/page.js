import { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CoursePlayer from "@/components/courses/CoursePlayer";
import { courses } from "@/data/courses";
import { currentLearner, learningContent, demoTimetable } from "@/lib/lms";

export const metadata={title:"Course Learning | WAARR",robots:{index:false,follow:false}};
export function generateStaticParams(){return courses.map(course=>({slug:course.slug}));}
async function Learning({params,searchParams}){
  const learner=await currentLearner();if(!learner){const {slug}=await params;redirect(`/portal/login?next=${encodeURIComponent(`/portal/learn/${slug}`)}`);}
  const {slug}=await params;
  const enrolment=learner.enrolments.find(item=>item.courseId===slug);
  if(!enrolment)return <div className="mx-auto max-w-[800px] px-6 py-16"><h1 className="text-3xl font-semibold text-[#302830]">Course locked</h1><p className="mt-5 text-sm leading-7 text-[#171717]">Complete the course enrolment form and payment to unlock lessons, resources and tests.</p><Link href={`/courses/${slug}/enrol`} className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-[#780c24]">Enrol and unlock course →</Link></div>;
  const content=learningContent(slug);const query=await searchParams;
  return <CoursePlayer content={content} initialCompleted={(learner.progress[slug]??[]).filter(id=>content.lessons.some(item=>item.id===id))} initialLesson={typeof query.lesson==="string"?query.lesson:undefined} sessions={learner.user.demo?demoTimetable([enrolment]):[]} demo={learner.user.demo} />;
}
export default function LearningPage(props){return <><Header /><main className="min-h-[60vh] bg-[#faf7f5] font-sans"><Suspense fallback={<p className="p-8 text-sm text-[#171717]">Loading course…</p>}><Learning {...props}/></Suspense></main><Footer /></>;}
