"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SectionAnimations() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window) || !Element.prototype.animate) return;
    let active = true;
    const seen = new WeakSet();
    const animations = new Set();
    let frame;
    const observer = new IntersectionObserver(entries => {
      if (!active) return;
      for (const entry of entries) {
        if (!entry.isIntersecting || !entry.target.isConnected) continue;
        observer.unobserve(entry.target);
        if (preference.matches) continue;
        const animation = entry.target.animate(
          [{ opacity: 0.25, transform: "translateY(18px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    }, { threshold: 0, rootMargin: "0px 0px -32px 0px" });

    const scan = () => {
      if (!active) return;
      const targets = document.querySelectorAll("main > section > div, main > div, main article, main section > div > ul > li, footer > div");
      for (const element of targets) {
        // Keep the existing hero and pillar entrance effects intact.
        if (seen.has(element) || element.querySelector('[data-scroll-reveal], [data-stagger-reveal], [class*="animate-hero-reveal"]') || element.closest("[data-scroll-reveal], [data-stagger-reveal]")) continue;
        seen.add(element);
        observer.observe(element);
      }
    };
    const mutations = new MutationObserver(records => {
      if (!active || !records.some(record => record.addedNodes.length)) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    });
    const stopMotion = () => {
      if (preference.matches) for (const animation of animations) animation.cancel();
    };
    scan();
    mutations.observe(document.body, { childList: true, subtree: true });
    preference.addEventListener("change", stopMotion);
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      mutations.disconnect();
      preference.removeEventListener("change", stopMotion);
      for (const animation of animations) animation.cancel();
      animations.clear();
    };
  }, [pathname]);
  return null;
}
