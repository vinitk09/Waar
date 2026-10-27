import Link from "next/link";
import { defenceProgrammes, defenceEnquiry } from "@/data/defence-programmes";
import { preparationGuides, upcomingBatches } from "@/data/home-defence";
import FacultySlider from "./FacultySlider";
import HomeEnquiry from "./HomeEnquiry";
import AcademyGallery from "./AcademyGallery";

const container = "mx-auto max-w-[1480px] px-6 sm:px-10 lg:px-12";
const spacing = "py-16 sm:py-20 lg:py-24";
const heading = "text-3xl leading-[1.15] font-semibold tracking-[-0.035em] text-[#232025] sm:text-4xl lg:text-[44px]";
const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#780c24]";

function Eyebrow({ children }) {
  return <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-[#780c24] uppercase"><span aria-hidden="true" className="h-0.5 w-6 bg-[#780c24]" />{children}</p>;
}

function Action({ href, children, secondary = false }) {
  return <Link href={href} className={`inline-flex min-h-12 items-center justify-center gap-4 rounded-lg border border-[#780c24] px-5 py-3 text-sm font-semibold transition-colors ${focus} ${secondary ? "bg-white text-[#780c24] hover:bg-[#f5e9ee]" : "bg-[#780c24] text-white hover:bg-[#5d091b]"}`}>{children}<span aria-hidden="true">→</span></Link>;
}

export default function DefenceHome() {
  return <>
    <section aria-label="Defence preparation focus" className="border-y border-[#e9e1e4] bg-white">
      <div data-reveal-group className={`${container} grid grid-cols-2 gap-5 py-7 md:grid-cols-4`}>
        {[["Written preparation", "NDA · CDS · AFCAT · ACC"], ["SSB readiness", "Psychology · Group tasks · Interview"], ["Physical preparation", "Strength · Endurance · Discipline"], ["Learning support", "Practice · Review · Progress"]].map(([title, text]) => <div key={title} className="border-l-2 border-[#780c24]/25 pl-4"><p className="text-sm font-semibold text-[#40323a]">{title}</p><p className="mt-2 text-xs leading-5 text-[#70616a]">{text}</p></div>)}
      </div>
    </section>

    <section id="upcoming-batches" aria-labelledby="batches-heading" className="bg-[#faf7f5]">
      <div className={`${container} batch-content py-8 lg:py-10`}>
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div><Eyebrow>Plan your next step</Eyebrow><h2 id="batches-heading" className="text-3xl leading-[1.15] font-semibold tracking-[-0.035em] text-[#232025] sm:text-4xl">Upcoming <span className="text-[#780c24]">defence batches.</span></h2><p className="mt-3 max-w-[640px] text-sm leading-6 text-[#70616a]">Find your preparation pathway and enquire about the next available batch.</p></div>
          <Link href="/contact?interest=Defence%20Preparation&source=upcoming-batches" className={`inline-flex min-h-11 shrink-0 items-center gap-3 text-sm font-semibold text-[#780c24] ${focus}`}>Ask about batch schedules <span aria-hidden="true">→</span></Link>
        </div>
        <div data-reveal-group className="batch-grid mt-6 grid gap-5 md:grid-cols-3">
          {upcomingBatches.map(batch => {
            const programme = defenceProgrammes.find(item => item.slug === batch.slug);
            return <article key={batch.slug} className="batch-card flex flex-col rounded-2xl border border-[#e9e1e4] bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-3"><span className="rounded bg-[#f5e9ee] px-3 py-1.5 text-[10px] font-semibold tracking-wide text-[#780c24] uppercase">Upcoming batch</span><span className="text-xs text-[#70616a]">{batch.label}</span></div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-[#302830]">{batch.title}</h3><p className="mt-3 flex-1 text-sm leading-6 text-[#70616a]">{batch.description}</p>
              <dl className="my-4 border-y border-[#eee7e9] py-3 text-sm"><div className="flex flex-wrap justify-between gap-x-4 gap-y-1"><dt className="text-[#70616a]">Start date</dt><dd className="font-medium text-[#40323a]">To be announced</dd></div><div className="mt-2 flex flex-wrap justify-between gap-x-4 gap-y-1"><dt className="text-[#70616a]">Timings & format</dt><dd className="font-medium text-[#40323a]">Confirm with our team</dd></div></dl>
              <Action href={defenceEnquiry(programme)}>Enquire about this batch</Action><Link href={`/courses/${batch.slug}`} className={`mt-1 inline-flex min-h-11 items-center justify-center text-xs font-semibold text-[#780c24] ${focus}`}>View course details</Link>
            </article>;
          })}
        </div>
        <p className="batch-note mt-3 text-xs leading-5 text-[#70616a]">Batch dates, fees, delivery mode and availability will be confirmed by the WAARR team before enrolment.</p>
      </div>
    </section>

    <section id="defence-courses" aria-labelledby="courses-heading" className="bg-white">
      <div className={`${container} ${spacing}`}>
        <Eyebrow>Our defence courses</Eyebrow><h2 id="courses-heading" className={heading}>A clear pathway.<br /><span className="text-[#780c24]">Preparation with purpose.</span></h2><p className="mt-5 max-w-[650px] text-sm leading-7 text-[#70616a]">From written examinations to SSB practice and guidance for serving personnel, explore the support that fits your ambition.</p>
        <div data-reveal-group className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {defenceProgrammes.map((programme, index) => <article key={programme.slug} className="group flex flex-col rounded-xl border border-[#e9e1e4] bg-[#fcfaf9] p-6 transition-colors hover:border-[#b98094]">
            <div className="mb-5 flex items-center justify-between"><span className="text-sm font-bold tracking-wide text-[#780c24]">{programme.short}</span><span aria-hidden="true" className="font-mono text-xs text-[#a9969f]">{String(index + 1).padStart(2, "0")}</span></div>
            <h3 className="text-xl font-semibold text-[#302830]">{programme.title}</h3><p className="mt-3 mb-5 flex-1 text-sm leading-7 text-[#70616a]">{programme.description}</p><Link href={`/courses/${programme.slug}`} className={`flex min-h-11 items-center justify-between gap-3 border-t border-[#e9e1e4] pt-4 text-sm font-semibold text-[#780c24] ${focus}`}>Explore course<span aria-hidden="true">→</span></Link>
          </article>)}
        </div>
      </div>
    </section>

    <section aria-labelledby="preparation-heading" className="bg-[#291e24] text-white">
      <div className={`${container} ${spacing} grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16`}>
        <div data-scroll-reveal><p className="mb-4 text-[11px] font-semibold tracking-[0.18em] text-[#e0a8b9] uppercase">More than exam preparation</p><h2 id="preparation-heading" className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">Build knowledge.<br />Develop character.<br /><span className="text-[#e0a8b9]">Prepare to lead.</span></h2><p className="mt-6 max-w-[450px] text-sm leading-7 text-[#d0c3ca]">A defence journey calls for consistent effort across academics, communication, teamwork and physical readiness. Bring these priorities into one preparation plan.</p><Link href="/defence" className="mt-7 inline-flex min-h-12 items-center gap-4 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#780c24] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Explore our approach <span aria-hidden="true">→</span></Link></div>
        <div data-reveal-group className="grid gap-4 sm:grid-cols-2">{[
          ["01", "Learn with structure", "Organise subject learning, revision and practice around your preparation priorities."],
          ["02", "Practise & review", "Use course practice and mock tests to understand mistakes and guide your next steps."],
          ["03", "Prepare for SSB", "Work on self-awareness, expression and teamwork through preparation activities."],
          ["04", "Build physical readiness", "Develop strength, endurance and training consistency around individual needs."],
        ].map(([number, title, detail]) => <article key={number} className="rounded-xl border border-white/10 bg-white/[0.035] p-6"><span className="font-mono text-xs text-[#e0a8b9]">{number}</span><h3 className="mt-5 text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-[#d0c3ca]">{detail}</p></article>)}</div>
      </div>
    </section>

    <AcademyGallery />

    <section id="preparation-guides" aria-labelledby="guides-heading" className="bg-white">
      <div className={`${container} ${spacing}`}>
        <Eyebrow>Preparation resources</Eyebrow><h2 id="guides-heading" className={heading}>Guides, Tips <span className="text-[#780c24]">& Strategies.</span></h2><p className="mt-5 max-w-[650px] text-sm leading-7 text-[#70616a]">Practical starting points for written exams, SSB preparation and a more consistent study routine.</p>
        <div data-reveal-group className="mt-10 grid items-start gap-6 md:grid-cols-3">{preparationGuides.map(guide => <article key={guide.slug} className="rounded-xl border border-[#e9e1e4] p-6 sm:p-8"><span className="inline-block rounded bg-[#f5e9ee] px-3 py-1.5 text-[10px] font-semibold tracking-wide text-[#780c24]">{guide.tag}</span><h3 className="mt-5 text-xl leading-snug font-semibold text-[#302830]">{guide.title}</h3><p className="mt-4 text-sm leading-7 text-[#70616a]">{guide.description}</p><details className="mt-6 border-t border-[#e9e1e4] pt-4"><summary className={`min-h-11 cursor-pointer py-3 text-sm font-semibold text-[#780c24] ${focus}`}>Read preparation tips</summary><ol className="mt-3 list-decimal space-y-3 pl-5 text-sm leading-7 text-[#70616a]">{guide.steps.map(step => <li key={step}>{step}</li>)}</ol><Link href={`/courses/${guide.slug}`} className={`mt-4 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-[#780c24] ${focus}`}>Explore {guide.tag.split(" ")[0]} preparation <span aria-hidden="true">→</span></Link></details></article>)}</div>
      </div>
    </section>

    <FacultySlider />

    <HomeEnquiry />

    <section id="founders-message" aria-labelledby="director-heading" className="bg-[#f5ecef]">
      <div className={`${container} ${spacing} grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20`}>
        <div data-scroll-reveal>
          <Eyebrow>Leadership at WAARR</Eyebrow>
          <h2 id="director-heading" className={heading}>Message From<br /><span className="text-[#780c24]">The Director</span></h2>
          <div aria-hidden="true" className="mt-7 h-1 w-16 bg-[#780c24]" />
        </div>
        <div data-scroll-reveal>
          <h3 className="text-xl font-semibold tracking-wide text-[#780c24]">DEAR ASPIRANTS</h3>
          <div className="mt-6 space-y-4 text-sm leading-8 text-[#59454e]">
            <p className="text-justify">WAARR has a clear mission: to help young aspirants grow through NDA preparation and sports. We aim to develop the knowledge, discipline, confidence and character they need to pursue their goals. NDA preparation goes beyond books and question papers. Sports, too, demand more than physical ability. Both journeys call for consistent practice, mental resilience, teamwork, communication and a willingness to improve. At WAARR, we support each aspirant with structured teaching, regular testing, individual mentoring, physical training, sports development and SSB-oriented personality development. We also keep parents informed about their progress. Whether your goal is to become an officer in the Indian Armed Forces, excel in sports or pursue both, WAARR will guide you with clarity, encouragement and accountability.</p>
            <p className="font-semibold text-[#40323a]">Your journey towards becoming your best starts today.</p>
          </div>
          <div className="mt-7 border-t border-[#dac7ce] pt-5">
            <p className="text-lg font-bold tracking-tight text-[#780c24]">Monika Sharma</p>
            <p className="mt-1 text-sm text-[#59454e]">CSCS-USA (Strength and Conditioning Coach)</p>
            <p className="mt-2 text-sm font-semibold text-[#780c24]">Founder &amp; Director, WAARR</p>
            <p className="mt-1 text-xs text-[#70616a]">Discipline. Purpose. Service.</p>
          </div>
        </div>
      </div>
    </section>
  </>;
}
