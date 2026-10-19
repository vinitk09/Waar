import test from "node:test";
import assert from "node:assert/strict";
import { startScrollReveals } from "../src/lib/scroll-reveals.js";

function fixture({ reduced = false } = {}) {
  const group = {};
  const cards = Array.from({ length: 4 }, (_, index) => ({
    index, isConnected: true, parentElement: null,
    closest: selector => selector === "[data-reveal-group]" ? group : null,
    compareDocumentPosition: other => index < other.index ? 4 : 2,
    contains(target) { return target === this; },
    animate(keyframes, options) {
      this.animation = { keyframes, options, played: 0, cancelled: 0,
        pause() { this.paused = true; },
        play() { this.played++; },
        cancel() { this.cancelled++; },
        effect: { updateTiming: timing => { this.animation.delay = timing.delay; } },
      };
      return this.animation;
    },
  }));
  let observer, mutations;
  const listeners = {};
  const preference = { matches: reduced, addEventListener: (_, fn) => { listeners.motion = fn; }, removeEventListener() {} };
  const root = { body: {}, querySelectorAll: () => cards,
    addEventListener: (_, fn) => { listeners.focus = fn; }, removeEventListener() {} };
  const stop = startScrollReveals({ root, preference,
    Observer: class {
      observed = new Set();
      constructor(callback, options) { this.callback = callback; this.options = options; observer = this; }
      observe(element) { this.observed.add(element); }
      unobserve(element) { this.observed.delete(element); }
      disconnect() { this.disconnected = true; this.observed.clear(); }
    },
    Mutations: class {
      constructor(callback) { this.callback = callback; mutations = this; }
      observe() {}
      disconnect() { this.disconnected = true; }
    },
    requestFrame: fn => { fn(); return 1; }, cancelFrame() {},
  });
  return { cards, observer, mutations, listeners, preference, stop };
}

test("cards stay paused until intersecting and visible cards stagger in DOM order", () => {
  const { cards, observer, stop } = fixture();
  assert.ok(cards.every(card => card.animation.paused && card.animation.played === 0));
  assert.equal(cards[0].animation.keyframes[0].opacity, 0);
  observer.callback([{ target: cards[2], isIntersecting: true }, { target: cards[0], isIntersecting: true }, { target: cards[1], isIntersecting: true }, { target: cards[3], isIntersecting: false }]);
  assert.deepEqual(cards.slice(0, 3).map(card => card.animation.delay), [0, 140, 280]);
  assert.equal(cards[3].animation.played, 0);
  assert.ok(observer.observed.has(cards[3]));
  observer.callback([{ target: cards[3], isIntersecting: true }]);
  assert.equal(cards[3].animation.delay, 0);
  assert.equal(cards[3].animation.played, 1);
  observer.callback([{ target: cards[0], isIntersecting: true }]);
  assert.equal(cards[0].animation.played, 1);
  cards[0].animation.onfinish();
  assert.equal(cards[0].animation.cancelled, 1);
  stop();
});

test("reduced motion, keyboard focus and navigation cleanup leave content visible", () => {
  const disabled = fixture({ reduced: true });
  assert.ok(disabled.cards.every(card => !card.animation));
  disabled.stop();
  const normal = fixture();
  normal.listeners.focus({ target: normal.cards[0] });
  assert.equal(normal.cards[0].animation.cancelled, 1);
  assert.equal(normal.observer.observed.has(normal.cards[0]), false);
  normal.preference.matches = true;
  normal.listeners.motion();
  assert.ok(normal.cards.every(card => card.animation.cancelled === 1));
  assert.ok(normal.observer.disconnected);
  normal.stop();
  assert.ok(normal.mutations.disconnected);
});

test("streamed or newly mounted content is scanned without replaying existing cards", () => {
  const { cards, observer, mutations, stop } = fixture();
  const extra = { ...cards[0], index: 5 };
  delete extra.animation;
  cards.push(extra);
  mutations.callback([{ addedNodes: [extra], removedNodes: [] }]);
  assert.ok(observer.observed.has(extra));
  assert.equal(cards[0].animation.played, 0);
  stop();
  assert.ok(cards.every(card => card.animation.cancelled === 1));
});
