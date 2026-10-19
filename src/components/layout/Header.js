"use client";

// @refresh reset

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import Breadcrumbs from "./Breadcrumbs";


const links = [["Home", "/"], ["Defence", "/defence"], ["Courses", "/courses"], ["Batches", "/#upcoming-batches"], ["About", "/about"], ["Contact", "/contact"]];
const solutions = [["Infrastructure", "/solutions#infrastructure"], ["Performance", "/solutions#performance"], ["Workforce", "/solutions/workforce"], ["Education", "/solutions/education"], ["Performance Intelligence", "/solutions/performance-intelligence"]];

function Arrow({ down = false }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={down ? "m6 9 6 6 6-6" : "M5 12h14m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const header = useRef(null);
  const menuButton = useRef(null);
  const dropdownButton = useRef(null);
  function close() { setOpen(false); setDropdown(false); }
  useEffect(() => {
    const element = header.current;
    if (open || !element) return;
    let active = true;
    const measureHeader = (entries = []) => {
      if (!active || !element.isConnected) return;
      const entry = entries.find(item => item.target === element);
      const height = entry?.borderBoxSize?.[0]?.blockSize ?? element.offsetHeight;
      if (height > 0) document.documentElement.style.setProperty("--site-header-height", `${height}px`);
    };
    measureHeader();
    const observer = new ResizeObserver(measureHeader);
    observer.observe(element);
    return () => {
      active = false;
      observer.disconnect();
    };
  }, [open]);
  useEffect(() => {
    function outside(e) { if (!header.current?.contains(e.target)) close(); }
    function escape(e) {
      if (e.key !== "Escape") return;
      if (dropdown) { setDropdown(false); dropdownButton.current?.focus(); }
      else if (open) { setOpen(false); menuButton.current?.focus(); }
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, [open, dropdown]);
  return <><header className="sticky top-0 z-50 border-t-[3px] border-t-[#780c24] border-b border-b-[#e9e5e5] bg-white font-sans text-[#242125] [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-[#780c24] [&_a:focus-visible]:outline-offset-[5px] [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-[#780c24] [&_button:focus-visible]:outline-offset-[5px]" ref={header}>
    <div className="mx-auto flex w-full flex-wrap items-center justify-between gap-0 px-5 py-3.5 lg:flex-nowrap lg:justify-start lg:gap-[22px] lg:px-6 lg:py-4 xl:grid xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] xl:gap-6 xl:px-9 xl:py-5">
      <Link href="/" className="flex shrink-0 items-center gap-2.5 no-underline" onClick={close} aria-label="WAARR home">
        <Image src="/logo1.png" alt="WAARR" width={56} height={56} priority className="size-12 object-contain lg:size-14" />
        <span className="text-[22px] leading-[1.2] font-extrabold tracking-[-0.8px] lg:hidden xl:block xl:text-[25px]">WAARR<small className="mt-[5px] block text-[9px] font-medium tracking-[1.5px] text-[#777078] uppercase">Defence Academy</small></span>
      </Link>
      <button ref={menuButton} type="button" className="grid cursor-pointer place-items-center rounded border border-[#e5dce0] bg-white p-[9px] text-[#780c24] lg:hidden" aria-expanded={open} aria-controls="header-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => { setOpen(!open); setDropdown(false); }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={open ? "m6 6 12 12M6 18 18 6" : "M4 6h16M4 12h16M4 18h16"} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
      </button>
      <div id="header-navigation" className={`${open ? "flex" : "hidden"} max-h-[calc(100dvh-95px)] basis-full flex-col items-stretch gap-5 overflow-y-auto pt-5 lg:flex lg:max-h-none lg:flex-1 lg:basis-auto lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:overflow-visible lg:pt-0 xl:contents`}>
        <nav aria-label="Main navigation" className="flex flex-col items-stretch gap-0 lg:flex-1 lg:flex-row lg:items-center lg:justify-center lg:gap-3.5 xl:col-start-2 xl:justify-self-center xl:gap-[21px]">
          {links.map(([name, href]) => {
            const active = href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
            const link = <Link href={href} className={`relative block py-3.5 text-[15px] font-[550] whitespace-nowrap no-underline hover:text-[#780c24] lg:py-2.5 lg:text-[13px] ${active ? "text-[#780c24] after:absolute after:bottom-[7px] after:left-0 after:h-0.5 after:w-[22px] after:bg-[#780c24] after:content-[''] lg:after:right-0 lg:after:bottom-0.5 lg:after:w-auto" : ""}`} aria-current={pathname === href ? "page" : undefined} onClick={close}>{name}</Link>;
            return name === "Solutions" ? <div key={href} className="relative" onPointerEnter={(e) => { if (e.pointerType === "mouse" && window.matchMedia("(min-width: 1024px)").matches) setDropdown(true); }} onPointerLeave={(e) => { if (e.pointerType === "mouse" && !e.currentTarget.contains(document.activeElement)) setDropdown(false); }} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setDropdown(false); }}>
              <div className="flex items-center justify-between lg:justify-start">{link}<button ref={dropdownButton} type="button" className="grid cursor-pointer place-items-center border-0 bg-transparent p-3.5 text-inherit lg:px-[3px] lg:py-[9px] aria-expanded:[&_svg]:rotate-180" aria-label="Solutions submenu" aria-expanded={dropdown} aria-controls="solutions-submenu" onClick={() => setDropdown(!dropdown)}><Arrow down /></button></div>
              {dropdown && <div id="solutions-submenu" className="static my-1 mb-2.5 w-full rounded-lg border border-[#eee7e9] bg-[#fcf8f9] p-2 lg:absolute lg:top-full lg:before:absolute lg:before:-top-3 lg:before:left-0 lg:before:h-3 lg:before:w-full lg:before:content-[''] lg:-left-5 lg:m-0 lg:w-[265px] lg:bg-white lg:shadow-[0_16px_40px_#2f0b1514]">{solutions.map(([label, url]) => <Link key={url} href={url} onClick={close} className="flex items-center justify-between gap-3 rounded px-3 py-[13px] text-[13px] no-underline hover:bg-[#faf3f5] hover:text-[#780c24]">{label}<Arrow /></Link>)}</div>}
            </div> : <span key={href}>{link}</span>;
          })}
        </nav>
        <div className="flex flex-col items-stretch gap-5 border-t border-[#eee7e9] pt-5 pb-1.5 lg:flex-row lg:items-center lg:gap-3.5 lg:border-0 lg:p-0 lg:ml-auto lg:shrink-0 xl:col-start-3 xl:justify-self-end xl:gap-5">
          <Link href="/portal/login" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg border border-[#780c24] bg-white px-4 py-3 text-sm font-semibold whitespace-nowrap text-[#780c24] no-underline transition-colors duration-200 hover:bg-[#780c24] hover:text-white focus-visible:bg-[#780c24] focus-visible:text-white lg:text-xs" onClick={close}>Login / Sign up<Arrow /></Link>
          <Link href="/contact?interest=Defence%20Preparation&amp;source=header" className="flex items-center justify-center gap-3 rounded border border-[#780c24] bg-[#780c24] p-[17px] text-xs font-semibold text-white no-underline transition-colors duration-200 hover:bg-white hover:text-[#780c24] focus-visible:bg-white focus-visible:text-[#780c24] lg:max-w-[185px] lg:px-[17px] lg:py-[15px] lg:text-[11px] xl:w-[230px] xl:max-w-[230px]" onClick={close}>Discuss Your Preparation<Arrow /></Link>
        </div>
      </div>
    </div>
  </header><Suspense fallback={null}><Breadcrumbs /></Suspense></>;
}




