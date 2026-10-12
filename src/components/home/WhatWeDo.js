const steps = ["Build", "Assess", "Train", "Operate", "Measure"];

export default function WhatWeDo() {
  return (
    <section aria-labelledby="delivery-heading" className="bg-white font-sans">
      <div className="mx-auto max-w-[1480px] px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
        <div className="delivery-strip rounded-2xl border border-[#e9e1e4] bg-gradient-to-br from-[#fcfaf9] to-[#f7eef1] p-6 sm:p-8 xl:flex xl:items-center xl:gap-8">
          <div className="xl:max-w-[300px] xl:shrink-0">
            <p className="mb-2 text-[10px] font-semibold tracking-[0.16em] text-[#780c24] uppercase">Our delivery process</p>
            <h2 id="delivery-heading" className="text-2xl font-semibold tracking-[-0.03em] text-[#302830]">How we deliver</h2>
            <p className="mt-2 text-sm leading-6 text-[#171717]">Five connected steps. From infrastructure to performance.</p>
          </div>
          <ol className="mt-6 flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-center xl:mt-0 xl:flex-1">
            {steps.map((step, index) => (
              <li key={step} className="flex w-full flex-col items-center gap-2 md:w-auto md:flex-row" style={{ "--step-delay": `${index * 1.2}s` }}>
                <div className="delivery-pill flex w-full items-center gap-2.5 rounded-xl border border-[#e7d7dd] bg-white px-3 py-3 shadow-[0_2px_8px_#38232d04] md:w-auto">
                  <span aria-hidden="true" className="delivery-node grid size-7 shrink-0 place-items-center rounded-lg bg-[#f5e9ee] text-[10px] font-bold text-[#780c24]">0{index + 1}</span>
                  <span className="text-[13px] font-semibold text-[#302830]">{step}</span>
                </div>
                {index < steps.length - 1 && <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" className="delivery-arrow shrink-0 rotate-90 text-[#a87387] md:rotate-0"><path d="M4 12h16m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
