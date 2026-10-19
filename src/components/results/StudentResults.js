import Image from "next/image";

export default function StudentResults({ results }) {
  return <section aria-labelledby="student-results-heading" className="mx-auto max-w-[1480px] px-6 py-12 sm:px-10 sm:py-16 lg:px-12">
    <div className="flex flex-wrap items-end justify-between gap-3"><h2 id="student-results-heading" className="text-2xl font-semibold tracking-tight text-[#302830] sm:text-3xl">Our successful students</h2><p className="text-sm text-[#70616a]">{results.length} published results</p></div>
    {results.length ? <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{results.map(student => <li key={student.id} className="relative overflow-hidden rounded-2xl border border-[#e9e1e4] bg-white p-6 shadow-[0_6px_24px_-16px_#38232d40]">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-[#780c24]" />
      <div className="flex items-start justify-between gap-4"><div className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-[#780c24]/20 bg-[#faf0f3] text-2xl font-semibold text-[#780c24]">
        {student.image ? <Image src={student.image} alt={student.name} width={80} height={80} className="size-full object-cover" /> : <span aria-hidden="true">{student.name.split(" ").map(part => part[0]).slice(0, 2).join("")}</span>}
      </div><span className="rounded-full bg-[#f6ecef] px-3 py-1.5 text-[10px] font-semibold tracking-wide text-[#780c24]">{student.exam}</span></div>
      <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#302830]">{student.name}</h3>
      <p className="mt-2 text-sm font-semibold text-[#780c24]">{student.exam} {student.outcome}</p>
      <p className="mt-4 border-t border-[#eee7e9] pt-4 text-xs text-[#70616a]">{student.month} {student.year}</p>
    </li>)}</ul> : <p className="mt-8 text-sm text-[#70616a]">Student results will be published here soon.</p>}
  </section>;
}
