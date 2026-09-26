"use client";

import { useRef } from "react";
import Lotus from "./brand/Lotus";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/** Opening curtain: the lotus blooms petal by petal, then the blue panel lifts off the hero. */
export default function Intro({ line }: { line: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        document.documentElement.dataset.intro = "running";
        window.__lenis?.stop();
        const petals = gsap.utils.toArray<SVGPathElement>("[data-petal]", ref.current);
        const tl = gsap.timeline({
          onComplete: () => {
            delete document.documentElement.dataset.intro;
            window.__lenis?.start();
            ref.current?.remove();
          },
        });
        tl.set(ref.current, { autoAlpha: 1 })
          .from(petals, {
            scale: 0,
            autoAlpha: 0,
            transformOrigin: "50% 100%",
            duration: 0.9,
            stagger: { each: 0.07, from: "end" },
            ease: "back.out(1.6)",
          })
          .from("[data-intro-line]", { yPercent: 120, duration: 0.9 }, "-=0.5")
          .to("[data-intro-inner]", { y: -40, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, "+=0.35")
          .to(ref.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.1, ease: "expo.inOut" }, "-=0.15")
          .add(() => window.dispatchEvent(new Event("prima:intro")), "-=0.75");
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        ref.current?.remove();
        window.dispatchEvent(new Event("prima:intro"));
      });
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="grad-bg invisible fixed inset-0 z-[90] flex items-center justify-center"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div data-intro-inner className="flex flex-col items-center gap-7 text-white">
        <Lotus tone="white" className="w-24 overflow-visible md:w-32" />
        <span className="overflow-hidden">
          <span data-intro-line className="block text-xs font-semibold tracking-[0.4em] uppercase md:text-sm">
            {line}
          </span>
        </span>
      </div>
    </div>
  );
}
