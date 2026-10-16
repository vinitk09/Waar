import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const solutionContainer = "mx-auto max-w-[1480px] px-6 sm:px-10 lg:px-12";
export const solutionHeading = "text-3xl leading-[1.15] font-semibold tracking-[-0.035em] text-[#232025] sm:text-4xl lg:text-[44px]";

export function SolutionAction({ href, children, secondary = false }) {
  return <Link href={href} className={`group inline-flex min-h-12 w-fit items-center gap-4 rounded-lg border px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#780c24] ${secondary ? "border-[#780c24] bg-white text-[#780c24] hover:bg-[#f5e9ee]" : "border-[#780c24] bg-[#780c24] text-white hover:bg-[#5d091b]"}`}>{children}<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 transition-transform motion-safe:group-hover:translate-x-1"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></Link>;
}

export function SolutionEyebrow({ children, id }) {
  return <p id={id} className={`${id ? "section-anchor " : ""}mb-5 text-[11px] font-semibold tracking-[0.18em] text-[#780c24] uppercase`}>{children}</p>;
}

export function SolutionTiles({ items }) {
  return <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((item, index) => <li key={item} className="flex items-center gap-4 rounded-xl border border-[#e9e1e4] bg-white p-5 transition-colors hover:border-[#c7a7b3]"><span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#f5e9ee] text-xs font-semibold text-[#780c24]">{String(index + 1).padStart(2, "0")}</span><h3 className="text-sm leading-6 font-semibold text-[#40323a]">{item}</h3></li>)}</ul>;
}

export function solutionEnquiry(interest, source) {
  return `/contact?interest=${encodeURIComponent(interest)}&source=${encodeURIComponent(source)}`;
}

export default function DetailPage({ eyebrow, title, accent, introduction, heroAction, heroAside, children, ctaTitle, ctaCopy, ctaHref, ctaLabel }) {
  return (
    <>
      <Header />
      <main className="font-sans">
        <section aria-labelledby="detail-heading" className="bg-[#faf7f5]">
          <div className={`${solutionContainer} pt-5 pb-12 sm:pt-6 sm:pb-16 lg:pt-6 lg:pb-20`}>
            <Link href="/solutions" className="mb-4 inline-flex min-h-8 items-center gap-2 text-xs font-semibold text-[#780c24] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#780c24]"><span aria-hidden="true">←</span>All solutions</Link>
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16">
              <div><SolutionEyebrow>{eyebrow}</SolutionEyebrow><h1 id="detail-heading" className="max-w-[800px] text-[clamp(2.5rem,4.3vw,4.2rem)] leading-[1.08] font-bold tracking-[-0.045em] text-[#232025]">{title}<br /><span className="text-[#780c24]">{accent}</span></h1><p className="mt-6 max-w-[680px] text-[15px] leading-7 text-[#171717]">{introduction}</p><div className="mt-7">{heroAction}</div></div>
              <div className="rounded-[24px] border border-[#e3d5db] bg-white p-6 sm:p-8">{heroAside}</div>
            </div>
          </div>
        </section>
        {children}
        <section aria-labelledby="detail-cta-heading" className="bg-[#faf7f5]"><div className={`${solutionContainer} py-16 sm:py-20`}><div className="rounded-[24px] bg-[#780c24] px-6 py-12 text-white sm:px-10"><p className="mb-5 text-[11px] font-semibold tracking-[0.16em] text-white/70 uppercase">Your next step</p><h2 id="detail-cta-heading" className="max-w-[800px] text-3xl leading-[1.15] font-semibold tracking-[-0.035em] sm:text-4xl">{ctaTitle}</h2><p className="mt-5 max-w-[680px] text-[15px] leading-7 text-white/80">{ctaCopy}</p><Link href={ctaHref} className="mt-7 inline-flex min-h-12 items-center gap-4 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#780c24] transition-colors hover:bg-[#f5e9ee] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{ctaLabel}<span aria-hidden="true">→</span></Link></div></div></section>
      </main>
      <Footer />
    </>
  );
}
