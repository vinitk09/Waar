import Link from "next/link";

const solutions = [
  {
    name: "Infrastructure",
    description: "Design, development and installation of performance environments.",
    href: "/solutions#infrastructure",
    icon: "M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M15 9h.01M9 12h.01M15 12h.01",
  },
  {
    name: "Performance",
    description: "Strength & conditioning, testing, biomechanics and athlete development.",
    href: "/solutions#performance",
    icon: "M3 12h4l3-8 4 16 3-8h4",
  },
  {
    name: "Workforce",
    description: "Specialised coaches, performance staff and managed high-performance teams.",
    href: "/solutions/workforce",
    icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M22 21v-2a4 4 0 0 0-3-3.87M15 3.13a4 4 0 0 1 0 7.75M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  },
  {
    name: "Education",
    description: "Coach development, professional education and performance programmes.",
    href: "/solutions/education",
    icon: "m2 9 10-5 10 5-10 5-10-5Zm4 2v6c4 3 8 3 12 0v-6M22 9v7",
  },
];

export default function OurSolutions() {
  return (
    <section aria-labelledby="solutions-heading" className="bg-[#faf7f5] font-sans">
      <div className="mx-auto max-w-[1480px] px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-5 text-[11px] font-semibold tracking-[0.18em] text-[#780c24] uppercase">Our solutions</p>
            <h2 id="solutions-heading" className="text-3xl leading-[1.15] font-semibold tracking-[-0.035em] text-[#232025] sm:text-4xl lg:text-[44px]">The capabilities behind<br /><span className="text-[#780c24]">better performance.</span></h2>
          </div>
          <p className="max-w-[390px] text-[15px] leading-7 text-[#171717]">Four connected areas of expertise, bringing the right environments, programmes and people together.</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-5">
          {solutions.map((solution, index) => (
            <Link key={solution.name} href={solution.href} className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#e9e1e4] bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 hover:border-[#c7a7b3] hover:shadow-[0_16px_36px_-18px_#780c2440] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#780c24] motion-safe:hover:-translate-y-1 sm:p-7">
              <div className="mb-8 flex items-center justify-between">
                <span className="grid size-14 place-items-center rounded-2xl bg-[#f5e9ee] text-[#780c24] transition-colors duration-300 group-hover:bg-[#780c24] group-hover:text-white"><svg width="27" height="27" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={solution.icon} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                <span aria-hidden="true" className="text-xs font-medium tracking-widest text-[#a9969f]">0{index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold tracking-[-0.025em] text-[#302830]">{solution.name}</h3>
              <p className="mt-3 mb-8 text-sm leading-7 text-[#171717]">{solution.description}</p>
              <div className="mt-auto flex items-center justify-between gap-2 border-t border-[#eee5e8] pt-5 text-xs font-semibold text-[#780c24]">
                <span>Explore {solution.name}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 transition-transform duration-300 motion-safe:group-hover:translate-x-1"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <span aria-hidden="true" className="absolute right-0 bottom-0 left-0 h-0.5 origin-left scale-x-0 bg-[#780c24] transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
