import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { defenceProgrammes } from "@/data/defence-programmes";

export const metadata = {
  title: "Defence Performance & Preparation | WAARR",
  description: "Explore WAARR NDA, CDS and SSB preparation, wider defence programme guidance, physical performance and institutional solutions.",
};

const container = "mx-auto max-w-[1480px] px-6 sm:px-10 lg:px-12";
const heading = "text-3xl leading-[1.15] font-semibold tracking-[-0.035em] text-[#232025] sm:text-4xl lg:text-[44px]";
const physical = ["Strength", "Power", "Speed", "Agility", "Endurance", "Mobility", "Work Capacity", "Load-Carrying Capacity", "Injury Risk Reduction", "Recovery", "Physical Testing"];
const institutional = ["Performance Centre Development", "Training Facility Design", "Physical Assessment", "Strength & Conditioning", "Instructor / Coach Education", "Performance Monitoring", "Recovery Systems", "Specialised Workforce Deployment"];
const process = [
  { name: "Assess", detail: "Understand your starting point." },
  { name: "Prepare", detail: "Define preparation priorities." },
  { name: "Train", detail: "Build knowledge and physical capacity." },
  { name: "Simulate", detail: "Practise through coaching activities." },
  { name: "Review", detail: "Reflect on preparation progress." },
  { name: "Improve", detail: "Refine the next steps." },
];
const enquiry = (interest, audience) => `/contact?interest=${encodeURIComponent(interest)}&audience=${audience}&source=defence`;

function Arrow() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 transition-transform motion-safe:group-hover:translate-x-1"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Eyebrow({ children, dark = false, id }) {
  return <p id={id} className={`${id ? "section-anchor " : ""}mb-5 text-[11px] font-semibold tracking-[0.18em] uppercase ${dark ? "text-[#e0a8b9]" : "text-[#780c24]"}`}>{children}</p>;
}

function Button({ href, children, secondary = false, light = false }) {
  return <Link href={href} className={`group inline-flex min-h-12 w-fit items-center justify-center gap-4 rounded-lg border px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${light ? "border-white bg-white text-[#780c24] hover:bg-[#f5e9ee] focus-visible:outline-white" : secondary ? "border-[#780c24] bg-white text-[#780c24] hover:bg-[#f5e9ee] focus-visible:outline-[#780c24]" : "border-[#780c24] bg-[#780c24] text-white hover:bg-[#5d091b] focus-visible:outline-[#780c24]"}`}>{children}<Arrow /></Link>;
}

export default function DefencePage() {
  return (
    <>
      <Header />
      <main className="font-sans">
        <section aria-labelledby="defence-heading" className="bg-[#faf7f5]">
          <div className={`${container} grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-20`}>
            <div className="motion-safe:animate-hero-reveal"><Eyebrow>WAARR Defence</Eyebrow><h1 id="defence-heading" className="text-[clamp(2.5rem,4.3vw,4.4rem)] leading-[1.06] font-bold tracking-[-0.045em] text-[#232025]">Defence performance<br /><span className="text-[#780c24]">& preparation.</span></h1><p className="mt-6 text-lg leading-7 font-medium text-[#59454e]">Prepare with purpose. Perform under pressure.</p><p className="mt-5 max-w-[560px] text-[15px] leading-7 text-[#171717]">WAARR delivers structured performance and preparation solutions for defence aspirants, personnel and institutions.</p><div className="mt-6 flex flex-wrap gap-2">{defenceProgrammes.map(programme => <Link key={programme.slug} href={`/courses/${programme.slug}`} className="rounded-full border border-[#e3d5db] bg-white px-3 py-1.5 text-xs font-semibold text-[#780c24] transition-colors hover:border-[#780c24] hover:bg-[#f5e9ee] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#780c24]">{programme.title}</Link>)}</div><div className="mt-8 flex flex-wrap gap-3"><Button href="#programmes">Explore programmes</Button><Button href="#institutional-solutions" secondary>Institutional solutions</Button></div></div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-[#e9e2dc] shadow-[0_24px_70px_-30px_#38232d66] motion-safe:animate-hero-reveal-delayed lg:aspect-[6/5]"><Image src="/images/army-preparation-hero-v3.png" alt="Illustrative scene of defence aspirants building teamwork and physical readiness on an outdoor training course" fill preload sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" /><div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#23131d]/85 via-transparent to-transparent" /><span className="absolute top-4 right-4 rounded bg-black/50 px-2 py-1 text-[9px] tracking-wide text-white">Illustrative composition</span><div className="absolute right-6 bottom-6 left-6 text-white sm:right-8 sm:left-8"><p className="text-[10px] font-semibold tracking-[0.16em] text-white/75 uppercase">Discipline. Preparation. Readiness.</p><p className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">A clear path to preparation.</p></div></div>
          </div>
          <nav aria-label="Defence page sections" className="border-y border-[#e9e1e4] bg-white/70"><div className={`${container} flex flex-wrap gap-x-7 gap-y-3 py-5 text-xs font-semibold text-[#59454e] sm:text-sm`}>{[["Programmes", "programmes"], ["Physical performance", "physical-performance"], ["Institutional solutions", "institutional-solutions"], ["Our approach", "approach"]].map(([label, id]) => <Link key={id} href={`#${id}`} className="rounded hover:text-[#780c24] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#780c24]">{label}</Link>)}</div></nav>
        </section>

        <section aria-labelledby="programmes-heading" className="bg-white">
          <div className={`${container} py-16 sm:py-20 lg:py-24`}>
            <Eyebrow id="programmes">Defence aspirant programmes</Eyebrow><h2 id="programmes-heading" className={heading}>Your ambition.<br /><span className="text-[#780c24]">Structured preparation.</span></h2><p className="mt-5 max-w-[640px] text-[15px] leading-7 text-[#171717]">Preparation designed around the demands of defence selection. Explore the programme overview before discussing your next step.</p>
            <div className="mt-10 grid gap-5 md:grid-cols-3">{defenceProgrammes.map((programme, index) => <article key={programme.slug} className="flex flex-col overflow-hidden rounded-2xl border border-[#e9e1e4] bg-[#fcfaf9] p-6 sm:p-8"><div className="mb-7 flex items-center justify-between"><span className="text-2xl font-bold tracking-tight text-[#780c24]">{programme.short}</span><span aria-hidden="true" className="text-xs tracking-widest text-[#a9969f]">0{index + 1}</span></div><h3 className="text-xl font-semibold tracking-[-0.025em] text-[#302830]">{programme.title}</h3><p className="mt-4 mb-7 text-sm leading-7 text-[#171717]">{programme.description}</p><Link href={`/courses/${programme.slug}`} className="group mt-auto flex min-h-11 items-center justify-between gap-3 border-t border-[#e3d5db] pt-5 text-sm font-semibold text-[#780c24] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#780c24]">Explore {programme.short}<Arrow /></Link></article>)}</div>
            <p className="mt-5 text-xs leading-6 text-[#171717]">Programme availability, supported entry schemes, delivery mode and batch details are confirmed by the team before booking or enrolment.</p>
          </div>
        </section>

        <section aria-labelledby="physical-heading" className="bg-[#faf7f5]">
          <div className={`${container} grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24`}><div><Eyebrow id="physical-performance">Physical performance</Eyebrow><h2 id="physical-heading" className={heading}>Build the physical capacity<br /><span className="text-[#780c24]">to meet the demand.</span></h2><p className="mt-6 text-[15px] leading-7 text-[#171717]">Structured physical preparation can develop the capacity needed for demanding training environments, with programmes shaped around assessment and individual needs.</p><div className="mt-7"><Button href={enquiry("Defence Performance", "aspirant")}>Discuss physical preparation</Button></div></div><div><ul className="flex flex-wrap gap-3">{physical.map(area => <li key={area} className="rounded-full border border-[#e3d5db] bg-white px-4 py-2.5 text-sm font-medium text-[#59454e]">{area}</li>)}</ul><p className="mt-6 text-xs leading-6 text-[#171717]">Injury prevention focuses on risk reduction. The programme scope and any specialist recovery support are confirmed before participation.</p></div></div>
        </section>

        <section aria-labelledby="institutional-heading" className="bg-[#291e24] text-white">
          <div className={`${container} grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24`}><div><Eyebrow id="institutional-solutions" dark>Defence performance systems</Eyebrow><h2 id="institutional-heading" className="text-3xl leading-[1.15] font-semibold tracking-[-0.035em] sm:text-4xl lg:text-[44px]">For institutions<br /><span className="text-[#e0a8b9]">and organisations.</span></h2><p className="mt-6 text-[15px] leading-7 text-[#d0c3ca]">WAARR offers a framework for organisations seeking to develop structured physical performance and training systems around operational requirements.</p><p className="mt-4 text-xs leading-6 text-[#c3aab6]">The capabilities shown here are available for discussion. Delivery scope, workforce availability and project arrangements are confirmed individually.</p><div className="mt-7"><Button href={enquiry("Defence Performance", "organisation")} light>Discuss institutional requirements</Button></div></div><ul className="grid gap-3 sm:grid-cols-2">{institutional.map(capability => <li key={capability} className="rounded-xl border border-white/10 bg-white/[0.035] p-5 text-sm leading-6 text-[#d0c3ca]">{capability}</li>)}</ul></div>
        </section>

        <section aria-labelledby="range-heading" className="bg-white"><div className={`${container} py-16 sm:py-20 lg:py-24`}><Eyebrow>From aspirant to institution</Eyebrow><h2 id="range-heading" className={heading}>Different needs.<br /><span className="text-[#780c24]">One connected approach.</span></h2><ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[{ title: "Aspirants", detail: "NDA, CDS and SSB preparation." }, { title: "Performance", detail: "Strength, endurance, speed and mobility." }, { title: "Assessment", detail: "Testing, profiling and monitoring." }, { title: "Institutions", detail: "Training systems, infrastructure, workforce and performance programmes." }].map((item, index) => <li key={item.title} className="rounded-xl border border-[#e9e1e4] bg-[#fcfaf9] p-6"><span aria-hidden="true" className="text-xs tracking-widest text-[#a07c8a]">0{index + 1}</span><h3 className="mt-4 text-lg font-semibold text-[#302830]">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[#171717]">{item.detail}</p></li>)}</ul><p className="mt-5 text-xs leading-6 text-[#171717]">These areas describe the range of preparation and performance support, rather than a required career sequence.</p></div></section>

        <section aria-labelledby="approach-heading" className="bg-[#faf7f5]"><div className={`${container} py-16 sm:py-20 lg:py-24`}><Eyebrow id="approach">A systematic approach</Eyebrow><h2 id="approach-heading" className={heading}>Prepare. Practise.<br /><span className="text-[#780c24]">Review and improve.</span></h2><ol className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{process.map((step, index) => <li key={step.name} className="flex gap-4 rounded-xl border border-[#e9e1e4] bg-white p-5"><span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#f5e9ee] text-xs font-semibold text-[#780c24]">0{index + 1}</span><div><h3 className="text-sm font-semibold text-[#302830]">{step.name}</h3><p className="mt-2 text-xs leading-6 text-[#171717]">{step.detail}</p></div></li>)}</ol></div></section>

        <section aria-labelledby="defence-enquiry-heading" className="bg-white"><div className={`${container} py-16 sm:py-20`}><div className="rounded-[24px] bg-[#780c24] px-6 py-12 text-white sm:px-10 lg:px-12"><Eyebrow dark>Your next step</Eyebrow><h2 id="defence-enquiry-heading" className="max-w-[800px] text-3xl leading-[1.15] font-semibold tracking-[-0.035em] sm:text-4xl lg:text-[44px]">Build your defence<br />performance programme.</h2><p className="mt-5 max-w-[680px] text-[15px] leading-7 text-white/80">Whether you are an aspirant seeking structured preparation or an organisation looking to develop a performance system, WAARR can build a solution around your requirements.</p><div className="mt-8 flex flex-wrap gap-3"><Button href={enquiry("Defence", "aspirant")} light>Talk to our team — aspirants</Button><Link href={enquiry("Defence", "organisation")} className="group inline-flex min-h-12 items-center gap-4 rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Institutional enquiry<Arrow /></Link></div></div></div></section>
      </main>
      <Footer />
    </>
  );
}
