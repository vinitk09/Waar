import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { courses } from "@/data/courses";
import { projects } from "@/data/projects";

export const metadata = { title: "Sitemap | WAARR", description: "Find WAARR’s main pages, course overviews, projects and participant login." };

const groups = [
  { title: "Main pages", links: [["Home", "/"], ["Sports", "/sports"], ["Defence", "/defence"], ["Solutions", "/solutions"], ["Projects", "/projects"], ["About", "/about"], ["Contact", "/contact"]] },
  { title: "Solution capabilities", links: [["Infrastructure", "/solutions#infrastructure"], ["Performance", "/solutions#performance"], ["Workforce", "/solutions/workforce"], ["Education", "/solutions/education"], ["Performance Intelligence", "/solutions/performance-intelligence"]] },
  { title: "Learning", links: [["All courses", "/courses"], ["Participant login", "/portal/login"], ...courses.map(course => [course.title, `/courses/${course.slug}`])] },
  { title: "Project overviews", links: projects.map(project => [project.name, `/projects/${project.slug}`]) },
];

export default function SitemapPage() {
  return <><Header /><main className="bg-[#faf7f5] font-sans"><div className="mx-auto max-w-[1480px] px-6 pt-8 pb-16 sm:px-10 lg:px-12"><p className="mb-5 text-[11px] font-semibold tracking-[0.18em] text-[#780c24] uppercase">Explore WAARR</p><h1 className="text-4xl font-bold tracking-[-0.04em] text-[#232025] sm:text-5xl">Sitemap</h1><p className="mt-5 text-sm leading-7 text-black">Find your way to our services, preparation programmes, projects and participant learning area.</p><div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{groups.map(group => <section key={group.title} aria-label={group.title} className="rounded-2xl border border-[#e9e1e4] bg-white p-6"><h2 className="mb-5 text-lg font-semibold text-[#302830]">{group.title}</h2><ul className="space-y-2">{group.links.map(([name, href]) => <li key={href}><Link href={href} className="inline-flex min-h-10 items-center text-sm leading-6 text-[#780c24] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#780c24]">{name}</Link></li>)}</ul></section>)}</div></div></main><Footer /></>;
}
