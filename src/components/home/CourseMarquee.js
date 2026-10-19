"use client";

import Link from "next/link";
import { courses } from "@/data/courses";
import "./course-marquee.css";

export default function CourseMarquee() {
  return (
    <nav aria-label="Explore WAARR courses" className="course-marquee bg-[#780c24] text-white">
      <div className="mx-auto flex max-w-[1480px] items-center gap-3 px-6 sm:gap-5 sm:px-10 lg:px-12">
        <Link href="/courses" className="shrink-0 border-r border-white/25 pr-3 text-[10px] font-semibold tracking-[0.12em] uppercase sm:pr-5 sm:text-[11px]">Our courses</Link>
        <div className="course-marquee-window min-w-0 flex-1">
          <div className="course-marquee-track">
            {[0, 1].map(copy => (
              <ul key={copy} aria-hidden={copy === 1 ? true : undefined} className={`course-marquee-list ${copy === 1 ? "course-marquee-copy" : ""}`}>
                {courses.filter(course => course.category === "Defence").map(course => (
                  <li key={course.slug}>
                    <Link href={`/courses/${course.slug}`} tabIndex={copy === 1 ? -1 : undefined} className="inline-flex min-h-11 items-center gap-5 whitespace-nowrap text-xs font-medium text-white transition-colors hover:text-[#f1c8d5] sm:text-sm">
                      {course.title}<span aria-hidden="true" className="size-1 rounded-full bg-[#e0a8b9]" />
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
