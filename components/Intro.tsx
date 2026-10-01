"use client";

import { useRef, useState } from "react";
import Lotus from "./brand/Lotus";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

// The curtain plays once per visit; moving between pages inside the site skips it.
// Set when the intro finishes (not when it starts) so React's dev double-mount still plays it.
let played = false;

/** Opening curtain: the lotus blooms petal by petal, then the blue panel lifts off the hero. */
export default function Intro({ line }: { line: string }) {
  const ref = useRef<HTMLDivElement>(null);
  // unmount through React; removing the node by hand breaks later navigations
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        if (played) {
          setDone(true);
          // the page's own entrance listens for this in its effects, which run after ours
          const id = requestAnimationFrame(() => window.dispatchEvent(new Event("prima:intro")));
          return () => cancelAnimationFrame(id);
        }
        document.documentElement.dataset.intro = "running";
        window.__lenis?.stop();
        const petals = gsap.utils.toArray<SVGPathElement>("[data-petal]", ref.current);
        const tl = gsap.timeline({
          onComplete: () => {
            played = true;
            delete document.documentElement.dataset.intro;
            window.__lenis?.start();
            setDone(true);
          },
        });
        // the curtain is already painted by the server; petals and line start hidden in CSS
        tl.fromTo(
          petals,
          { scale: 0, autoAlpha: 0, transformOrigin: "50% 100%" },
          { scale: 1, autoAlpha: 1, duration: 0.9, stagger: { each: 0.07, from: "end" }, ease: "back.out(1.6)" },
        )
          .fromTo("[data-intro-line]", { yPercent: 120, autoAlpha: 1 }, { yPercent: 0, duration: 0.9 }, "-=0.5")
          .to("[data-intro-inner]", { y: -40, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, "+=0.35")
          .to(ref.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.1, ease: "expo.inOut" }, "-=0.15")
          .add(() => window.dispatchEvent(new Event("prima:intro")), "-=0.75");
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        setDone(true);
        window.dispatchEvent(new Event("prima:intro"));
      });
    },
    { scope: ref },
  );

  if (done) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="intro-curtain grad-bg fixed inset-0 z-[90] flex items-center justify-center"
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
