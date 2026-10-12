const strengths = [
  { title: "Scientific Approach", description: "Evidence-informed performance systems.", icon: "M9 3h6M10 3v6l-6 9a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-9V3M7 15h10M10 18h.01M14 17h.01" },
  { title: "Integrated Teams", description: "Multidisciplinary expertise working together.", icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M22 21v-2a4 4 0 0 0-3-3.87M15 3.13a4 4 0 0 1 0 7.75M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" },
  { title: "Institutional Solutions", description: "Designed for organisations, not just individuals.", icon: "m3 9 9-6 9 6H3ZM5 10v8M10 10v8M14 10v8M19 10v8M3 21h18" },
  { title: "Measurable Performance", description: "Assessment, monitoring and continuous improvement.", icon: "M3 17l6-6 4 4 8-10M15 5h6v6M3 21h18" },
];

export default function WhyWaarr() {
  return (
    <section aria-labelledby="why-waarr-heading" className="relative isolate overflow-hidden bg-[#291e24] font-sans text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 -left-40 size-[480px] rounded-full border border-white/5" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -bottom-48 size-[540px] rounded-full bg-[#780c24]/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-[1480px] gap-10 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[0.9fr_1.2fr] lg:items-center lg:gap-16 lg:px-12 lg:py-24">
        <div>
          <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-[#e0a8b9] uppercase"><span aria-hidden="true" className="h-px w-8 bg-[#e0a8b9]" />Why WAARR</p>
          <h2 id="why-waarr-heading" className="max-w-[520px] text-3xl leading-[1.15] font-semibold tracking-[-0.035em] sm:text-4xl lg:text-[44px]">One ecosystem.<br /><span className="text-[#e0a8b9]">Multiple expertises.</span></h2>
          <p className="mt-6 max-w-[460px] text-[15px] leading-7 text-[#d0c3ca]">WAARR brings infrastructure, performance science, specialised workforce and structured programme delivery under one ecosystem.</p>
          <div className="mt-8 flex items-center gap-3 text-xs leading-5 text-[#c3aab6]"><span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-[#e0a8b9]" /><p>Connected expertise. A shared focus on performance.</p></div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {strengths.map((strength, index) => (
            <li key={strength.title} className="group rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition-[background-color,border-color,transform] duration-300 hover:border-[#e0a8b9]/40 hover:bg-white/[0.065] motion-safe:hover:-translate-y-1 sm:p-7">
              <div className="mb-6 flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-xl border border-[#e0a8b9]/15 bg-[#e0a8b9]/10 text-[#e0a8b9] transition-colors duration-300 group-hover:bg-[#e0a8b9]/20"><svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={strength.icon} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                <span aria-hidden="true" className="text-xs tracking-widest text-[#b497a5]">0{index + 1}</span>
              </div>
              <h3 className="text-lg font-semibold tracking-[-0.02em]">{strength.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#d0c3ca]">{strength.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
