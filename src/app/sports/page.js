import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Sports Performance Ecosystems | WAARR",
  description: "Explore WAARR sports infrastructure, athlete assessment, strength and conditioning, managed high-performance centres and sport-specific performance solutions.",
};

const enquiry = (interest) => `/contact?interest=${encodeURIComponent(interest)}&source=sports`;
const infrastructure = [
  { title: "Training environments", items: ["High-Performance Centres", "Strength & Conditioning Facilities", "Olympic Weightlifting Setups", "Sport-Specific Training Areas"], icon: "M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M15 9h.01" },
  { title: "Climbing & school sport", items: ["Sports Climbing Infrastructure", "Bouldering Walls", "School Sports Infrastructure"], icon: "m4 21 7-18 9 18H4ZM8 11l4 3 3-5M11 3l2 5" },
  { title: "Assessment & recovery spaces", items: ["Performance Laboratories", "Recovery Centres"], icon: "M3 12h4l3-8 4 16 3-8h4" },
];
const assessments = ["Strength assessment", "Power assessment", "Jump testing", "Sprint testing", "Reactive strength", "Force-time analysis", "Biomechanics", "Movement assessment", "Athlete profiling", "Performance monitoring"];
const trainingAreas = ["Strength", "Power", "Speed", "Reactive Strength", "Mobility", "Energy Systems", "Injury Risk Reduction", "Return to Performance", "Youth Athletic Development"];
const workforce = ["Strength & Conditioning Coaches", "Performance Scientists", "Biomechanists", "Performance Analysts", "Physiotherapists", "Recovery Specialists", "Nutrition Support", "Centre Management"];
const sports = ["Climbing", "Golf", "Olympic Sports", "Team Sports", "Endurance Sports", "Youth Sports"];
const framework = ["Assess", "Analyse", "Programme", "Monitor", "Retest"];
const container = "mx-auto max-w-[1480px] px-6 sm:px-10 lg:px-12";
const heading = "text-3xl leading-[1.15] font-semibold tracking-[-0.035em] text-[#232025] sm:text-4xl lg:text-[44px]";

function Arrow() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 transition-transform motion-safe:group-hover:translate-x-1"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Eyebrow({ children, dark = false, id }) {
  return <p id={id} className={`${id ? "section-anchor " : ""}mb-5 text-[11px] font-semibold tracking-[0.18em] uppercase ${dark ? "text-[#e0a8b9]" : "text-[#780c24]"}`}>{children}</p>;
}

function Action({ href, children, secondary = false, light = false }) {
  return <Link href={href} className={`group inline-flex min-h-12 w-fit items-center justify-center gap-4 rounded-lg border px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${light ? "border-white bg-white text-[#780c24] hover:bg-[#f5e9ee] focus-visible:outline-white" : secondary ? "border-[#780c24] bg-white text-[#780c24] hover:bg-[#f5e9ee] focus-visible:outline-[#780c24]" : "border-[#780c24] bg-[#780c24] text-white hover:bg-[#5d091b] focus-visible:outline-[#780c24]"}`}>{children}<Arrow /></Link>;
}

export default function SportsPage() {
  return (
    <>
      <Header />
      <main className="font-sans">
        <section aria-labelledby="sports-heading" className="overflow-hidden bg-[#faf7f5]">
          <div className={`${container} grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-20`}>
            <div className="motion-safe:animate-hero-reveal">
              <Eyebrow>WAARR Sports</Eyebrow>
              <h1 id="sports-heading" className="max-w-[660px] text-[clamp(2.5rem,4.3vw,4.4rem)] leading-[1.06] font-bold tracking-[-0.045em] text-[#232025]">Sports performance<br /><span className="text-[#780c24]">ecosystems.</span></h1>
              <p className="mt-6 max-w-[560px] text-lg leading-7 font-medium text-[#59454e]">Build better environments. Develop better athletes. Measure performance.</p>
              <p className="mt-5 max-w-[570px] text-[15px] leading-7 text-[#171717]">WAARR designs and delivers integrated sports performance solutions combining infrastructure, performance science, specialised workforce and athlete development.</p>
              <div className="mt-8 flex flex-wrap gap-3"><Action href={enquiry("Sports Infrastructure")}>Discuss your project</Action><Action href="#athlete-performance" secondary>Explore athlete performance</Action></div>
              <p className="mt-5 text-xs leading-5 text-[#171717]">For institutions, academies, clubs and athletes.</p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-[#e9e2dc] shadow-[0_24px_70px_-30px_#38232d66] motion-safe:animate-hero-reveal-delayed lg:aspect-[6/5]">
              <Image src="/images/sports-gym.png" alt="Illustrative gym scene of an athlete performing a dumbbell lunge while a coach reviews technique" fill preload sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#23131d]/85 via-transparent to-transparent" />
              <span className="absolute top-4 right-4 rounded bg-black/50 px-2 py-1 text-[9px] tracking-wide text-white">Illustrative composition</span>
              <div className="absolute right-6 bottom-6 left-6 text-white sm:right-8 sm:bottom-8 sm:left-8"><p className="text-[10px] font-semibold tracking-[0.16em] text-white/75 uppercase">Environment. Expertise. Progress.</p><p className="mt-2 text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">Built around the athlete.</p></div>
            </div>
          </div>
          <nav aria-label="Sports page sections" className="border-y border-[#e9e1e4] bg-white/70">
            <div className={`${container} flex flex-wrap gap-x-7 gap-y-3 py-5 text-xs font-semibold text-[#59454e] sm:text-sm`}>
              {[["Infrastructure", "infrastructure"], ["Athlete performance", "athlete-performance"], ["Training", "strength-conditioning"], ["Managed centres", "managed-centres"], ["Sport-specific performance", "sport-specific"]].map(([label, id]) => <Link key={id} href={`#${id}`} className="rounded transition-colors hover:text-[#780c24] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#780c24]">{label}</Link>)}
            </div>
          </nav>
        </section>

        <section aria-labelledby="infrastructure-heading" className="bg-white">
          <div className={`${container} py-16 sm:py-20 lg:py-24`}>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div><Eyebrow id="infrastructure">Sports infrastructure</Eyebrow><h2 id="infrastructure-heading" className={heading}>From empty space<br /><span className="text-[#780c24]">to performance environment.</span></h2></div><Action href={enquiry("Sports Infrastructure")} secondary>Discuss your project</Action></div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {infrastructure.map((group, index) => <article key={group.title} className="rounded-2xl border border-[#e9e1e4] bg-[#fcfaf9] p-6 sm:p-8"><div className="mb-7 flex items-center justify-between"><span className="grid size-12 place-items-center rounded-xl bg-[#f3e6eb] text-[#780c24]"><svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={group.icon} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span><span aria-hidden="true" className="text-xs tracking-widest text-[#a9969f]">0{index + 1}</span></div><h3 className="text-xl font-semibold tracking-[-0.025em] text-[#302830]">{group.title}</h3><ul className="mt-5 space-y-3">{group.items.map(item => <li key={item} className="flex gap-3 text-sm leading-6 text-[#171717]"><span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-[#780c24]" />{item}</li>)}</ul></article>)}
            </div>
            <p className="mt-6 text-xs leading-6 text-[#171717]">Project scope, facilities and delivery arrangements are agreed around your requirements.</p>
          </div>
        </section>

        <section aria-labelledby="athlete-heading" className="bg-[#faf7f5]">
          <div className={`${container} grid gap-10 py-16 sm:py-20 lg:grid-cols-[0.95fr_1.1fr] lg:items-center lg:gap-16 lg:py-24`}>
            <div><Eyebrow id="athlete-performance">Athlete performance</Eyebrow><h2 id="athlete-heading" className={heading}>Measure. Train.<br /><span className="text-[#780c24]">Adapt. Perform.</span></h2><p className="mt-6 text-[15px] leading-7 text-[#171717]">Our performance systems can include strength, power and movement assessment, athlete profiling and ongoing performance monitoring.</p><p className="mt-5 border-l-2 border-[#780c24] pl-5 text-lg leading-7 font-medium text-[#40323a]">We don’t test simply to generate numbers. We use assessment to guide training decisions.</p><div className="mt-7"><Action href={enquiry("Sports Assessment")}>Enquire about an assessment</Action></div></div>
            <div className="rounded-2xl border border-[#e3d5db] bg-white p-6 sm:p-8"><h3 className="mb-6 text-xs font-semibold tracking-[0.14em] text-[#780c24] uppercase">Understand the athlete</h3><ul className="grid gap-3 sm:grid-cols-2">{assessments.map(item => <li key={item} className="flex items-center gap-3 rounded-lg bg-[#fcfaf9] p-3 text-sm leading-5 text-[#59454e]"><span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-[#b98094]" />{item}</li>)}</ul><p className="mt-6 border-t border-[#eee5e8] pt-5 text-xs leading-6 text-[#171717]">The assessment scope and any reports or training recommendations are confirmed before the service begins.</p></div>
          </div>
        </section>

        <section aria-labelledby="training-heading" className="bg-white">
          <div className={`${container} py-16 sm:py-20 lg:py-24`}>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-16"><div><Eyebrow id="strength-conditioning">Strength & conditioning</Eyebrow><h2 id="training-heading" className={heading}>Preparation with purpose.<br /><span className="text-[#780c24]">Training around your sport.</span></h2></div><p className="max-w-[550px] text-[15px] leading-7 text-[#171717] lg:self-end">Sport-specific physical preparation designed around the athlete, training age, competition demands and performance objectives.</p></div>
            <ul className="mt-9 flex flex-wrap gap-3">{trainingAreas.map(area => <li key={area} className="rounded-full border border-[#e3d5db] bg-[#fcfaf9] px-4 py-2.5 text-sm font-medium text-[#59454e]">{area}</li>)}</ul>
            <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-[640px] text-xs leading-6 text-[#171717]">Injury prevention focuses on reducing risk. Return-to-performance support depends on the appropriate qualified practitioners and agreed service scope.</p><Action href={enquiry("Athlete Performance")} secondary>Explore coaching options</Action></div>
          </div>
        </section>

        <section aria-labelledby="managed-heading" className="bg-[#291e24] text-white">
          <div className={`${container} grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16 lg:py-24`}>
            <div><Eyebrow id="managed-centres" dark>Managed high-performance centres</Eyebrow><h2 id="managed-heading" className="text-3xl leading-[1.15] font-semibold tracking-[-0.035em] sm:text-4xl lg:text-[44px]">We don’t just build the facility.<br /><span className="text-[#e0a8b9]">We help operate the ecosystem.</span></h2><p className="mt-6 text-[15px] leading-7 text-[#d0c3ca]">Institutions can partner with WAARR for the design, staffing, implementation and ongoing management of performance environments.</p><div className="mt-7"><Action href={enquiry("High-Performance Centre")} light>Build / operate your HPC</Action></div><Link href="/solutions/workforce" className="mt-5 inline-flex min-h-10 items-center gap-3 text-sm font-semibold text-[#e0a8b9] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Explore workforce solutions<Arrow /></Link></div>
            <div><h3 className="mb-5 text-xs font-semibold tracking-[0.14em] text-[#e0a8b9] uppercase">Multidisciplinary workforce solutions</h3><ul className="grid gap-3 sm:grid-cols-2">{workforce.map(role => <li key={role} className="rounded-xl border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-[#d0c3ca]">{role}</li>)}</ul><p className="mt-5 text-xs leading-6 text-[#c3aab6]">Team composition and specialist availability are confirmed for each project.</p></div>
          </div>
        </section>

        <section aria-labelledby="sports-intelligence-heading" className="bg-white">
          <div className={`${container} py-16 sm:py-20 lg:py-24`}>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div><Eyebrow>Performance intelligence</Eyebrow><h2 id="sports-intelligence-heading" className={heading}>Turning performance data<br /><span className="text-[#780c24]">into actionable decisions.</span></h2></div><Link href="/solutions/performance-intelligence" className="group inline-flex min-h-12 w-fit items-center gap-3 text-sm font-semibold text-[#780c24] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#780c24]">Explore the framework<Arrow /></Link></div>
            <ol className="mt-9 grid gap-3 sm:grid-cols-5">{framework.map((step, index) => <li key={step} className="flex items-center justify-between gap-3 rounded-xl border border-[#e9e1e4] bg-[#fcfaf9] p-4"><div><span className="text-[10px] font-semibold tracking-widest text-[#a07c8a]">0{index + 1}</span><h3 className="mt-2 text-sm font-semibold text-[#302830]">{step}</h3></div>{index < framework.length - 1 && <span aria-hidden="true" className="text-[#b98094]">→</span>}</li>)}</ol>
            <p className="mt-5 text-xs leading-6 text-[#171717]">Our assessment-to-training methodology: understand the findings, shape the programme and review progress through retesting.</p>
          </div>
        </section>

        <section aria-labelledby="sport-specific-heading" className="bg-[#faf7f5]">
          <div className={`${container} py-16 sm:py-20 lg:py-24`}>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-16"><div><Eyebrow id="sport-specific">Sport-specific performance</Eyebrow><h2 id="sport-specific-heading" className={heading}>Different sports.<br /><span className="text-[#780c24]">Distinct demands.</span></h2></div><p className="max-w-[520px] text-[15px] leading-7 text-[#171717] lg:self-end">Performance solutions are adapted to the physiological, biomechanical and technical demands of each sport.</p></div>
            <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{sports.map((sport, index) => <li key={sport} className="flex items-center gap-4 rounded-xl border border-[#e9e1e4] bg-white p-5"><span aria-hidden="true" className="text-xs tracking-widest text-[#a07c8a]">0{index + 1}</span><h3 className="text-base font-semibold text-[#40323a]">{sport}</h3></li>)}</ul>
            <div className="mt-8 flex flex-col gap-5 rounded-xl border border-[#e3d5db] bg-white p-6 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="text-base font-semibold text-[#40323a]">Developing the people behind performance</h3><p className="mt-2 text-sm leading-6 text-[#171717]">Explore coach education, professional development and CSCS preparation.</p></div><Action href="/solutions/education" secondary>Explore education</Action></div>
          </div>
        </section>

        <section aria-labelledby="sports-enquiry-heading" className="bg-white">
          <div className={`${container} py-16 sm:py-20`}>
            <div className="rounded-[24px] bg-[#780c24] px-6 py-12 text-white sm:px-10 lg:px-12"><Eyebrow dark>Your next step</Eyebrow><h2 id="sports-enquiry-heading" className="max-w-[800px] text-3xl leading-[1.15] font-semibold tracking-[-0.035em] sm:text-4xl lg:text-[44px]">Ready to build a<br />high-performance environment?</h2><p className="mt-5 max-w-[660px] text-[15px] leading-7 text-white/80">Tell us about your facility, your athletes or your performance goals. Choose the conversation that fits your needs.</p><div className="mt-8 flex flex-wrap gap-3"><Action href={enquiry("Sports")} light>Start your project</Action><Link href={enquiry("Athlete Performance")} className="group inline-flex min-h-12 items-center gap-4 rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Athlete coaching enquiry<Arrow /></Link></div></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
