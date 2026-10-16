import StaggerReveal from "./StaggerReveal";

const pillars = [
  { name: "Build", subtitle: "Infrastructure & facilities", description: "Create the right environment for learning, training and performance.", icon: "M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M15 9h.01M9 12h.01M15 12h.01" },
  { name: "Assess", subtitle: "Testing & profiling", description: "Understand the starting point and identify priorities for development.", icon: "M9 5H5v16h14V5h-4M9 3h6v4H9zM8 12l2 2 5-5M8 18h8" },
  { name: "Perform", subtitle: "Training & development", description: "Turn preparation into practice through structured programmes.", icon: "m13 2-9 12h7l-1 8 10-13h-7l1-7Z" },
  { name: "Operate", subtitle: "People & programme management", description: "Bring specialist people and coordinated delivery together.", icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M22 21v-2a4 4 0 0 0-3-3.87M15 3.13a4 4 0 0 1 0 7.75M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" },
  { name: "Evolve", subtitle: "Data & continuous improvement", description: "Review progress and refine the approach as needs change.", icon: "M3 17l6-6 4 4 8-10M15 5h6v6M3 21h18" },
];

export default function WhatIsWaarr() {
  return (
    <section aria-labelledby="what-is-waarr-heading" className="overflow-x-clip bg-white font-sans">
      <div className="mx-auto max-w-[1480px] px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
        <div className="grid items-start gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="transition-[opacity,transform] duration-700 ease-out motion-safe:data-[visible=false]:-translate-x-8 motion-safe:data-[visible=false]:opacity-0">
            <p className="mb-5 text-[11px] font-semibold tracking-[0.18em] text-[#780c24] uppercase">What is WAARR?</p>
            <h2 id="what-is-waarr-heading" className="max-w-[640px] text-3xl leading-[1.15] font-semibold tracking-[-0.035em] text-[#232025] sm:text-4xl lg:text-[44px]">Performance is not one service.<br /><span className="text-[#780c24]">It is an ecosystem.</span></h2>
          </div>
          <div className="waarr-introduction max-w-[570px] space-y-3 text-[15px] leading-7 text-[#171717] transition-[opacity,transform] duration-700 ease-out motion-safe:data-[visible=false]:translate-x-8 motion-safe:data-[visible=false]:opacity-0">
            <p>High performance requires more than a coach, a facility or a training programme. It requires the right infrastructure, people, science, technology and systems working together.</p>
            <p>WAARR connects sports performance with defence programme preparation. Here, Defence means NDA, CDS, SSB preparation, AFCAT, ACC, NCC entry guidance, Communication and Soft Skills, SSB mock assessments, and approved in-service guidance for PBORs/ORs.</p>
            <p className="text-xs leading-5 text-[#171717]">Programme availability and batch details are confirmed on the relevant programme pages.</p>
          </div>
        </div>

        <StaggerReveal targetId="waarr-pillar-cards" />
        <div id="waarr-pillar-cards" data-stagger-reveal className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-5 lg:gap-4">
          {pillars.map((pillar, index) => (
            <article key={pillar.name} className={`group relative rounded-xl border border-[#e9e1e4] bg-[#fcfaf9] p-6 transition-[opacity,transform,background-color,border-color] duration-700 ease-out hover:border-[#c7a7b3] hover:bg-[#faf3f5] motion-safe:data-[visible=false]:opacity-0 ${index % 2 === 0 ? "motion-safe:data-[visible=false]:-translate-x-6" : "motion-safe:data-[visible=false]:translate-x-6"}`} style={{ transitionDelay: `${index * 70}ms` }}>
              <div className="mb-7 flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-xl bg-[#f3e6eb] text-[#780c24] transition-colors group-hover:bg-[#780c24] group-hover:text-white"><svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={pillar.icon} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                <span aria-hidden="true" className="text-xs font-medium tracking-widest text-[#a9969f]">0{index + 1}</span>
              </div>
              <h3 className="text-lg font-semibold tracking-[0.04em] text-[#302830] uppercase">{pillar.name}</h3>
              <p className="mt-2 text-xs leading-5 font-semibold text-[#780c24]">{pillar.subtitle}</p>
              <p className="mt-3 text-sm leading-6 text-[#171717]">{pillar.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
