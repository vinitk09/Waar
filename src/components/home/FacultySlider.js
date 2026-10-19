"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { faculty } from "@/data/faculty";

const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#780c24]";

export default function FacultySlider() {
  const track = useRef(null);
  const [position, setPosition] = useState({ first: 0, visible: 1, atStart: true, atEnd: false });

  useEffect(() => {
    const element = track.current;
    function measure() {
      const firstCard = element.firstElementChild;
      if (!firstCard) return;
      const step = firstCard.getBoundingClientRect().width + 24;
      setPosition({
        first: Math.round(element.scrollLeft / step),
        visible: Math.max(1, Math.round((element.clientWidth + 24) / step)),
        atStart: element.scrollLeft <= 2,
        atEnd: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2,
      });
    }
    measure();
    element.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => { element.removeEventListener("scroll", measure); observer.disconnect(); };
  }, []);

  function move(direction) {
    const element = track.current;
    const step = element.firstElementChild.getBoundingClientRect().width + 24;
    element.scrollBy({ left: direction * step, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return <section id="faculty" aria-labelledby="faculty-heading" aria-roledescription="carousel" className="overflow-hidden bg-white">
    <div className="mx-auto max-w-[1480px] px-6 py-12 sm:px-10 sm:py-16 lg:px-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div><p className="mb-4 flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-[#780c24] uppercase"><span aria-hidden="true" className="h-0.5 w-6 bg-[#780c24]" />Meet the faculty</p><h2 id="faculty-heading" className="text-3xl leading-tight font-semibold tracking-[-0.035em] text-[#232025] sm:text-4xl">Guidance for <span className="text-[#780c24]">every step.</span></h2><p className="mt-4 max-w-[650px] text-sm leading-7 text-[#70616a]">Explore our sample faculty profiles across written preparation, communication and SSB practice.</p></div>
        <div className="flex gap-3">
          <button type="button" aria-label="Previous faculty" aria-controls="faculty-track" disabled={position.atStart} onClick={() => move(-1)} className={`grid size-12 cursor-pointer place-items-center rounded-full border border-[#780c24] text-xl text-[#780c24] transition-colors hover:bg-[#f5e9ee] disabled:cursor-default disabled:border-[#e3d5db] disabled:text-[#b9aab1] ${focus}`}>←</button>
          <button type="button" aria-label="Next faculty" aria-controls="faculty-track" disabled={position.atEnd} onClick={() => move(1)} className={`grid size-12 cursor-pointer place-items-center rounded-full border border-[#780c24] text-xl text-[#780c24] transition-colors hover:bg-[#f5e9ee] disabled:cursor-default disabled:border-[#e3d5db] disabled:text-[#b9aab1] ${focus}`}>→</button>
        </div>
      </div>
      <ul id="faculty-track" ref={track} aria-label="Faculty profiles; swipe or use the arrow buttons to browse" className="mt-8 grid snap-x snap-mandatory auto-cols-[100%] grid-flow-col gap-6 overflow-x-auto overscroll-x-contain py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:auto-cols-[calc((100%-24px)/2)] lg:auto-cols-[calc((100%-48px)/3)]">
        {faculty.map((member, index) => <li key={member.slug} className="min-w-0 snap-start">
          <Link href={`/faculty/${member.slug}`} aria-label={`View ${member.name}’s profile`} className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e9e1e4] bg-[#fcfaf9] transition-colors hover:border-[#b98094] ${focus}`}>
            <div className={`relative grid h-44 place-items-center border-b border-[#e9e1e4] ${index % 2 === 0 ? "bg-[#f1e5e9]" : "bg-[#eae8e2]"}`}><span aria-hidden="true" className="grid size-24 place-items-center rounded-full border border-[#780c24]/15 bg-white/65 text-3xl font-semibold tracking-tight text-[#780c24]">{member.initials}</span><span className="absolute top-4 left-4 rounded bg-white/80 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-[#780c24] uppercase">Sample profile</span></div>
            <div className="flex flex-1 flex-col p-6"><p className="text-[10px] font-semibold tracking-[0.12em] text-[#780c24] uppercase">{member.courses[0].title}</p><h3 className="mt-3 text-xl font-semibold text-[#302830]">{member.name}</h3><p className="mt-2 text-sm text-[#70616a]">{member.role}</p><p className="mt-4 mb-5 flex-1 text-sm leading-6 text-[#70616a]">{member.subjects.join(" · ")}</p><span className="flex min-h-11 items-center justify-between gap-3 border-t border-[#e9e1e4] pt-4 text-sm font-semibold text-[#780c24]">View faculty profile <span aria-hidden="true" className="transition-transform motion-safe:group-hover:translate-x-1">→</span></span></div>
          </Link>
        </li>)}
      </ul>
      <div className="mt-4 flex flex-wrap justify-between gap-2 text-xs leading-6 text-[#70616a]"><p>Illustrative profiles from our sample course content. Faculty appointments and biographies are awaiting confirmation.</p><p aria-live="polite" aria-atomic="true">Showing {position.first + 1}–{Math.min(faculty.length, position.first + position.visible)} of {faculty.length}</p></div>
    </div>
  </section>;
}
