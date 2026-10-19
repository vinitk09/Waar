import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { faculty, getFaculty } from "@/data/faculty";

const container = "mx-auto max-w-[1480px] px-6 sm:px-10 lg:px-12";
const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#780c24]";

export function generateStaticParams() {
  return faculty.map(member => ({ slug: member.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const member = getFaculty(slug);
  return member ? { title: `${member.name} | Faculty Profile | WAARR`, description: `Explore ${member.name}’s sample profile, subject areas and preparation focus at WAARR.` } : { title: "Faculty not found | WAARR" };
}

export default async function FacultyPage({ params }) {
  const { slug } = await params;
  const member = getFaculty(slug);
  if (!member) notFound();
  const related = faculty.filter(item => item.slug !== member.slug).slice(0, 3);
  return <><Header /><main className="font-sans">
    <section className="bg-[#faf7f5]">
      <div className={`${container} py-8 sm:py-12`}>
        <Link href="/#faculty" className={`inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-[#780c24] ${focus}`}><span aria-hidden="true">←</span>Back to faculty</Link>
        <div className="mt-6 grid items-center gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">
          <div className="relative grid min-h-64 place-items-center rounded-2xl border border-[#e3d5db] bg-[#f1e5e9] sm:min-h-80"><span aria-hidden="true" className="grid size-36 place-items-center rounded-full border border-[#780c24]/15 bg-white/65 text-5xl font-semibold text-[#780c24]">{member.initials}</span><span className="absolute top-5 left-5 rounded bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#780c24]">Sample faculty profile</span></div>
          <div><p className="text-xs font-semibold tracking-[0.16em] text-[#780c24] uppercase">WAARR · Faculty</p><h1 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-[#232025] sm:text-5xl">{member.name}</h1><p className="mt-4 text-lg font-medium text-[#59454e]">{member.role}</p><p className="mt-5 max-w-[700px] text-sm leading-7 text-[#70616a]">{member.introduction}</p><ul aria-label="Subject areas" className="mt-6 flex flex-wrap gap-2">{member.subjects.map(subject => <li key={subject} className="rounded-full border border-[#e3d5db] bg-white px-4 py-2 text-xs font-semibold text-[#780c24]">{subject}</li>)}</ul></div>
        </div>
        <p className="mt-7 rounded-lg border border-[#e3d5db] bg-white px-5 py-4 text-xs leading-6 text-[#70616a]">This is an illustrative profile from our sample course content. Biography, qualifications, experience and teaching availability have not yet been confirmed.</p>
      </div>
    </section>
    <section aria-labelledby="teaching-heading" className="bg-white"><div className={`${container} grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.5fr_0.8fr] lg:gap-16`}>
      <div><h2 id="teaching-heading" className="text-2xl font-semibold tracking-tight text-[#302830] sm:text-3xl">Teaching focus & approach</h2><p className="mt-4 text-sm leading-7 text-[#70616a]">The sample preparation approach below reflects the subject areas listed in this faculty profile.</p><div className="mt-7 space-y-4">{member.approach.map((item, index) => <article key={item.title} className="rounded-xl border border-[#e9e1e4] bg-[#fcfaf9] p-6"><p className="font-mono text-xs text-[#780c24]">0{index + 1}</p><h3 className="mt-3 text-lg font-semibold text-[#302830]">{item.title}</h3><p className="mt-3 text-sm leading-7 text-[#70616a]">{item.description}</p></article>)}</div></div>
      <aside className="space-y-6"><section aria-labelledby="faculty-courses-heading" className="rounded-xl border border-[#e3d5db] bg-[#faf7f5] p-6"><h2 id="faculty-courses-heading" className="text-xl font-semibold text-[#302830]">Related courses</h2><ul className="mt-5 space-y-3">{member.courses.map(course => <li key={course.slug}><Link href={`/courses/${course.slug}`} className={`flex min-h-12 items-center justify-between gap-4 rounded-lg border border-[#e3d5db] bg-white px-4 py-3 text-sm font-semibold text-[#780c24] ${focus}`}>{course.title}<span aria-hidden="true">→</span></Link></li>)}</ul></section><section aria-labelledby="faculty-enquiry-heading" className="rounded-xl bg-[#291e24] p-6 text-white"><h2 id="faculty-enquiry-heading" className="text-xl font-semibold">Discuss your preparation</h2><p className="mt-4 text-sm leading-7 text-[#d0c3ca]">Ask our team about course scope, faculty availability and upcoming batches.</p><Link href={`/contact?interest=Defence%20Preparation&programme=${encodeURIComponent(member.courses[0].title)}&source=faculty`} className="mt-5 inline-flex min-h-12 items-center gap-4 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-[#780c24] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Enquire about the course <span aria-hidden="true">→</span></Link></section></aside>
    </div></section>
    <section aria-labelledby="other-faculty-heading" className="bg-[#faf7f5]"><div className={`${container} py-12 sm:py-16`}><h2 id="other-faculty-heading" className="text-2xl font-semibold tracking-tight text-[#302830]">Explore more faculty</h2><div className="mt-6 grid gap-4 sm:grid-cols-3">{related.map(item => <Link key={item.slug} href={`/faculty/${item.slug}`} className={`rounded-xl border border-[#e3d5db] bg-white p-6 transition-colors hover:border-[#780c24] ${focus}`}><h3 className="text-lg font-semibold text-[#302830]">{item.name}</h3><p className="mt-2 text-sm text-[#70616a]">{item.role}</p><span className="mt-5 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-[#780c24]">View profile <span aria-hidden="true">→</span></span></Link>)}</div></div></section>
  </main><Footer /></>;
}
