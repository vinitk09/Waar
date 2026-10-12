import Link from "next/link";

export default function FinalCallToAction() {
  return (
    <section aria-labelledby="conversation-heading" className="bg-[#faf7f5] font-sans">
      <div className="mx-auto max-w-[1480px] px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
        <div className="relative isolate overflow-hidden rounded-[24px] bg-[#780c24] px-6 py-12 text-center text-white sm:px-12 sm:py-16 lg:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute -top-36 -left-36 size-[400px] rounded-full border border-white/10" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-40 -bottom-48 size-[500px] rounded-full border border-white/10" />
          <div className="relative mx-auto max-w-[780px]">
            <p className="mb-5 text-[11px] font-semibold tracking-[0.18em] text-white/70 uppercase">Your goals. A connected approach.</p>
            <h2 id="conversation-heading" className="text-3xl leading-[1.15] font-semibold tracking-[-0.035em] sm:text-4xl lg:text-[48px]">Let’s build your<br />performance ecosystem.</h2>
            <p className="mx-auto mt-6 max-w-[680px] text-sm leading-7 text-white/80 sm:text-[15px]">Whether you are developing a sports facility, establishing a high-performance centre, preparing defence aspirants or strengthening an existing performance programme, WAARR can help design the system around your objectives.</p>
            <Link href="/contact" className="group mt-8 inline-flex min-h-12 items-center justify-center gap-5 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-[#780c24] transition-colors hover:bg-[#f5e9ee] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Start a conversation<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform motion-safe:group-hover:translate-x-1"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
