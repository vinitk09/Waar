"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { courses } from "@/data/courses";

export default function CourseCatalogue() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All courses");
  const filtered = courses.filter(course => (category === "All courses" || course.category === category) && `${course.title} ${course.description} ${course.focus.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase()));
  return (
    <>
      <div className="flex flex-col gap-5 border-b border-[#e9e1e4] pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Course category" className="flex flex-wrap gap-2">{["All courses", "Defence", "Professional Education"].map(value => <button key={value} type="button" aria-pressed={category === value} onClick={() => setCategory(value)} className={`min-h-11 cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#780c24] ${category === value ? "border-[#780c24] bg-[#780c24] text-white" : "border-[#e3d5db] bg-white text-[#59454e] hover:bg-[#f5e9ee]"}`}>{value}</button>)}</div>
        <div className="w-full lg:max-w-[380px]"><label htmlFor="course-search" className="sr-only">Search courses</label><input id="course-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search courses, skills or programmes" className="min-h-12 w-full rounded-xl border border-[#e3d5db] bg-white px-4 text-sm text-[#40323a] outline-none focus:border-[#780c24] focus:ring-2 focus:ring-[#780c24]/15" /></div>
      </div>
      <p aria-live="polite" className="my-6 text-xs text-[#171717]">{filtered.length} {filtered.length === 1 ? "course" : "courses"} found</p>
      {filtered.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filtered.map(course => <article key={course.slug} className="group flex flex-col overflow-hidden rounded-2xl border border-[#e9e1e4] bg-white transition-shadow hover:shadow-[0_16px_36px_-20px_#780c2440]"><Link href={`/courses/${course.slug}`} tabIndex={-1} aria-hidden="true" className="relative block aspect-[16/9] overflow-hidden bg-[#e9e2dc]"><Image src={course.image} alt="" fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw" className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#23131d]/85 to-transparent" /><span className="absolute bottom-4 left-4 text-xl font-bold text-white">{course.short}</span><span className="absolute top-3 right-3 rounded bg-black/50 px-2 py-1 text-[8px] text-white">Illustrative image</span></Link><div className="flex flex-1 flex-col p-5"><p className="text-[10px] font-semibold tracking-[0.12em] text-[#780c24] uppercase">{course.category}</p><h3 className="mt-3 text-lg leading-6 font-semibold text-[#302830]"><Link href={`/courses/${course.slug}`} className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#780c24]">{course.title}</Link></h3><p className="mt-3 mb-5 line-clamp-3 text-xs leading-6 text-[#171717]">{course.description}</p><p className="mt-auto text-[11px] font-medium text-[#171717]">{course.availability}</p><Link href={`/courses/${course.slug}`} className="mt-4 flex min-h-11 items-center justify-between border-t border-[#eee5e8] pt-3 text-xs font-semibold text-[#780c24] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#780c24]">View course & timeline<span aria-hidden="true">→</span></Link></div></article>)}</div> : <div className="rounded-2xl border border-[#e9e1e4] bg-white p-10 text-center"><h3 className="text-lg font-semibold text-[#302830]">No matching courses</h3><p className="mt-3 text-sm text-[#171717]">Try another search or view all courses.</p><button type="button" onClick={() => { setQuery(""); setCategory("All courses"); }} className="mt-5 min-h-11 cursor-pointer rounded-lg bg-[#780c24] px-5 py-2 text-sm font-semibold text-white">Reset filters</button></div>}
    </>
  );
}
