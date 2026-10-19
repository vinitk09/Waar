"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { startScrollReveals } from "@/lib/scroll-reveals";

export default function SectionAnimations() {
  const pathname = usePathname();
  useEffect(() => {
    if (!("IntersectionObserver" in window) || !Element.prototype.animate) return;
    return startScrollReveals({
      root: document,
      preference: window.matchMedia("(prefers-reduced-motion: reduce)"),
      Observer: IntersectionObserver,
      Mutations: MutationObserver,
      requestFrame: requestAnimationFrame,
      cancelFrame: cancelAnimationFrame,
    });
  }, [pathname]);
  return null;
}
