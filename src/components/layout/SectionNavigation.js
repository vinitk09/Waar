"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function SectionNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let frame;
    let active = true;
    const scrollToHash = (hash) => {
      if (!active || !hash || hash === "#") return;
      let id;
      try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
      const target = document.getElementById(id);
      if (!target || !target.isConnected) return;
      const header = document.querySelector("header");
      const offset = (header?.getBoundingClientRect().height ?? 96) + 24;
      const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);
      window.scrollTo({
        top,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
    };
    const scheduleScroll = () => {
      if (!active) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!active) return;
        frame = requestAnimationFrame(() => scrollToHash(window.location.hash));
      });
    };
    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || !url.hash) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) {
        let id;
        try { id = decodeURIComponent(url.hash.slice(1)); } catch { return; }
        if (!document.getElementById(id)) return;
        event.preventDefault();
        if (url.hash !== window.location.hash) window.history.pushState(null, "", url.pathname + url.search + url.hash);
        scrollToHash(url.hash);
      } else {
        // Let the destination mount before scrolling, rather than jumping first.
        event.preventDefault();
        router.push(url.pathname + url.search + url.hash, { scroll: false });
      }
    };

    scheduleScroll();
    document.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", scheduleScroll);
    window.addEventListener("popstate", scheduleScroll);
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", scheduleScroll);
      window.removeEventListener("popstate", scheduleScroll);
    };
  }, [pathname, router]);

  return null;
}
