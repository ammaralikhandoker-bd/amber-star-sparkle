/**
 * Visual regression — Hero "Khandoker" shimmer gradient.
 *
 * jsdom does not paint pixels, so true screenshot diffs require Playwright.
 * This suite locks the *style-critical surface* that has historically broken
 * the hero shimmer:
 *   1. Animated class / structural cluster (snapshot of outerHTML).
 *   2. Gradient definition in HeroSection.tsx source (regex).
 *   3. Keyframes + reduced-motion override in index.css (regex).
 *
 * Note: jsdom silently drops inline `hsl(H S% L%)` (space-syntax) values, so
 * we lock those by asserting against the TSX source instead of the rendered
 * style object. Any intentional design change requires updating the snapshot
 * (`vitest -u`) and the regex constants — a deliberate, reviewable action.
 */
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

vi.mock("framer-motion", async () => {
  const React = await import("react");
  const passthrough = (tag: string) =>
    React.forwardRef((props: any, ref: any) =>
      React.createElement(tag, { ...props, ref })
    );
  return {
    motion: new Proxy({}, { get: (_t, k: string) => passthrough(k as string) }),
    AnimatePresence: ({ children }: any) => children,
    useReducedMotion: () => false,
  };
});
vi.mock("../AIChatbot", () => ({ default: () => null }));

import HeroSection from "../HeroSection";

const heroSource = readFileSync(
  resolve(__dirname, "../HeroSection.tsx"),
  "utf8"
);
const cssSource = readFileSync(
  resolve(__dirname, "../../index.css"),
  "utf8"
);

describe("HeroSection shimmer — visual regression", () => {
  const { container } = render(<HeroSection />);
  const shimmer = container.querySelector(
    ".animate-name-shimmer"
  ) as HTMLElement | null;
  const cluster = shimmer?.parentElement as HTMLElement | undefined;

  it("renders the shimmer span with the Khandoker label", () => {
    expect(shimmer).not.toBeNull();
    expect(shimmer!.textContent?.trim()).toBe("Khandoker");
  });

  it("locks the shimmer cluster structure (snapshot)", () => {
    // Captures: the animated span, blurred glow layer, underline accent,
    // and the Sparkles icon — all the pieces that make the shimmer "look right".
    expect(cluster!.outerHTML).toMatchSnapshot();
  });

  it("locks the shimmer gradient definition in HeroSection.tsx", () => {
    // Source-level lock because jsdom strips modern hsl() inline styles.
    expect(heroSource).toContain("animate-name-shimmer");
    expect(heroSource).toContain(
      "linear-gradient(110deg, hsl(220 95% 80%) 0%, hsl(195 100% 65%) 35%, hsl(43 96% 62%) 70%, hsl(220 95% 80%) 100%)"
    );
    expect(heroSource).toMatch(/backgroundSize:\s*['"]200% 100%['"]/);
  });

  it("locks the blurred glow layer behind the name", () => {
    expect(heroSource).toContain("color: 'hsl(195 100% 55%)'");
    expect(heroSource).toContain("filter: 'blur(10px)'");
  });

  it("keeps the @keyframes name-shimmer + reduced-motion override in index.css", () => {
    expect(cssSource).toMatch(/@keyframes\s+name-shimmer\b/);
    expect(cssSource).toMatch(/background-position:\s*-200%\s+center/);
    expect(cssSource).toMatch(/background-position:\s*200%\s+center/);
    expect(cssSource).toMatch(
      /\.animate-name-shimmer\s*{\s*animation:\s*name-shimmer\s+6s\s+linear\s+infinite/
    );
    // Reduced-motion must freeze the shimmer
    const reducedBlock = cssSource.match(
      /@media \(prefers-reduced-motion: reduce\)[\s\S]*$/
    )?.[0];
    expect(reducedBlock).toBeTruthy();
    expect(reducedBlock!).toMatch(
      /\.animate-name-shimmer\s*{\s*animation:\s*none\s*!important/
    );
  });
});
