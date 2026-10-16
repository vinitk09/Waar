import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Our Solutions | WAARR",
  description: "Four capabilities, one integrated ecosystem: WAARR infrastructure, performance, workforce and education solutions for sport and defence.",
};

const capabilities = [
  { name: "Infrastructure", id: "infrastructure", summary: "Design, build and equip performance environments.", icon: "M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M15 9h.01" },
  { name: "Performance", id: "performance", summary: "Bring performance science into practice.", icon: "M3 12h4l3-8 4 16 3-8h4" },
  { name: "Workforce", id: "workforce", summary: "Connect the right people with the right system.", icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M22 21v-2a4 4 0 0 0-3-3.87M15 3.13a4 4 0 0 1 0 7.75M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" },
  { name: "Education", id: "education", summary: "Develop the people who develop performance.", icon: "m2 9 10-5 10 5-10 5-10-5Zm4 2v6c4 3 8 3 12 0v-6M22 9v7" },
];
const facilities = ["High-Performance Centres", "Performance Labs", "Climbing Infrastructure", "Bouldering Walls", "Strength & Conditioning Facilities", "Recovery Spaces", "Sport-Specific Facilities"];
const performance = ["Testing", "Strength & Conditioning", "Biomechanics", "Performance Analytics", "Athlete Development", "Recovery", "Injury Risk Reduction"];
const specialists = ["Coaches", "Strength & Conditioning Specialists", "Biomechanists", "Physiotherapists", "Analysts", "Recovery Specialists", "Programme Managers"];
const education = ["Coach Education", "Performance Workshops", "Professional Courses", "Strength & Conditioning Education", "Sports Science Education", "Defence Preparation Education"];
const container = "mx-auto max-w-[1480px] px-6 sm:px-10 lg:px-12";
const heading = "text-3xl leading-[1.15] font-semibold tracking-[-0.035em] text-[#232025] sm:text-4xl lg:text-[44px]";
const enquiry = interest => `/contact?interest=${encodeURIComponent(interest)}&source=solutions`;

function Arrow() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 transition-transform motion-safe:group-hover:translate-x-1"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Eyebrow({ children, id, dark = false }) {
  return <p id={id} className={`${id ? "section-anchor " : ""}mb-5 text-[11px] font-semibold tracking-[0.18em] uppercase ${dark ? "text-[#e0a8b9]" : "text-[#780c24]"}`}>{children}</p>;
}

function Action({ href, children, light = false, secondary = false }) {
  return <Link href={href} className={`group inline-flex min-h-12 w-fit items-center justify-center gap-4 rounded-lg border px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${light ? "border-white bg-white text-[#780c24] hover:bg-[#f5e9ee] focus-visible:outline-white" : secondary ? "border-[#780c24] bg-white text-[#780c24] hover:bg-[#f5e9ee] focus-visible:outline-[#780c24]" : "border-[#780c24] bg-[#780c24] text-white hover:bg-[#5d091b] focus-visible:outline-[#780c24]"}`}>{children}<Arrow /></Link>;
}

function Items({ items, dark = false }) {
  return <ul className="grid gap-3 sm:grid-cols-2">{items.map(item => <li key={item} className={`flex items-center gap-3 rounded-xl border p-4 text-sm leading-6 ${dark ? "border-white/10 bg-white/[0.035] text-[#d0c3ca]" : "border-[#e9e1e4] bg-white text-[#59454e]"}`}><span aria-hidden="true" className={`size-1.5 shrink-0 rounded-full ${dark ? "bg-[#e0a8b9]" : "bg-[#b98094]"}`} />{item}</li>)}</ul>;
}

export default function SolutionsPage() {
  return (
    <>
      <Header />
      <main className="font-sans">
        <section aria-labelledby="solutions-heading" className="relative isolate overflow-hidden bg-[#faf7f5]">
          <div aria-hidden="true" className="pointer-events-none absolute -top-48 -right-32 size-[600px] rounded-full border border-[#780c24]/5" />
          <div className={`${container} relative py-12 sm:py-16 lg:py-20`}>
            <Eyebrow>Our solutions</Eyebrow>
            <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-16">
              <h1 id="solutions-heading" className="max-w-[800px] text-[clamp(2.5rem,4.3vw,4.4rem)] leading-[1.06] font-bold tracking-[-0.045em] text-[#232025]">Four capabilities.<br /><span className="text-[#780c24]">One integrated ecosystem.</span></h1>
              <p className="max-w-[440px] text-[15px] leading-7 text-[#171717]">Infrastructure, performance science, specialised people and education. Explore the capabilities that connect sport and defence preparation with structured delivery.</p>
            </div>
            <nav aria-label="Solutions capabilities" className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
              {capabilities.map((capability, index) => <Link key={capability.id} href={`#${capability.id}`} className="group flex flex-col rounded-2xl border border-[#e9e1e4] bg-white p-6 transition-[border-color,box-shadow,transform] duration-300 hover:border-[#c7a7b3] hover:shadow-[0_12px_30px_-18px_#780c2440] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#780c24] motion-safe:hover:-translate-y-1"><div className="mb-6 flex items-center justify-between"><span className="grid size-12 place-items-center rounded-xl bg-[#f5e9ee] text-[#780c24] transition-colors group-hover:bg-[#780c24] group-hover:text-white"><svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={capability.icon} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span><span aria-hidden="true" className="text-xs tracking-widest text-[#a9969f]">0{index + 1}</span></div><h2 className="text-xl font-semibold tracking-[-0.025em] text-[#302830]">{capability.name}</h2><p className="mt-3 mb-6 text-sm leading-6 text-[#171717]">{capability.summary}</p><span className="mt-auto flex items-center justify-between border-t border-[#eee5e8] pt-4 text-xs font-semibold text-[#780c24]">Explore capability<Arrow /></span></Link>)}
            </nav>
          </div>
        </section>

        <section aria-labelledby="infrastructure-heading" className="bg-white">
          <div className={`${container} grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24`}>
            <div><Eyebrow id="infrastructure">01 / Infrastructure</Eyebrow><h2 id="infrastructure-heading" className={heading}>Design. Build.<br /><span className="text-[#780c24]">Equip.</span></h2><p className="mt-6 text-lg font-medium text-[#59454e]">Sports and performance environments.</p><p className="mt-4 max-w-[540px] text-[15px] leading-7 text-[#171717]">Shape the environment around its purpose, from a focused training space to a high-performance centre. Project scope and delivery arrangements are agreed around your requirements.</p><div className="mt-7"><Action href={enquiry("Sports Infrastructure")}>Discuss infrastructure</Action></div><Link href="/sports#infrastructure" className="group mt-5 inline-flex min-h-10 items-center gap-3 text-sm font-semibold text-[#780c24] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#780c24]">Explore sports infrastructure<Arrow /></Link></div>
            <div><Items items={facilities} /><p className="mt-5 text-xs leading-6 text-[#171717]">Design, supply, installation and operational responsibilities are confirmed in the project proposal.</p></div>
          </div>
        </section>

        <section aria-labelledby="performance-heading" className="bg-[#faf7f5]">
          <div className={`${container} py-16 sm:py-20 lg:py-24`}>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16"><div><Eyebrow id="performance">02 / Performance</Eyebrow><h2 id="performance-heading" className={heading}>Science<br /><span className="text-[#780c24]">into practice.</span></h2><p className="mt-6 max-w-[550px] text-[15px] leading-7 text-[#171717]">Use assessment to understand the starting point, guide training priorities and review progress. Performance solutions connect testing, coaching and monitoring around the participant’s needs.</p><div className="mt-7 flex flex-wrap gap-3"><Action href="/sports#athlete-performance">Sports performance</Action><Action href="/defence#physical-performance" secondary>Defence physical performance</Action></div></div><div><Items items={performance} /><p className="mt-5 text-xs leading-6 text-[#171717]">Injury prevention focuses on reducing risk. Recovery support and clinical services depend on qualified practitioners and the agreed scope.</p></div></div>
            <div className="mt-10 rounded-2xl border border-[#e3d5db] bg-white p-6 sm:p-8"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div><h3 className="text-lg font-semibold text-[#302830]">Assessment that informs action</h3><p className="mt-2 text-sm leading-6 text-[#171717]">Assess → Analyse → Programme → Monitor → Reassess</p></div><Link href="/solutions/performance-intelligence" className="group inline-flex min-h-10 items-center gap-3 text-sm font-semibold text-[#780c24] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#780c24]">Explore Performance Intelligence<Arrow /></Link></div><div className="mt-5 border-t border-[#eee5e8] pt-5"><Action href={enquiry("Performance Consulting")} secondary>Discuss performance requirements</Action></div></div>
          </div>
        </section>

        <section aria-labelledby="workforce-heading" className="bg-[#291e24] text-white">
          <div className={`${container} grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24`}><div><Eyebrow id="workforce" dark>03 / Workforce</Eyebrow><h2 id="workforce-heading" className="text-3xl leading-[1.15] font-semibold tracking-[-0.035em] sm:text-4xl lg:text-[44px]">The right people.<br /><span className="text-[#e0a8b9]">The right system.</span></h2><p className="mt-6 max-w-[550px] text-[15px] leading-7 text-[#d0c3ca]">Connect specialist expertise with the needs of your programme or performance environment. Discuss staffing, responsibilities and managed delivery around your objectives.</p><div className="mt-7"><Action href={enquiry("Workforce Deployment")} light>Discuss workforce deployment</Action></div><Link href="/solutions/workforce" className="group mt-5 inline-flex min-h-10 items-center gap-3 text-sm font-semibold text-[#e0a8b9] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Explore workforce solutions<Arrow /></Link></div><div><Items items={specialists} dark /><p className="mt-5 text-xs leading-6 text-[#c3aab6]">Specialist availability, delivery arrangements and location are confirmed for each engagement.</p></div></div>
        </section>

        <section aria-labelledby="education-heading" className="bg-white">
          <div className={`${container} grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24`}><div><Eyebrow id="education">04 / Education</Eyebrow><h2 id="education-heading" className={heading}>Developing the people<br /><span className="text-[#780c24]">who develop performance.</span></h2><p className="mt-6 max-w-[550px] text-[15px] leading-7 text-[#171717]">Education connects coaches, performance professionals and aspiring practitioners with structured development. Explore professional education or discuss a workshop for your organisation.</p><div className="mt-7 flex flex-wrap gap-3"><Action href="/solutions/education">Explore education</Action><Action href={enquiry("Coach Education")} secondary>Discuss coach education</Action></div><Link href="/defence#programmes" className="group mt-5 inline-flex min-h-10 items-center gap-3 text-sm font-semibold text-[#780c24] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#780c24]">Explore defence preparation programmes<Arrow /></Link></div><div><Items items={education} /><p className="mt-5 text-xs leading-6 text-[#171717]">Programme availability, delivery format and any certification or credential-preparation arrangements are confirmed for the specific course.</p></div></div>
        </section>

        <section aria-labelledby="solutions-enquiry-heading" className="bg-[#faf7f5]"><div className={`${container} py-16 sm:py-20`}><div className="rounded-[24px] bg-[#780c24] px-6 py-12 text-white sm:px-10 lg:px-12"><Eyebrow dark>Connect the capabilities</Eyebrow><h2 id="solutions-enquiry-heading" className="max-w-[800px] text-3xl leading-[1.15] font-semibold tracking-[-0.035em] sm:text-4xl lg:text-[44px]">Build the solution<br />around your objectives.</h2><p className="mt-5 max-w-[660px] text-[15px] leading-7 text-white/80">Tell us what you are trying to build, improve or solve. We’ll help identify the right combination of infrastructure, performance, people and education.</p><div className="mt-8"><Action href={enquiry("Other")} light>Start a conversation</Action></div></div></div></section>
      </main>
      <Footer />
    </>
  );
}
