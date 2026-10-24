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
        <section aria-labelledby="defence-heading" className="overflow-hidden bg-[#faf7f5]">
          <div className={`${container} grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:py-16`}>
            <div className="motion-safe:animate-hero-reveal">
              <Eyebrow>WAARR Defence Academy</Eyebrow>
              <h1 id="defence-heading" className="max-w-[620px] text-[clamp(2.75rem,4.6vw,4.5rem)] leading-[1.04] font-bold tracking-[-0.055em] text-[#232025]">
                Prepare to serve.<br /><span className="text-[#780c24]">Build your future.</span>
              </h1>
              <p className="mt-6 max-w-[490px] text-base leading-8 text-[#59454e]">
                Give your defence ambition a clear direction. Bring written preparation,
                SSB practice and physical readiness together with guidance from WAARR.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#programmes">Find your programme</Button>
                <Button href={enquiry("Defence Preparation", "aspirant")} secondary>Enquire now</Button>
              </div>
              <div className="mt-9 grid max-w-[500px] grid-cols-3 gap-3 border-t border-[#dfd2d7] pt-5">
                {[["01", "Written preparation"], ["02", "SSB readiness"], ["03", "Physical training"]].map(([number, label]) => (
                  <div key={number}><span className="font-mono text-[10px] text-[#99737f]">{number}</span><p className="mt-2 text-xs leading-5 font-semibold text-[#40323a]">{label}</p></div>
                ))}
              </div>
            </div>
            <div className="motion-safe:animate-hero-reveal-delayed">
              <div className="grid h-[340px] grid-cols-[1.5fr_1fr] grid-rows-2 gap-3 sm:h-[440px] sm:gap-4 lg:h-[480px]">
                <figure className="relative row-span-2 overflow-hidden rounded-2xl bg-[#ded5d0]">
                  <Image src="/images/nda/nda1.jpeg" alt="NDA cadets in white ceremonial uniforms on parade" fill preload sizes="(max-width: 1023px) 60vw, 32vw" className="object-cover object-[48%_center]" />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#23131d]/80 via-transparent to-transparent" />
                  <figcaption className="absolute right-5 bottom-5 left-5 text-white sm:bottom-7 sm:left-7">
                    <p className="text-[10px] font-semibold tracking-[0.16em] text-white/75 uppercase">The ambition</p>
                    <p className="mt-2 text-xl leading-tight font-semibold tracking-tight sm:text-3xl">A life of<br />purpose &amp; service.</p>
                  </figcaption>
                </figure>
                {[{ src: "/images/ima/ima1.jpeg", alt: "Cadets marching at the Indian Military Academy", label: "Discipline" }, { src: "/images/afa/afa1.jpeg", alt: "Air Force cadets on parade beneath a displayed aircraft", label: "Determination" }].map(photo => (
                  <figure key={photo.src} className="relative overflow-hidden rounded-2xl bg-[#ded5d0]">
                    <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 1023px) 35vw, 20vw" className="object-cover" />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                    <figcaption className="absolute bottom-4 left-4 text-xs font-semibold tracking-wide text-white sm:bottom-5 sm:left-5">{photo.label}</figcaption>
                  </figure>
                ))}
              </div>
              <p className="mt-3 text-right text-[10px] tracking-[0.12em] text-[#88717b] uppercase">Inspired by the academies. Driven by your ambition.</p>
            </div>
          </div>
          <nav aria-label="Defence page sections" className="border-y border-[#e9e1e4] bg-white">
            <div className={`${container} grid grid-cols-2 gap-x-5 gap-y-1 py-3 sm:flex sm:flex-wrap sm:gap-x-9 sm:py-4`}>
              {[["Programmes", "programmes"], ["Physical preparation", "physical-performance"], ["Our approach", "approach"], ["For institutions", "institutional-solutions"]].map(([label, id]) => (
                <Link key={id} href={`#${id}`} className="group inline-flex min-h-11 items-center justify-between gap-5 text-xs font-semibold text-[#59454e] hover:text-[#780c24] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#780c24] sm:text-sm">{label}<span aria-hidden="true" className="rotate-90 text-[#9b7885]"><Arrow /></span></Link>
              ))}
            </div>
          </nav>
        </section>

        <section aria-labelledby="programmes-heading" className="bg-white">
          <div className={`${container} py-16 sm:py-20 lg:py-24`}>
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div><Eyebrow id="programmes">Choose your pathway</Eyebrow><h2 id="programmes-heading" className={heading}>Your ambition.<br /><span className="text-[#780c24]">A plan to move forward.</span></h2></div>
              <p className="max-w-[430px] text-sm leading-7 text-[#70616a]">Start with your target entry. Explore preparation that connects subject knowledge, consistent practice and personal development.</p>
            </div>
            <div className="mt-9 grid gap-6 md:grid-cols-3">
              {defenceProgrammes.slice(0, 3).map((programme, index) => (
                <article key={programme.slug} className="group flex flex-col overflow-hidden rounded-2xl border border-[#e9e1e4] bg-white transition-shadow hover:shadow-[0_14px_40px_-24px_#780c2450]">
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#e9e1e4]">
                    <Image src={["/images/nda/nda2.jpeg", "/images/ima/ima2.jpeg", "/images/ina/ina1.jpeg"][index]} alt={["National Defence Academy campus and landscaped grounds", "Indian Military Academy building and clock tower", "Naval cadets marching in formation"][index]} fill sizes="(max-width: 767px) 100vw, 33vw" className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.03]" />
                    <span className="absolute top-4 left-4 rounded bg-white/95 px-3 py-1.5 text-[11px] font-bold tracking-wide text-[#780c24]">{programme.short}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[10px] font-semibold tracking-[0.14em] text-[#99737f] uppercase">{["Build your foundation", "Take the next step", "Develop your confidence"][index]}</p>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight text-[#302830]">{programme.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#70616a]">{programme.description}</p>
                    <ul className="mt-5 mb-6 space-y-2">{programme.focus.map(item => <li key={item} className="flex items-start gap-2 text-xs leading-5 text-[#59454e]"><span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-[#780c24]" />{item}</li>)}</ul>
                    <Link href={`/courses/${programme.slug}`} className="group mt-auto flex min-h-11 items-center justify-between gap-3 border-t border-[#e9e1e4] pt-4 text-sm font-semibold text-[#780c24] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#780c24]">Explore {programme.short}<Arrow /></Link>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-10 rounded-2xl border border-[#e9e1e4] bg-[#faf7f5] p-5 sm:p-8">
              <h3 className="text-lg font-semibold text-[#302830]">More ways to prepare</h3>
              <p className="mt-2 text-sm leading-6 text-[#70616a]">Explore other entry pathways and focused preparation support.</p>
              <div className="mt-5 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">{defenceProgrammes.slice(3).map(programme => (
                <Link key={programme.slug} href={`/courses/${programme.slug}`} className="group flex min-h-16 items-center justify-between gap-3 border-t border-[#e3d5db] py-4 text-sm font-semibold text-[#59454e] hover:text-[#780c24] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#780c24]">{programme.title}<Arrow /></Link>
              ))}</div>
            </div>
            <p className="mt-4 text-xs leading-6 text-[#70616a]">Confirm programme availability, delivery format and upcoming batches with our team.</p>
          </div>
        </section>

        <section aria-labelledby="physical-heading" className="bg-[#faf7f5]">
          <div className={`${container} grid gap-10 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:py-24`}>
            <div>
              <Eyebrow id="physical-performance">Beyond the classroom</Eyebrow>
              <h2 id="physical-heading" className={heading}>Train with purpose.<br /><span className="text-[#780c24]">Build your readiness.</span></h2>
              <p className="mt-6 max-w-[500px] text-sm leading-7 text-[#70616a]">Physical preparation is part of the journey. Develop strength, endurance and movement quality through training shaped around your starting point and individual needs.</p>
              <div className="mt-7"><Button href={enquiry("Defence Performance", "aspirant")}>Explore physical preparation</Button></div>
            </div>
            <div className="rounded-2xl border border-[#e3d5db] bg-white p-6 sm:p-8">
              <p className="text-[10px] font-semibold tracking-[0.16em] text-[#780c24] uppercase">A foundation for consistent progress</p>
              <ul className="mt-5 grid grid-cols-2 gap-x-5">{physical.map(area => <li key={area} className="flex items-center gap-2 border-t border-[#eee7e9] py-3.5 text-xs leading-5 font-medium text-[#59454e] sm:text-sm"><span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-[#b98094]" />{area}</li>)}</ul>
              <p className="mt-5 border-t border-[#eee7e9] pt-4 text-xs leading-6 text-[#88717b]">Training scope and specialist recovery support are confirmed before participation. Injury prevention focuses on risk reduction.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="institutional-heading" className="bg-[#291e24] text-white">
          <div className={`${container} grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24`}><div><Eyebrow id="institutional-solutions" dark>Defence performance systems</Eyebrow><h2 id="institutional-heading" className="text-3xl leading-[1.15] font-semibold tracking-[-0.035em] sm:text-4xl lg:text-[44px]">For institutions<br /><span className="text-[#e0a8b9]">and organisations.</span></h2><p className="mt-6 text-[15px] leading-7 text-[#d0c3ca]">WAARR offers a framework for organisations seeking to develop structured physical performance and training systems around operational requirements.</p><p className="mt-4 text-xs leading-6 text-[#c3aab6]">The capabilities shown here are available for discussion. Delivery scope, workforce availability and project arrangements are confirmed individually.</p><div className="mt-7"><Button href={enquiry("Defence Performance", "organisation")} light>Discuss institutional requirements</Button></div></div><ul className="grid gap-3 sm:grid-cols-2">{institutional.map(capability => <li key={capability} className="rounded-xl border border-white/10 bg-white/[0.035] p-5 text-sm leading-6 text-[#d0c3ca]">{capability}</li>)}</ul></div>
        </section>

        <section aria-labelledby="approach-heading" className="bg-white">
          <div className={`${container} py-16 sm:py-20 lg:py-24`}>
            <div><Eyebrow id="approach">Progress, one step at a time</Eyebrow></div>
            <h2 id="approach-heading" className={heading}>A clear plan.<br /><span className="text-[#780c24]">Consistent progress.</span></h2>
            <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">{process.map((step, index) => (
              <li key={step.name} className="border-t-2 border-[#dac7ce] pt-5">
                <span aria-hidden="true" className="font-mono text-xs text-[#99737f]">0{index + 1}</span>
                <h3 className="mt-4 text-lg font-semibold text-[#302830]">{step.name}</h3>
                <p className="mt-2 text-xs leading-6 text-[#70616a]">{step.detail}</p>
              </li>
            ))}</ol>
          </div>
        </section>

        <section aria-labelledby="defence-enquiry-heading" className="bg-[#faf7f5]">
          <div className={`${container} py-12 sm:py-16`}>
            <div className="grid gap-8 rounded-2xl bg-[#780c24] px-6 py-10 text-white sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:p-12">
              <div><Eyebrow dark>Your next chapter starts here</Eyebrow><h2 id="defence-enquiry-heading" className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">Ready to take the next step?</h2><p className="mt-4 max-w-[660px] text-sm leading-7 text-white/80">Tell us about your goals. We will help you explore the preparation pathway, programme scope and next available batch.</p></div>
              <div className="flex flex-col items-start gap-3"><Button href={enquiry("Defence Preparation", "aspirant")} light>Enquire about preparation</Button><Link href={enquiry("Defence Performance", "organisation")} className="group inline-flex min-h-11 items-center gap-3 text-xs font-semibold text-white/85 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Enquiring for an institution?<Arrow /></Link></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
