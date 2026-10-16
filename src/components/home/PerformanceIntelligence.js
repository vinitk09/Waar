import Link from "next/link";

const cycle = [
  { name: "Assess", detail: "Establish the starting point" },
  { name: "Analyse", detail: "Understand the findings" },
  { name: "Prescribe", detail: "Shape the programme" },
  { name: "Monitor", detail: "Follow progress" },
  { name: "Reassess", detail: "Review and refine" },
];

export default function PerformanceIntelligence() {
  return (
    <section aria-labelledby="intelligence-heading" className="bg-[#faf7f5] font-sans">
      <div className="mx-auto max-w-[1480px] px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <p className="mb-5 text-[11px] font-semibold tracking-[0.18em] text-[#780c24] uppercase">Future direction</p>
            <h2 id="intelligence-heading" className="max-w-[620px] text-3xl leading-[1.15] font-semibold tracking-[-0.035em] text-[#232025] sm:text-4xl lg:text-[44px]">Building the next generation of<br /><span className="text-[#780c24]">performance intelligence.</span></h2>
            <p className="mt-6 max-w-[540px] text-[15px] leading-7 text-[#171717]">WAARR is building toward technology-enabled systems that connect performance assessment, athlete data, training and institutional decision-making.</p>
            <p className="mt-4 max-w-[520px] text-xs leading-6 text-[#171717]">This is our future development direction. The assessment cycle outlines the approach; it does not represent an available software platform.</p>
            <Link href="/solutions/performance-intelligence" className="group mt-7 inline-flex min-h-12 items-center gap-4 rounded border border-[#780c24] bg-white px-5 py-3 text-sm font-semibold text-[#780c24] transition-colors hover:bg-[#780c24] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#780c24]">Explore Performance Intelligence<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 transition-transform motion-safe:group-hover:translate-x-1"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></Link>
          </div>

          <div className="relative overflow-hidden rounded-[24px] border border-[#e3d5db] bg-white p-6 shadow-[0_20px_60px_-40px_#780c2440] sm:p-8">
            <div className="mb-7 flex items-center justify-between gap-3 border-b border-[#eee5e8] pb-5">
              <p className="text-xs font-semibold tracking-[0.12em] text-[#59454e] uppercase">The assessment cycle</p>
              <span className="rounded-full bg-[#f5e9ee] px-3 py-1.5 text-[10px] font-semibold text-[#780c24]">Continuous improvement</span>
            </div>
            <ol className="relative space-y-3">
              {cycle.map((step, index) => (
                <li key={step.name} className="group flex items-center gap-4 rounded-xl border border-[#eee5e8] bg-[#fcfaf9] px-4 py-3 transition-colors duration-300 hover:border-[#c7a7b3] hover:bg-[#faf3f5]">
                  <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full bg-[#f3e6eb] text-xs font-semibold text-[#780c24] transition-colors group-hover:bg-[#780c24] group-hover:text-white">0{index + 1}</span>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-[#302830]">{step.name}</h3>
                    <p className="mt-1 text-xs leading-5 text-[#171717]">{step.detail}</p>
                  </div>
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#a87387]"><path d={index === cycle.length - 1 ? "M20 7v5h-5M20 12a8 8 0 1 0-2 6" : "M12 4v16m-5-5 5 5 5-5"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-center text-xs leading-5 text-[#171717]">Each reassessment informs the next cycle.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
