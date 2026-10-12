import Image from "next/image";
import Link from "next/link";

const quickLinks = [["Home", "/"], ["Sports", "/sports"], ["Defence", "/defence"], ["Courses", "/courses"], ["Solutions", "/solutions"], ["Projects", "/projects"], ["About", "/about"], ["Contact", "/contact"]];
const services = [["Infrastructure", "/solutions#infrastructure"], ["Performance", "/solutions#performance"], ["Workforce", "/solutions/workforce"], ["Education", "/solutions/education"], ["Performance Intelligence", "/solutions/performance-intelligence"]];

function FooterLinks({ title, links }) {
  return (
    <nav aria-label={`Footer ${title}`}>
      <h2 className="mb-5 text-xs font-semibold tracking-[0.12em] text-white uppercase">{title}</h2>
      <ul className="space-y-3">
        {links.map(([label, href]) => <li key={label}><Link href={href} className="text-sm leading-6 text-[#c8bbc2] transition-colors hover:text-white">{label}</Link></li>)}
      </ul>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="border-t-[3px] border-[#780c24] bg-[#231b20] font-sans text-white [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-[#e0a8b9]">
      <div className="mx-auto max-w-[1480px] px-6 pt-12 sm:px-10 sm:pt-16 lg:px-12">
        <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1fr_1.1fr] lg:gap-12">
          <div>
            <Link href="/" aria-label="WAARR home" className="inline-flex items-center gap-3">
              <span className="grid size-16 place-items-center rounded-xl bg-white"><Image src="/logo1.png" alt="" width={52} height={52} className="object-contain" /></span>
              <span className="text-2xl font-bold tracking-[-0.03em]">WAARR<span className="mt-1 block text-[10px] font-medium tracking-[0.16em] text-[#e0a8b9] uppercase">Sports | Defence</span></span>
            </Link>
            <p className="mt-6 max-w-[300px] text-xl leading-7 font-semibold tracking-[-0.02em]">Building High-Performance Ecosystems</p>
            <p className="mt-4 max-w-[320px] text-xs leading-6 text-[#c8bbc2]">Infrastructure | Performance | Technology | Workforce</p>
            <Link href="/portal/login" className="mt-6 inline-flex min-h-11 items-center gap-3 rounded-lg border border-white/15 px-4 py-2 text-xs font-semibold text-[#e0a8b9] transition-colors hover:border-[#e0a8b9]/50 hover:bg-white/5">Participant Login<span aria-hidden="true">→</span></Link>
          </div>
          <FooterLinks title="Quick links" links={quickLinks} />
          <FooterLinks title="Services" links={services} />
          <div>
            <h2 className="mb-5 text-xs font-semibold tracking-[0.12em] uppercase">Defence</h2>
            <p className="text-sm leading-7 text-[#c8bbc2]">NDA · CDS · SSB<br />Physical Performance<br />Institutional Solutions</p>
            <Link href="/defence" className="mt-3 inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-[#e0a8b9] transition-colors hover:text-white">All Defence Programmes<span aria-hidden="true">→</span></Link>
            <div className="mt-6 border-t border-white/10 pt-5">
              <h2 className="text-xs font-semibold tracking-[0.12em] uppercase">Contact</h2>
              <p className="mt-3 text-sm text-[#c8bbc2]">Jamshedpur, India</p>
              <Link href="/contact" className="mt-2 inline-flex min-h-10 items-center gap-2 text-sm text-[#e0a8b9] transition-colors hover:text-white">Send an enquiry<span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs leading-5 text-[#a997a1] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 WAARR. All rights reserved.</p>
          <nav aria-label="Footer utility navigation" className="flex flex-wrap items-center gap-6"><Link href="/sitemap" className="transition-colors hover:text-white">Sitemap</Link><Link href="/privacy" className="transition-colors hover:text-white">Privacy</Link><Link href="/terms" className="transition-colors hover:text-white">Terms</Link></nav>
        </div>
      </div>
    </footer>
  );
}
