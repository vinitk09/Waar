"use client";

// @refresh reset

import { useEffect } from "react";

export default function StaggerReveal({ targetId }) {
  useEffect(() => {
    const element = document.getElementById(targetId);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || preference.matches || !("IntersectionObserver" in window) || !Element.prototype.animate) return;
    let active = true;
    let revealed = false;
    const animations = Array.from(element.children).map((card, index) => {
      const animation = card.animate(
        [{ opacity: 0, transform: "translateY(22px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 900, delay: index * 180, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "both" },
      );
      animation.pause();
      animation.currentTime = 0;
      return animation;
    });
    const observer = new IntersectionObserver(entries => {
      if (!active || revealed || preference.matches || !element.isConnected || !entries.some(entry => entry.isIntersecting)) return;
      revealed = true;
      animations.forEach(animation => animation.play());
      observer.disconnect();
    }, { threshold: 0, rootMargin: "0px 0px -90px 0px" });
    const disableMotion = () => {
      if (preference.matches) {
        observer.disconnect();
        animations.forEach(animation => animation.cancel());
      }
    };
    observer.observe(element);
    preference.addEventListener("change", disableMotion);
    return () => {
      active = false;
      observer.disconnect();
      preference.removeEventListener("change", disableMotion);
      animations.forEach(animation => animation.cancel());
    };
  }, [targetId]);
  return null;
}
