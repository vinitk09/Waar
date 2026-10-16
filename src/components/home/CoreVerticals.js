import Image from "next/image";
import Link from "next/link";

const verticals = [
  {
    name: "Sports",
    number: "01",
    heading: "Building environments where athletes can perform better.",
    description: "From sports infrastructure and high-performance centres to athlete assessment, strength & conditioning, biomechanics, recovery and performance analytics, WAARR integrates the systems required to develop athletes and institutions.",
    href: "/sports",
    image: "/images/soldier-training.png",
    alt: "Illustrative scene of Indian soldiers in camouflage uniforms practising physical training on an outdoor training ground",
    focus: "Infrastructure · Athlete development · Performance science",
  },
  {
    name: "Defence",
    number: "02",
    heading: "Preparing people and building systems for performance under demand.",
    description: "From NDA, CDS and SSB preparation to physical performance, assessment and institutional solutions, WAARR develops structured pathways for defence aspirants and organisations.",
    href: "/defence",
    image: "/images/army-preparation-hero-v3.png",
    alt: "Illustrative scene of Indian defence aspirants practising teamwork on an outdoor training course",
    focus: "Exam preparation · Physical readiness · Institutional solutions",
    courses: ["NDA", "CDS", "SSB Interview", "AFCAT", "ACC"],
  },
];

export default function CoreVerticals() {
  return (
    <section aria-labelledby="core-verticals-heading" className="bg-[#faf7f5] font-sans">
      <div className="mx-auto max-w-[1480px] px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
        <div className="mb-10 flex flex-col gap-5 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-5 text-[11px] font-semibold tracking-[0.18em] text-[#780c24] uppercase">Two core verticals</p>
            <h2 id="core-verticals-heading" className="text-3xl leading-[1.15] font-semibold tracking-[-0.035em] text-[#232025] sm:text-4xl lg:text-[44px]">Two pathways.<br /><span className="text-[#780c24]">One performance ecosystem.</span></h2>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {verticals.map((vertical) => (
            <article key={vertical.name} className="group flex min-w-0 flex-col overflow-hidden rounded-[20px] border border-[#e9e1e4] bg-white">
              <div className="relative aspect-[16/9] min-h-[240px] overflow-hidden bg-[#e9e2dc]">
                <div className="absolute inset-0">
                  <Image src={vertical.image} alt={vertical.alt} fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.03]" />
                </div>
                <div aria-hidden="true" className={`absolute inset-0 bg-gradient-to-t ${vertical.courses ? "from-[#23131d]/95 via-[#23131d]/35 to-transparent" : "from-[#23131d]/75 via-transparent to-transparent"}`} />
                <span className="absolute top-4 right-4 rounded bg-black/50 px-2 py-1 text-[9px] tracking-wide text-white">Illustrative composition</span>
                <div className="absolute right-6 bottom-5 left-6 sm:right-8 sm:left-8">
                  <div className="flex items-end justify-between">
                    <p className="text-3xl font-semibold tracking-[0.04em] text-white uppercase">{vertical.name}</p>
                    <span aria-hidden="true" className="text-sm font-medium tracking-widest text-white/70">{vertical.number}</span>
                  </div>
                  {vertical.courses && (
                    <div className="mt-3">
                      <p className="mb-2 text-[10px] font-semibold tracking-[0.14em] text-white/80 uppercase">Preparation pathways</p>
                      <ul aria-label="Defence preparation courses" className="flex flex-wrap gap-2">
                        {vertical.courses.map((course) => (
                          <li key={course} className="rounded-full border border-white/30 bg-[#23131d]/70 px-3 py-1 text-[11px] font-semibold text-white sm:text-xs">{course}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <h3 className="max-w-[520px] text-2xl leading-[1.3] font-semibold tracking-[-0.025em] text-[#302830] sm:text-[28px]">{vertical.heading}</h3>
                <p className="mt-4 text-sm leading-7 text-[#171717] sm:text-[15px]">{vertical.description}</p>
                <p className="mt-5 text-xs leading-6 font-medium text-[#780c24]">{vertical.focus}</p>
                <div className="mt-auto pt-7">
                  <Link href={vertical.href} className="inline-flex min-h-12 items-center gap-5 rounded border border-[#780c24] px-5 py-3 text-sm font-semibold text-[#780c24] transition-colors hover:bg-[#780c24] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#780c24]">Explore {vertical.name}<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
