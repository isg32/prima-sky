"use client";

import { type RefObject } from "react";
import { gsap, MOTION_OK, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";

/**
 * Wires the shared scroll-reveal vocabulary inside a section:
 *   data-split      headline lines rise out of a mask
 *   data-fade       fade + lift
 *   data-stagger    children fade + lift in sequence
 *   data-clip       image wipes open, inner image settles from a zoom
 *   data-parallax   vertical drift while scrolling (value = yPercent range)
 *   data-count      numbers count up to their printed value
 *   .ruled          brochure blue rules draw in
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(scope);
        const st = (el: Element, start = "top 86%") => ({ trigger: el, start, once: true });

        q<HTMLElement>("[data-split]").forEach((el) => {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: 1.3,
                stagger: 0.09,
                delay: Number(el.dataset.delay ?? 0),
                scrollTrigger: st(el),
              }),
          });
        });

        q<HTMLElement>("[data-fade]").forEach((el) => {
          gsap.from(el, {
            y: 36,
            autoAlpha: 0,
            duration: 1.2,
            delay: Number(el.dataset.delay ?? 0),
            scrollTrigger: st(el),
          });
        });

        q<HTMLElement>("[data-stagger]").forEach((el) => {
          gsap.from(el.children, {
            y: 40,
            autoAlpha: 0,
            duration: 1.1,
            stagger: Number(el.dataset.stagger || 0.07),
            scrollTrigger: st(el),
          });
        });

        q<HTMLElement>("[data-clip]").forEach((el) => {
          const img = el.querySelector("img");
          const tl = gsap.timeline({ scrollTrigger: st(el, "top 90%") });
          tl.fromTo(
            el,
            { clipPath: "inset(18% 12% 18% 12%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" },
          );
          if (img) tl.from(img, { scale: 1.35, duration: 2, ease: "expo.out" }, 0);
        });

        q<HTMLElement>("[data-parallax]").forEach((el) => {
          const amt = Number(el.dataset.parallax || 12);
          gsap.fromTo(
            el,
            { yPercent: -amt },
            {
              yPercent: amt,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        q<HTMLElement>("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count);
          if (!Number.isFinite(target)) return;
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 2,
            ease: "power3.out",
            scrollTrigger: st(el, "top 95%"),
            onUpdate: () => {
              el.textContent = String(Math.round(obj.v));
            },
          });
        });

        q<HTMLElement>(".ruled").forEach((el) => {
          gsap.fromTo(
            el,
            { "--rule-s": 0 },
            { "--rule-s": 1, duration: 1.4, ease: "expo.inOut", scrollTrigger: st(el) },
          );
        });
      });

      return () => mm.revert();
    },
    { scope },
  );
}

export { ScrollTrigger };
