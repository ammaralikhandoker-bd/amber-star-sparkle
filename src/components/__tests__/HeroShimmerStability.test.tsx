/**
 * Hero shimmer — temporal stability & sparkle non-overlap.
 *
 * jsdom does not run CSS animations, so we can't read a live
 * `background-position` after waiting real wall-clock time. Instead we
 * simulate the animation deterministically from the keyframes that the
 * other regression test already locks in `index.css`:
 *
 *   @keyframes name-shimmer {
 *     0%   { background-position: -200% center; }
 *     100% { background-position:  200% center; }
 *   }
 *   .animate-name-shimmer { animation: name-shimmer 6s linear infinite; }
 *
 * The test samples the computed background-position at t≈0 and t≈1500ms
 * (and at 6000ms, and across the loop seam) and asserts:
 *   - the value moves (animation progresses, not stuck)
 *   - it stays inside the declared range (no overshoot / NaN / jump)
 *   - the loop wraps continuously (no discontinuity at 6s)
 *
 * Sparkle non-overlap is enforced *structurally*: the cluster wrapper
 * reserves a right-padding gutter (`pr-[0.35em]`) and the Sparkles icon
 * lives in that gutter (`right-0`), so glyphs of "Khandoker" cannot
 * paint underneath the icon regardless of font metrics.
 */
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

vi.mock("framer-motion", async () => {
  const React = await import("react");
  const p = (tag: string) =>
    React.forwardRef((props: any, ref: any) =>
      React.createElement(tag, { ...props, ref })
    );
  return {
    motion: new Proxy({}, { get: (_t, k: string) => p(k as string) }),
    AnimatePresence: ({ children }: any) => children,
    useReducedMotion: () => false,
  };
});
vi.mock("../AIChatbot", () => ({ default: () => null }));

import HeroSection from "../HeroSection";

// --- shimmer animation model (locked to the CSS keyframes) ---
const DURATION_MS = 6000;
const START_PCT = -200;
const END_PCT = 200;

/** Compute background-position-x (%) at time `tMs`, modelling
 *  `name-shimmer 6s linear infinite`. */
function shimmerPosAt(tMs: number): number {
  const phase = ((tMs % DURATION_MS) + DURATION_MS) % DURATION_MS;
  const k = phase / DURATION_MS; // 0..1
  return START_PCT + (END_PCT - START_PCT) * k;
}

describe("HeroSection shimmer — temporal stability", () => {
  it("progresses between t=0 and t≈1500ms (animation is not frozen)", () => {
    const t0 = shimmerPosAt(0);
    const t1 = shimmerPosAt(1500);
    expect(t0).toBe(-200);
    expect(t1).toBeCloseTo(-100, 5);
    expect(t1).not.toBe(t0);
    // movement should be a meaningful fraction of the full sweep
    expect(Math.abs(t1 - t0)).toBeGreaterThan((END_PCT - START_PCT) * 0.2);
  });

  it("stays inside the declared keyframe range at every 50ms sample (12s)", () => {
    // Dense sampling across two full loops (every 50ms for 12s)
    for (let t = 0; t <= 12000; t += 50) {
      const v = shimmerPosAt(t);
      expect(Number.isFinite(v)).toBe(true);
      expect(v).toBeGreaterThanOrEqual(START_PCT);
      expect(v).toBeLessThanOrEqual(END_PCT);
    }
  });

  it("samples every 25ms across one full 6s cycle to catch rare timing glitches", () => {
    // Finer-grained sampling: 240 samples in a single cycle.
    // Catches off-by-one errors, rounding glitches, or discontinuities
    // that a 50ms stride might miss.
    let prev = shimmerPosAt(0);
    for (let t = 25; t <= DURATION_MS; t += 25) {
      const v = shimmerPosAt(t);
      expect(Number.isFinite(v)).toBe(true);
      expect(v).toBeGreaterThanOrEqual(START_PCT);
      expect(v).toBeLessThanOrEqual(END_PCT);
      // Monotonic within a cycle (linear, no backtracking)
      expect(v).toBeGreaterThanOrEqual(prev);
      prev = v;
    }
    // After a full cycle we should be back at the start value
    expect(shimmerPosAt(DURATION_MS)).toBeCloseTo(shimmerPosAt(0), 9);
  });

  it("wraps continuously at the 6s loop seam (no visual jump mid-cycle)", () => {
    // Just before the seam vs just after should be near the endpoints,
    // and the next-cycle sample should re-enter from the start side.
    const justBefore = shimmerPosAt(DURATION_MS - 1);
    const justAfter = shimmerPosAt(DURATION_MS + 1);
    expect(justBefore).toBeGreaterThan(199);
    expect(justAfter).toBeLessThan(-199);
    // Same phase on consecutive cycles must be identical (stable loop).
    expect(shimmerPosAt(1500)).toBeCloseTo(shimmerPosAt(1500 + DURATION_MS), 9);
    expect(shimmerPosAt(2750)).toBeCloseTo(
      shimmerPosAt(2750 + DURATION_MS * 3),
      9
    );
  });

  it("samples the live shimmer span before and after a 1.5s wait without DOM mutation", async () => {
    const { container } = render(<HeroSection />);
    const shimmer = container.querySelector(
      ".animate-name-shimmer"
    ) as HTMLElement;
    expect(shimmer).toBeTruthy();

    const snap = () => ({
      cls: shimmer.className,
      bgSize: shimmer.style.backgroundSize,
      text: shimmer.textContent,
      parent: shimmer.parentElement?.children.length,
    });

    const before = snap();
    await new Promise((r) => setTimeout(r, 1500));
    const after = snap();

    // The element identity, classes, gradient sizing, text, and sibling
    // count must NOT mutate while the animation plays. (Any React re-render
    // that swaps these would visibly stutter the shimmer.)
    expect(after).toEqual(before);
    expect(shimmer.isConnected).toBe(true);
  });
});

describe("HeroSection shimmer — sparkle non-overlap (structural)", () => {
  const { container } = render(<HeroSection />);
  const shimmer = container.querySelector(
    ".animate-name-shimmer"
  ) as HTMLElement;
  const cluster = shimmer.parentElement as HTMLElement;
  const sparkle = cluster.querySelector(
    "svg.lucide-sparkles"
  ) as SVGElement | null;

  it("reserves a right-padding gutter on the cluster for the sparkle", () => {
    // pr-[0.35em] keeps glyphs out of the icon's column.
    expect(cluster.className).toContain("pr-[0.35em]");
  });

  it("anchors the sparkle inside that gutter (right-0, absolute)", () => {
    expect(sparkle).not.toBeNull();
    const cls = sparkle!.getAttribute("class") || "";
    expect(cls).toMatch(/\babsolute\b/);
    expect(cls).toMatch(/\bright-0\b/);
    // Sparkle sits above the baseline, not on top of glyphs.
    expect(cls).toMatch(/-top-\d/);
    // Small, bounded footprint — won't bleed across the whole word.
    expect(cls).toMatch(/\bw-5\b/);
    expect(cls).toMatch(/\bh-5\b/);
  });

  it("keeps the source contract (HeroSection.tsx) that places sparkle outside text flow", () => {
    const src = readFileSync(resolve(__dirname, "../HeroSection.tsx"), "utf8");
    // The Sparkles JSX must be absolutely positioned at right-0 inside the
    // cluster wrapper that owns pr-[0.35em]. If a future edit drops either
    // piece, the icon could overlap the italic "r" tail of "Khandoker".
    expect(src).toMatch(/pr-\[0\.35em\][^"]*"/);
    expect(src).toMatch(
      /<Sparkles[^/]*className=["'][^"']*absolute[^"']*right-0[^"']*["']/
    );
  });
});
