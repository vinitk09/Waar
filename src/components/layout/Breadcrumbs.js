"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { courses } from "@/data/courses";
import { projects } from "@/data/projects";
import { faculty } from "@/data/faculty";
import { breadcrumbsForPath } from "@/lib/breadcrumbs";

export default function Breadcrumbs() {
  const items = breadcrumbsForPath(usePathname(), { courses, projects, faculty });
  if (!items.length) return null;
  return <nav aria-label="Breadcrumb" className="border-b border-[#e9e1e4] bg-[#faf7f5] font-sans">
    <ol className="mx-auto flex max-w-[1480px] flex-wrap items-center gap-x-2 gap-y-1 px-6 py-3 text-xs leading-6 sm:gap-x-3 sm:px-10 lg:px-12">
      {items.map((item, index) => <li key={item.href} className="flex min-w-0 items-center gap-2 sm:gap-3">
        {index > 0 && <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="shrink-0 text-[#ad929e]"><path d="m4.5 3 3 3-3 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" /></svg>}
        {index === items.length - 1 ? <span aria-current="page" className="break-words font-semibold text-[#40323a]">{item.label}</span> : <Link href={item.href} className="inline-flex min-h-8 items-center rounded text-[#780c24] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#780c24]">{item.label}</Link>}
      </li>)}
    </ol>
  </nav>;
}
