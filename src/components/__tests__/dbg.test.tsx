import { describe, it } from "vitest";
import { render } from "@testing-library/react";
vi.mock("framer-motion", async () => {
  const React = await import("react");
  const p = (tag: string) => React.forwardRef((props: any, ref: any) => React.createElement(tag, { ...props, ref }));
  return { motion: new Proxy({}, { get: (_t, k: string) => p(k) }), AnimatePresence: ({children}: any)=>children, useReducedMotion: ()=>false };
});
vi.mock("../AIChatbot", () => ({ default: () => null }));
import HeroSection from "../HeroSection";
describe("dbg", () => {
  it("dump", () => {
    const { container } = render(<HeroSection />);
    const shimmer = container.querySelector(".animate-name-shimmer")!;
    console.log("PARENT HTML:", shimmer.parentElement?.outerHTML);
    console.log("ARIA hidden spans:", container.querySelectorAll("span[aria-hidden]").length);
    console.log("ALL svgs:", container.querySelectorAll("svg").length);
    const svg = container.querySelector("svg");
    console.log("first svg class:", svg?.getAttribute("class"));
  });
});
