import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StudentResults from "@/components/results/StudentResults";
import { studentResults } from "@/data/student-results";

export const metadata = {
  title: "Student Results & Selections | WAARR Defence Academy",
  description: "Meet WAARR students and explore their published exam results and SSB recommendations.",
};

export default function ResultsPage() {
  return <><Header /><main className="bg-white font-sans">
    <section aria-labelledby="results-heading" className="border-b border-[#e9e1e4] bg-[#faf7f5]">
      <div className="mx-auto max-w-[1480px] px-6 pt-7 pb-12 sm:px-10 sm:pb-16 lg:px-12">
        <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-[#780c24]"><span aria-hidden="true">←</span> Back to home</Link>
        <div className="mt-6 flex flex-col justify-between gap-8 sm:mt-9 lg:flex-row lg:items-end">
          <div><p className="text-[11px] font-semibold tracking-[0.18em] text-[#780c24] uppercase">WAARR results & selections</p><h1 id="results-heading" className="mt-5 text-4xl leading-[1.1] font-bold tracking-[-0.04em] text-[#232025] sm:text-5xl lg:text-6xl">Their dedication.<br /><span className="text-[#780c24]">Their achievement.</span></h1><p className="mt-6 max-w-[620px] text-sm leading-7 text-[#59454e]">Celebrating our students and the milestones in their defence journeys. Explore published exam results and selection recommendations below.</p></div>
          <div className="w-fit rounded-2xl border border-[#e3d5db] bg-white px-7 py-5"><p className="text-4xl font-bold tracking-tight text-[#780c24]">{studentResults.length}</p><p className="mt-2 text-xs font-medium text-[#59454e]">Published student results</p></div>
        </div>
      </div>
    </section>
    <StudentResults results={studentResults} />
    <section aria-label="Start your preparation" className="mx-auto max-w-[1480px] px-6 pb-14 sm:px-10 lg:px-12"><div className="flex flex-col justify-between gap-6 rounded-2xl bg-[#780c24] p-7 text-white sm:p-10 md:flex-row md:items-center"><div><h2 className="text-2xl font-semibold tracking-tight">Your journey starts with preparation.</h2><p className="mt-3 text-sm leading-7 text-white/80">Explore our courses and take your next step towards a career in defence.</p></div><Link href="/courses" className="inline-flex min-h-12 w-fit shrink-0 items-center gap-4 rounded-lg bg-white px-5 text-sm font-semibold text-[#780c24]">Explore courses <span aria-hidden="true">→</span></Link></div></section>
  </main><Footer /></>;
}
