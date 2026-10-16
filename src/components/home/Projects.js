import Link from "next/link";
import StaggerReveal from "./StaggerReveal";

import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section aria-labelledby="projects-heading" className="bg-[#faf7f5] font-sans">
      <div className="mx-auto max-w-[1480px] px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-5 text-[11px] font-semibold tracking-[0.18em] text-[#780c24] uppercase">Projects</p>
            <h2 id="projects-heading" className="text-3xl leading-[1.15] font-semibold tracking-[-0.035em] text-[#232025] sm:text-4xl lg:text-[44px]">From concept<br /><span className="text-[#780c24]">to implementation.</span></h2>
          </div>
          <Link href="/projects" className="group inline-flex min-h-12 w-fit items-center gap-4 rounded border border-[#780c24] px-5 py-3 text-sm font-semibold text-[#780c24] transition-colors hover:bg-[#780c24] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#780c24]">View all projects<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform motion-safe:group-hover:translate-x-1"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></Link>
        </div>


        <StaggerReveal targetId="homepage-project-cards" />
        <div id="homepage-project-cards" data-stagger-reveal aria-label="Project previews" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {projects.map((project, index) => (
            <article key={project.name} className="group flex flex-col rounded-2xl border border-[#e9e1e4] bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-[#c7a7b3] hover:shadow-[0_12px_30px_-18px_#780c2433] sm:p-7">
              <div className="mb-7 flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-xl bg-[#f5e9ee] text-[#780c24]"><svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={project.icon} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                <span aria-hidden="true" className="text-xs tracking-widest text-[#a9969f]">0{index + 1}</span>
              </div>
              <p className="mb-3 text-[10px] font-semibold tracking-[0.14em] text-[#780c24] uppercase">{project.category}</p>
              <h3 className="text-xl leading-7 font-semibold tracking-[-0.025em] text-[#302830]">{project.name}</h3>
              <p className="mt-2 mb-6 text-sm leading-6 text-[#171717]">{project.area}</p>
              <Link href={`/projects/${project.slug}`} className="mt-auto flex min-h-10 items-center justify-between border-t border-[#eee5e8] pt-4 text-xs font-semibold text-[#780c24]">View draft overview<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></Link>
            </article>
          ))}
          <div className="flex flex-col justify-center rounded-2xl bg-[#780c24] p-7 text-white sm:p-8">
            <span aria-hidden="true" className="mb-6 h-px w-10 bg-white/40" />
            <p className="text-2xl leading-tight font-semibold tracking-[-0.025em]">Infrastructure.<br />People.<br />Performance.</p>
            <p className="mt-4 text-sm leading-6 text-white/75">Connected through one ecosystem.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
