import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CourseTestSeriesInfo from "@/components/courses/CourseTestSeriesInfo";
import CourseAcademics from "@/components/courses/CourseAcademics";
import { currentLearner } from "@/lib/lms";
import { defenceProgrammes, defenceEnquiry } from "@/data/defence-programmes";

export function generateStaticParams() {
  return defenceProgrammes.map(programme => ({ slug: programme.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const programme = defenceProgrammes.find(item => item.slug === slug);
  return programme ? { title: `${programme.title} | WAARR Defence`, description: programme.description } : { title: "Programme not found | WAARR" };
}

async function ProgrammeContent({ params }) {
  const { slug } = await params;
  const programme = defenceProgrammes.find(item => item.slug === slug);
  if (!programme) notFound();
  const learner = await currentLearner();
  const unlocked = learner?.enrolments.some(item => item.courseId === slug) ?? false;

  return (
    <>
      <main className="bg-[#faf7f5] font-sans">
        <div className="mx-auto max-w-[1200px] px-6 py-12 sm:px-10 sm:py-16 lg:py-20">
          <Link href="/defence#programmes" className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-[#780c24] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#780c24]"><span aria-hidden="true">←</span>All Defence Programmes</Link>
          <p className="mt-8 mb-4 text-[11px] font-semibold tracking-[0.18em] text-[#780c24] uppercase">WAARR Defence · Programme overview</p>
          <h1 className="max-w-[850px] text-4xl leading-[1.1] font-semibold tracking-[-0.04em] text-[#232025] sm:text-5xl">{programme.title}</h1>
          <p className="mt-6 max-w-[780px] text-base leading-8 text-[#171717]">{programme.description}</p>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div><div className="rounded-2xl border border-[#e9e1e4] bg-white p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-[#302830]">Who this is for</h2>
              <p className="mt-3 text-sm leading-7 text-[#171717]">{programme.audience}</p>
              <h2 className="mt-8 text-xl font-semibold text-[#302830]">Preparation focus</h2>
              <ul className="mt-4 space-y-3">{programme.focus.map(item => <li key={item} className="flex gap-3 text-sm leading-6 text-[#171717]"><span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-[#780c24]" />{item}</li>)}</ul>
              {(slug === "ssb" || slug === "ssb-mock-assessments") && <p className="mt-6 border-t border-[#eee5e8] pt-5 text-xs leading-6 text-[#171717]">Coaching simulations are not official selection assessments. Online GTO orientation is distinct from actual ground practice; confirm the format included in your programme.</p>}
            </div><CourseAcademics course={programme} enquiryHref={defenceEnquiry(programme)} /><CourseTestSeriesInfo course={programme} unlocked={unlocked} /></div>

            <aside aria-labelledby="programme-next-step" className="rounded-2xl border border-[#e3d5db] bg-white p-6 sm:p-8">
              <p className="mb-4 text-xs font-semibold text-[#780c24]">{unlocked ? "Course unlocked" : "Course locked · Details preview"}</p>
              <h2 id="programme-next-step" className="text-xl font-semibold text-[#302830]">{unlocked ? "Continue your course" : "Unlock this course"}</h2>
              <p className="mt-3 text-sm leading-7 text-[#171717]">Contact the team to confirm current availability and the preparation support relevant to you.</p>
              <ul className="mt-5 space-y-3 text-xs leading-6 text-[#171717]">
                <li>Delivery mode, duration and upcoming batch</li>
                <li>Session timings in IST and mentor details</li>
                <li>Included materials, access period and programme policies</li>
                <li>Applicable entry-route requirements</li>
              </ul>
              <Link href={unlocked ? `/portal/learn/${slug}` : `/courses/${slug}/enrol`} className="mt-6 inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-[#780c24] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5d091b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#780c24]">{unlocked ? "Continue learning" : "Enrol and unlock course"}<span aria-hidden="true">→</span></Link>
              <p className="mt-4 text-xs leading-6 text-[#171717]">{unlocked ? "Your course materials and tests are available in your learning area." : "Fill in the enrolment form and complete payment to unlock lessons, resources and tests."}</p>
              <Link href={defenceEnquiry(programme)} className="mt-3 inline-flex min-h-11 items-center text-xs font-semibold text-[#780c24]">Ask about this programme</Link>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}


export default function ProgrammePage(props) {
  return (
    <>
      <Header />
      <Suspense fallback={<main aria-busy="true" className="min-h-[60vh] bg-[#faf7f5] px-6 py-12 font-sans"><div className="mx-auto max-w-[1200px]"><p role="status" className="text-sm text-[#171717]">Loading programme details?</p><div aria-hidden="true" className="mt-6 h-12 max-w-[600px] rounded-lg bg-[#e9e1e4]" /><div aria-hidden="true" className="mt-6 h-48 rounded-xl bg-white" /></div></main>}>
        <ProgrammeContent {...props} />
      </Suspense>
      <Footer />
    </>
  );
}
