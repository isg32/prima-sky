"use client";

import Image from "next/image";
import { useRef } from "react";
import Heading from "../ui/Heading";
import Icon from "../ui/Icon";
import { useReveal } from "../motion/useReveal";
import type { Dict } from "@/lib/i18n/en";
import { renders } from "@/lib/project";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

export default function Overview({ t }: { t: Dict }) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // watermark headline slides across as you scroll, like the brochure's giant type
        gsap.fromTo(
          "[data-marquee]",
          { xPercent: 8 },
          { xPercent: -38, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
        // highlights: the connecting spine draws, nodes and icons pop as it passes
        gsap.from("[data-spine]", {
          scaleY: 0,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: { trigger: "[data-highlights]", start: "top 70%", end: "bottom 60%", scrub: true },
        });
        gsap.utils.toArray<HTMLElement>("[data-hl]").forEach((el) => {
          gsap.from(el.querySelectorAll("[data-hl-anim]"), {
            autoAlpha: 0,
            x: -24,
            stagger: 0.08,
            duration: 1,
            scrollTrigger: { trigger: el, start: "top 78%", once: true },
          });
          gsap.from(el.querySelector("[data-hl-ring]"), {
            scale: 0.4,
            autoAlpha: 0,
            duration: 1,
            ease: "back.out(2)",
            scrollTrigger: { trigger: el, start: "top 78%", once: true },
          });
        });
      });
    },
    { scope: ref },
  );

  const o = t.overview;
  return (
    <section ref={ref} id="overview" className="section overflow-hidden bg-mist">
      <div aria-hidden="true" className="pointer-events-none -mt-[clamp(20px,4vw,60px)] overflow-hidden">
        <p data-marquee className="outline-text text-[clamp(90px,17vw,280px)] leading-none font-bold whitespace-nowrap uppercase">
          {o.marquee} · {o.marquee}
        </p>
      </div>

      <div className="wrap relative mt-[clamp(28px,4vw,56px)] grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <Heading eyebrow={o.eyebrow} light={o.light} bold={o.bold} size="display-md" />
          <p data-fade className="lede mt-10">
            {o.body} <b className="font-semibold text-blue-deep">{o.developer}</b>
          </p>
        </div>
        <figure data-clip className="relative aspect-[1339/1110] self-center mix-blend-multiply">
          <Image src={renders.sketch} alt="Prima Sky — architectural sketch" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-contain" />
        </figure>
      </div>

      {/* highlights — the brochure's icon spine */}
      <div className="wrap mt-[clamp(70px,10vw,140px)]">
        <ol data-highlights className="relative grid gap-x-16 md:grid-cols-2">
          <span data-spine aria-hidden="true" className="absolute top-10 bottom-10 left-[39px] w-px bg-gradient-to-b from-sky to-blue-deep md:hidden" />
          {o.highlights.map((h, i) => (
            <li key={i} data-hl className="relative flex items-center gap-6 border-b border-rule py-7">
              <span data-hl-ring className="relative grid h-20 w-20 shrink-0 place-items-center rounded-full border border-blue/40 bg-mist text-blue">
                <Icon name={h.icon} size={34} />
                <span className="absolute -right-1.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-blue" />
              </span>
              <span className="flex flex-col gap-1">
                <span data-hl-anim className="mono text-[11px] tracking-widest text-sky">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span data-hl-anim className="text-[15px] leading-snug font-medium text-ink/85 md:text-base">
                  {h.text}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* USP ribbon */}
      <div className="wrap mt-[clamp(60px,8vw,110px)]">
        <ul data-stagger className="grid grid-cols-2 border-y border-ink/15 sm:grid-cols-3 lg:grid-cols-5">
          {o.usps.map((u, i) => (
            <li key={i} className="border-ink/10 px-4 py-8 text-center [&:not(:last-child)]:border-r max-sm:[&:nth-child(2n)]:border-r-0 max-sm:[&:nth-child(-n+4)]:border-b">
              <span className="text-grad block text-[clamp(30px,3.6vw,52px)] leading-none font-bold">{u.v}</span>
              <span className="mt-3 block text-[13px] leading-snug font-medium tracking-wide text-blue-deep uppercase">{u.l}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
