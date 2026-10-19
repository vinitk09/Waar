const targetsSelector = "[data-scroll-reveal], [data-reveal-group] > *, main article, main figure, main h1, main h2, main > section > div > p, footer > div > div > *";
const existingMotion = '[data-stagger-reveal], [class*="animate-hero-reveal"]';

export function startScrollReveals({ root, preference, Observer, Mutations, requestFrame, cancelFrame }) {
  if (preference.matches) return () => {};
  let active = true;
  let frame;
  const seen = new WeakSet();
  const animations = new Map();
  const pending = new Set();

  function show(element) {
    observer.unobserve(element);
    pending.delete(element);
    const animation = animations.get(element);
    if (animation) {
      animations.delete(element);
      animation.cancel();
    }
  }

  const observer = new Observer(entries => {
    if (!active || preference.matches) return;
    const groups = new Map();
    // DOM order, rather than observer callback order, controls the sequence.
    const visible = entries.filter(entry => entry.isIntersecting && pending.has(entry.target))
      .sort((a, b) => a.target.compareDocumentPosition(b.target) & 2 ? 1 : -1);
    for (const { target } of visible) {
      if (!target.isConnected) { show(target); continue; }
      observer.unobserve(target);
      pending.delete(target);
      const animation = animations.get(target);
      if (!animation) continue;
      const group = target.closest("[data-reveal-group]") ?? target.parentElement;
      const index = groups.get(group) ?? 0;
      groups.set(group, index + 1);
      // Stagger only cards entering now; offscreen rows keep their own trigger.
      animation.effect.updateTiming({ delay: Math.min(index, 4) * 140 });
      animation.play();
    }
  }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });

  function scan() {
    if (!active || preference.matches) return;
    for (const element of animations.keys()) if (!element.isConnected) show(element);
    const candidates = Array.from(root.querySelectorAll(targetsSelector))
      .filter(element => !element.closest(existingMotion));
    const candidateSet = new Set(candidates);
    for (const element of candidates) {
      if (seen.has(element)) continue;
      // Avoid overlapping animations on a card and its heading.
      let parent = element.parentElement;
      while (parent && !candidateSet.has(parent)) parent = parent.parentElement;
      if (parent) continue;
      seen.add(element);
      const animation = element.animate(
        [{ opacity: 0, transform: "translateY(20px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 750, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "both" },
      );
      animation.pause();
      animation.currentTime = 0;
      animations.set(element, animation);
      pending.add(element);
      animation.onfinish = () => show(element);
      observer.observe(element);
    }
  }

  const mutations = new Mutations(records => {
    if (!active || !records.some(record => record.addedNodes.length || record.removedNodes.length)) return;
    cancelFrame(frame);
    frame = requestFrame(scan);
  });
  // Keyboard navigation must never land on an invisible control.
  function focusIn(event) {
    for (const element of animations.keys()) if (element.contains(event.target)) show(element);
  }
  function stopMotion() {
    if (!preference.matches) return;
    observer.disconnect();
    for (const element of animations.keys()) show(element);
  }
  scan();
  mutations.observe(root.body, { childList: true, subtree: true });
  preference.addEventListener("change", stopMotion);
  root.addEventListener("focusin", focusIn);
  return () => {
    active = false;
    cancelFrame(frame);
    observer.disconnect();
    mutations.disconnect();
    preference.removeEventListener("change", stopMotion);
    root.removeEventListener("focusin", focusIn);
    for (const element of animations.keys()) show(element);
  };
}
