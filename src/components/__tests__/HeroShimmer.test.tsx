/**
 * Visual regression — Hero "Khandoker" shimmer gradient.
 *
 * Note: jsdom does not paint pixels, so true screenshot diffing requires
 * Playwright. This suite catches the practical regressions that have
 * historically broken the hero shimmer:
 *   1. The animated class is removed or renamed.
 *   2. The gradient stops / direction / size change unexpectedly.
 *   3. The blurred shadow layer or sparkle accent is removed.
 *   4. The keyframes definition in index.css drifts.
 *
 * Snapshots are committed; any intentional design change must be reviewed
 * and accepted via `vitest -u`.
 */
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import HeroSection from "../HeroSection";

// Stub framer-motion so jsdom doesn't need IntersectionObserver / rAF timing
vi.mock("framer-motion", async () => {
  const React = await import("react");
  const passthrough = (tag: string) =>
    React.forwardRef((props: any, ref: any) =>
      React.createElement(tag, { ...props, ref })
    );
  const motion = new Proxy(
    {},
    { get: (_t, key: string) => passthrough(key) }
  );
  return {
    motion,
    AnimatePresence: ({ children }: any) => children,
    useReducedMotion: () => false,
  };
});

// Stub the chatbot — irrelevant to this test and pulls heavy deps
vi.mock("../AIChatbot", () => ({ default: () => null }));

describe("HeroSection shimmer — visual regression", () => {
  const { container } = render(<HeroSection />);

  const shimmer = container.querySelector(
    ".animate-name-shimmer"
  ) as HTMLElement | null;

  it("renders the shimmer span with the Khandoker label", () => {
    expect(shimmer).not.toBeNull();
    expect(shimmer!.textContent?.trim()).toBe("Khandoker");
  });

  it("locks the shimmer gradient definition (snapshot)", () => {
    // We snapshot only the style-critical surface so unrelated tweaks
    // (copy edits, surrounding layout) don't churn the snapshot.
    const snapshot = {
      className: shimmer!.className,
      backgroundImage: shimmer!.style.backgroundImage,
      backgroundSize: shimmer!.style.backgroundSize,
    };
    expect(snapshot).toMatchInlineSnapshot(`
      {
        "backgroundImage": "linear-gradient(110deg, hsl(220 95% 80%) 0%, hsl(195 100% 65%) 35%, hsl(43 96% 62%) 70%, hsl(220 95% 80%) 100%)",
        "backgroundSize": "200% 100%",
        "className": "relative text-[2.25rem] md:text-6xl lg:text-7xl font-black italic tracking-tight bg-clip-text text-transparent animate-name-shimmer",
      }
    `);
  });

  it("preserves the blurred glow layer behind the name", () => {
    const glow = container.querySelector(
      'span[aria-hidden][class*="italic"]'
    ) as HTMLElement | null;
    expect(glow).not.toBeNull();
    expect(glow!.style.filter).toBe("blur(10px)");
    expect(glow!.style.color).toBe("hsl(195 100% 55%)");
  });

  it("keeps the Sparkles accent in the shimmer cluster", () => {
    // lucide-react renders an <svg class="lucide-sparkles ...">
    const sparkle = container.querySelector('svg[class*="sparkle"]');
    expect(sparkle).not.toBeNull();
  });

  it("keeps the @keyframes name-shimmer definition in index.css", () => {
    const css = readFileSync(
      resolve(__dirname, "../../index.css"),
      "utf8"
    );
    expect(css).toMatch(/@keyframes\s+name-shimmer\s*{[^}]*-200%[^}]*200%/);
    expect(css).toMatch(
      /\.animate-name-shimmer\s*{\s*animation:\s*name-shimmer\s+6s\s+linear\s+infinite/
    );
    // Reduced-motion override must freeze the animation.
    expect(css).toMatch(
      /prefers-reduced-motion[\s\S]*\.animate-name-shimmer\s*{\s*animation:\s*none\s*!important/
    );
  });
});
