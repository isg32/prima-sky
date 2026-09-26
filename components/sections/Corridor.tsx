"use client";

import Image from "next/image";
import { useRef } from "react";
import Heading from "../ui/Heading";
import { useReveal } from "../motion/useReveal";
import type { Dict } from "@/lib/i18n/en";
import { renders } from "@/lib/project";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";

export default function Corridor({ t }: { t: Dict }) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // the lobby opens like a pair of doors as it enters
        gsap.fromTo(
          "[data-doors]",
          { clipPath: "inset(0% 32% 0% 32%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: { trigger: "[data-doors]", start: "top 85%", end: "top 20%", scrub: true },
          },
        );
        gsap.fromTo("[data-doors] img", { scale: 1.3 }, { scale: 1, ease: "none", scrollTrigger: { trigger: "[data-doors]", start: "top bottom", end: "bottom top", scrub: true } });

        // the quote lights up word by word
        const split = SplitText.create("[data-words]", { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.15 },
          { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: "[data-words]", start: "top 80%", end: "bottom 45%", scrub: true } },
        );
        return () => split.revert();
      });
    },
    { scope: ref },
  );

  const c = t.corridor;
  return (
    <section ref={ref} className="section overflow-hidden bg-mist">
      <div className="wrap grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <figure data-doors className="relative aspect-[4/3] overflow-hidden bg-paper">
          <Image src={renders.lobby} alt={t.gallery.items[4].c} fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
        </figure>
        <div>
          <Heading eyebrow={c.eyebrow} light={c.light} bold={c.bold} size="display-sm" tab />
          <blockquote className="mt-10">
            <p data-words className="text-[clamp(26px,3vw,40px)] leading-[1.15] font-light text-blue-deep">
              “{c.quote}”
            </p>
            <p data-fade className="lede mt-6">
              {c.body}
            </p>
            <footer data-fade className="mt-8 border-l-2 border-sky pl-5 text-[15px] font-semibold tracking-wide text-ink uppercase">
              {c.tagline}
            </footer>
          </blockquote>
        </div>
      </div>

      {/* aerial — "immerse yourself in sky high opulence" */}
      <div className="relative mt-[clamp(80px,11vw,160px)] h-[clamp(420px,80vh,860px)] overflow-hidden">
        <div data-parallax="10" className="absolute -inset-y-[12%] inset-x-0">
          <Image src={renders.aerialCorner} alt={t.gallery.items[3].c} fill sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-night/50 via-transparent to-night/30" />
        <div className="wrap on-dark relative pt-[clamp(40px,7vw,90px)] text-white">
          <div className="ruled">
            <h2 className="display display-md" aria-label={`${c.immerseLight} ${c.immerseBold}`}>
              <span data-split className="block" aria-hidden="true">
                {c.immerseLight}
              </span>
              <b data-split data-delay="0.1" aria-hidden="true">
                {c.immerseBold}
              </b>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
