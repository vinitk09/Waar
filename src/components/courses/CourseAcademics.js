import Link from "next/link";

function TeacherIcon() {
  return <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21v-2a8 8 0 0 1 16 0v2" /></svg>;
}

export default function CourseAcademics({ course, enquiryHref }) {
  const syllabus = course.syllabus?.length ? course.syllabus : course.focus.map(title => ({ title, topics: [] }));
  const teachers = course.teachers ?? [];
  return <>
    <section aria-labelledby="course-syllabus" className="mt-6 rounded-2xl border border-[#e9e1e4] bg-white p-6 sm:p-8">
      <p className="text-[11px] font-semibold tracking-[0.14em] text-[#780c24] uppercase">What you’ll study</p>
      <h2 id="course-syllabus" className="section-anchor mt-3 text-xl font-semibold text-[#302830]">Syllabus overview</h2>
      {course.academicsSample && <p className="mt-4 w-fit rounded-full bg-[#f5e9ee] px-3 py-1.5 text-[11px] font-semibold text-[#780c24]">Sample syllabus</p>}
      <p className="mt-3 text-sm leading-7 text-[#171717]">Explore the learning areas for {course.title} before enrolling.</p>
      {course.academicsSample && <p className="mt-2 text-xs leading-6 text-[#171717]">Illustrative course outline. Final teaching topics will be confirmed for the course.</p>}
      <ol className="mt-6 space-y-3">{syllabus.map((module, index) => <li key={module.title} className="rounded-xl border border-[#e9e1e4] bg-[#fcfaf9] p-5">
        <div className="flex items-start gap-4"><span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#f5e9ee] text-xs font-semibold text-[#780c24]">{String(index + 1).padStart(2, "0")}</span><div>
          <h3 className="pt-1.5 text-sm leading-6 font-semibold text-[#40323a]">{module.title}</h3>
          {module.description && <p className="mt-3 text-sm leading-7 text-[#171717]">{module.description}</p>}
          {module.topics?.length > 0 && <ul className="mt-3 space-y-2">{module.topics.map(topic => <li key={topic} className="flex items-start gap-2 text-sm leading-7 text-[#171717]"><span aria-hidden="true" className="mt-3 size-1 shrink-0 rounded-full bg-[#780c24]" />{topic}</li>)}</ul>}
        </div></div>
      </li>)}</ol>
    </section>
    <section aria-labelledby="course-teachers" className="mt-6 rounded-2xl border border-[#e9e1e4] bg-white p-6 sm:p-8">
      <p className="text-[11px] font-semibold tracking-[0.14em] text-[#780c24] uppercase">Learn with guidance</p>
      <h2 id="course-teachers" className="section-anchor mt-3 text-xl font-semibold text-[#302830]">Your course teachers</h2>
      {course.academicsSample && <p className="mt-3 text-xs leading-6 text-[#171717]">Sample faculty profiles with fictional names. Actual teachers will be confirmed for the course.</p>}
      {teachers.length ? <ul className="mt-6 grid gap-4 sm:grid-cols-2">{teachers.map(teacher => <li key={teacher.name} className="rounded-xl border border-[#e9e1e4] bg-[#fcfaf9] p-5">
        <span aria-hidden="true" className="grid size-12 place-items-center rounded-full bg-[#f5e9ee] text-sm font-semibold text-[#780c24]">{teacher.name.split(/\s+/).slice(0, 2).map(part => part[0]).join("")}</span>
        <h3 className="mt-4 text-base font-semibold text-[#302830]">{teacher.name}</h3>
        {teacher.role && <p className="mt-2 text-xs font-semibold text-[#780c24]">{teacher.role}</p>}
        {teacher.subjects?.length > 0 && <p className="mt-3 text-sm leading-7 text-[#171717]">Teaches: {teacher.subjects.join(", ")}</p>}
        {teacher.bio && <p className="mt-3 text-sm leading-7 text-[#171717]">{teacher.bio}</p>}
      </li>)}</ul> : <div className="mt-6 flex items-start gap-4 rounded-xl border border-dashed border-[#d9c4cd] bg-[#fcfaf9] p-5">
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#f5e9ee] text-[#780c24]"><TeacherIcon /></span>
        <div><h3 className="text-base font-semibold text-[#40323a]">Faculty to be announced</h3><p className="mt-2 text-sm leading-7 text-[#171717]">Teacher names and subject assignments for {course.title} will be listed here once confirmed.</p><Link href={enquiryHref} className="mt-3 inline-flex min-h-11 items-center gap-3 text-xs font-semibold text-[#780c24]">Ask about course teachers <span aria-hidden="true">→</span></Link></div>
      </div>}
    </section>
  </>;
}
