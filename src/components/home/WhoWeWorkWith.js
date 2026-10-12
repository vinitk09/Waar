import StaggerReveal from "./StaggerReveal";

const audiences = [
  { name: "Schools", icon: "M3 21h18M5 21V9l7-6 7 6v12M9 21v-6h6v6M10 10h4" },
  { name: "Sports Academies", icon: "M8 3h8v7a4 4 0 0 1-8 0V3ZM8 5H4v3a4 4 0 0 0 4 4M16 5h4v3a4 4 0 0 1-4 4M12 14v5M8 21h8M10 19h4" },
  { name: "Clubs", icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M22 21v-2a4 4 0 0 0-3-3.87M15 3.13a4 4 0 0 1 0 7.75M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" },
  { name: "High-Performance Centres", icon: "M3 12h4l3-8 4 16 3-8h4" },
  { name: "Athletes", icon: "m13 2-9 12h7l-1 8 10-13h-7l1-7Z" },
  { name: "Defence Aspirants", icon: "m12 3 9 4v5c0 5-9 9-9 9s-9-4-9-9V7l9-4ZM8 12l3 3 5-6" },
  { name: "Defence Organisations", icon: "m12 3 9 4v5c0 5-9 9-9 9s-9-4-9-9V7l9-4ZM12 8v8M8 12h8" },
  { name: "Institutions", icon: "m3 9 9-6 9 6H3ZM5 10v8M10 10v8M14 10v8M19 10v8M3 21h18" },
  { name: "Corporate & Community Programmes", icon: "M3 21h18M4 21V7h10v14M14 11h6v10M8 11h2M8 15h2M8 19h2M17 15h.01M17 18h.01" },
];

export default function WhoWeWorkWith() {
  return (
    <section aria-labelledby="audiences-heading" className="bg-white font-sans">
      <div className="mx-auto max-w-[1480px] px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.4fr] lg:items-start lg:gap-16">
          <div>
            <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-[#780c24] uppercase"><span aria-hidden="true" className="h-px w-8 bg-[#780c24]" />Who we work with</p>
            <h2 id="audiences-heading" className="max-w-[490px] text-3xl leading-[1.15] font-semibold tracking-[-0.035em] text-[#232025] sm:text-4xl lg:text-[44px]">Built for<br /><span className="text-[#780c24]">performance-driven</span><br />organisations.</h2>
            <p className="mt-5 max-w-[400px] text-[15px] leading-7 text-[#171717]">For people pursuing their next milestone and organisations creating the environments that help them get there.</p>
            <div className="mt-7 flex items-center gap-3 text-xs leading-5 text-[#171717]"><span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-[#780c24]" /><p>Our intended audiences across sport, defence and the wider community.</p></div>
          </div>

          <StaggerReveal targetId="audience-cards" />
          <ul id="audience-cards" data-stagger-reveal aria-label="WAARR intended audiences" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {audiences.map((audience) => (
              <li key={audience.name} className="group flex items-center gap-3 rounded-xl border border-[#e9e1e4] bg-[#fcfaf9] p-4 transition-colors duration-300 hover:border-[#c7a7b3] hover:bg-[#faf3f5] sm:min-h-[104px] sm:flex-col sm:items-start sm:gap-3 sm:p-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#f3e6eb] text-[#780c24] transition-colors duration-300 group-hover:bg-[#780c24] group-hover:text-white"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={audience.icon} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                <span className="text-sm leading-5 font-semibold text-[#40323a]">{audience.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
