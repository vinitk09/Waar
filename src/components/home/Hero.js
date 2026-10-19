import Image from "next/image";
import Link from "next/link";
import CourseMarquee from "./CourseMarquee";

function Arrow() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-[#faf7f5] font-sans">
      <CourseMarquee />
      <div aria-hidden="true" className="pointer-events-none absolute -top-48 -left-48 size-[550px] rounded-full border border-[#780c24]/5" />
      <div className="mx-auto grid max-w-[1480px] items-center gap-12 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-12 lg:py-20">
        <div className="motion-safe:animate-hero-reveal">
          <p className="mb-6 text-[11px] font-semibold tracking-[0.18em] text-[#780c24] uppercase sm:text-xs">WAARR Defence Academy</p>
          <h1 id="hero-heading" className="max-w-[700px] text-[clamp(2.35rem,3.9vw,4.2rem)] leading-[1.08] font-bold tracking-[-0.045em] text-[#232025]">Your ambition.<br /><span className="text-[#780c24]">A life of service.</span><br />Prepare for it.</h1>
          <p className="mt-6 text-xs leading-6 font-semibold tracking-wide text-[#59454e] sm:text-sm">NDA | CDS | AFCAT | SSB | Physical Readiness</p>
          <div className="mt-6">
            <p className="text-[10px] font-semibold tracking-[0.16em] text-[#780c24] uppercase">Your defence preparation starts here</p>
            <p className="mt-2 max-w-[560px] text-sm leading-6 text-[#171717]">Build your knowledge for written examinations, prepare for the SSB interview and develop your physical readiness through WAARR’s structured preparation pathways.</p>
            <p className="mt-2 text-sm font-semibold text-[#40323a]">Clear goals. Focused preparation. Learning with purpose.</p>
            <ul aria-label="Defence preparation pathways" className="mt-4 flex flex-wrap gap-2">
              {["NDA", "CDS", "SSB Interview", "AFCAT", "ACC", "NCC Entry Guidance", "Communication & Soft Skills", "SSB Mock Assessments", "In-service Guidance"].map((programme) => (
                <li key={programme} className="rounded-full border border-[#e3d5db] bg-white px-3 py-1.5 text-xs font-medium text-[#59454e]">{programme}</li>
              ))}
            </ul>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/courses" className="group inline-flex min-h-12 items-center justify-center gap-5 rounded bg-[#780c24] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#5d091b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#780c24]">Explore Defence Courses<span className="transition-transform motion-safe:group-hover:translate-x-1"><Arrow /></span></Link>
            <Link href="#upcoming-batches" className="group inline-flex min-h-12 items-center justify-center gap-5 rounded border border-[#780c24] bg-white px-6 py-3.5 text-sm font-semibold text-[#780c24] transition-colors hover:bg-[#f4e8ed] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#780c24]">Upcoming Batches<span className="transition-transform motion-safe:group-hover:translate-x-1"><Arrow /></span></Link>
          </div>

        </div>
        <div className="relative min-w-0 motion-safe:animate-hero-reveal-delayed">
          <div aria-hidden="true" className="absolute -top-4 right-4 h-24 w-24 rounded-tr-[32px] border-t-2 border-r-2 border-[#780c24]/20" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-[#e9e2dc] shadow-[0_24px_70px_-30px_#38232d66] sm:aspect-[6/5]">
            <Image src="/images/nda/military.jpg" alt="Military training at the National Defence Academy" fill preload sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#23131d]/90 via-transparent to-transparent" />
            <div className="absolute right-5 bottom-6 left-5 text-white sm:right-7 sm:left-7">
              <p className="mb-2 text-[10px] font-semibold tracking-[0.18em] text-white/75 uppercase">Discipline. Teamwork. Readiness.</p>
              <p className="text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">Prepare with purpose.<br />Move forward with confidence.</p>
            </div>
            <a href="https://nda.nic.in/images/pillars_images/Military.jpg" target="_blank" rel="noreferrer" className="absolute top-4 right-4 rounded bg-black/60 px-3 py-2 text-[10px] tracking-wide text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-white">Photo: National Defence Academy ↗</a>
          </div>
        </div>
      </div>
    </section>
  );
}


