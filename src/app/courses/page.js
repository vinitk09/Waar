import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CourseCatalogue from "@/components/courses/CourseCatalogue";

export const metadata = { title: "Explore Courses | WAARR Academy", description: "Browse WAARR defence preparation and professional education courses. Explore course focus, learning journeys and upcoming batch enquiries." };

export default function CoursesPage() {
  return <><Header /><main className="bg-[#faf7f5] font-sans"><div className="mx-auto max-w-[1480px] px-6 pt-8 pb-16 sm:px-10 lg:px-12"><div className="grid gap-6 border-b border-[#e9e1e4] pb-8 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="mb-4 text-[11px] font-semibold tracking-[0.18em] text-[#780c24] uppercase">WAARR Academy · Course catalogue</p><h1 className="text-4xl leading-[1.1] font-bold tracking-[-0.04em] text-[#232025] sm:text-5xl">Your next step.<br /><span className="text-[#780c24]">Start with the right course.</span></h1><p className="mt-5 max-w-[690px] text-sm leading-7 text-[#171717]">Explore preparation pathways, review the course focus and understand the learning journey before discussing your enrolment.</p></div><Link href="/portal/login" className="inline-flex min-h-12 w-fit items-center gap-4 rounded-lg border border-[#780c24] bg-white px-5 py-3 text-sm font-semibold text-[#780c24]">Participant learning area<span aria-hidden="true">→</span></Link></div><section aria-labelledby="catalogue-heading" className="pt-8"><h2 id="catalogue-heading" className="sr-only">Browse all courses</h2><CourseCatalogue /></section></div></main><Footer /></>;
}
