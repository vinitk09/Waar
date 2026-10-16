import Link from "next/link";

export default function CourseTestSeriesInfo({ course, unlocked = false }) {
  return <section aria-labelledby="course-test-series" className="mt-6 rounded-2xl border border-[#e9e1e4] bg-white p-6 sm:p-8">
    <h2 id="course-test-series" className="section-anchor text-xl font-semibold text-[#302830]">Course test series</h2>
    <p className="mt-4 text-sm leading-7 text-[#171717]">Practise with tests for {course.title}, review your answers and track your results in your learning portal.</p>
    <ul className="mt-4 space-y-2 text-sm leading-7 text-[#171717]"><li>Tests linked to your enrolled course</li><li>Scores and answer explanations after submission</li><li>Saved attempt history and practice retakes</li></ul>
    <p className="mt-4 text-xs leading-6 font-semibold text-[#780c24]">{unlocked ? "Included in your unlocked course" : "Locked until enrolment and payment are completed"}</p>
    <Link href={unlocked ? `/portal/learn/${course.slug}/tests` : `/courses/${course.slug}/enrol`} className="mt-5 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-[#780c24]">{unlocked ? "Open course test series" : "Enrol to unlock test series"} <span aria-hidden="true">→</span></Link>
  </section>;
}
