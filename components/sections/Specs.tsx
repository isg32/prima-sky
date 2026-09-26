"use client";

import Image from "next/image";
import { useRef } from "react";
import Heading from "../ui/Heading";
import Icon from "../ui/Icon";
import { useReveal } from "../motion/useReveal";
import type { Dict } from "@/lib/i18n/en";
import { renders } from "@/lib/project";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

export default function Specs({ t }: { t: Dict }) {
  const ref = useRef<HTMLElement>(null);
  const s = t.specs;
  useReveal(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>("[data-spec]").forEach((row, i) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 85%", once: true } });
          tl.from(row.querySelector("[data-spec-line]"), { scaleX: 0, transformOrigin: i % 2 ? "right" : "left", duration: 1.3, ease: "expo.inOut" })
            .from(row.querySelector("[data-spec-icon]"), { scale: 0.5, autoAlpha: 0, rotate: -20, duration: 0.9, ease: "back.out(2)" }, 0.2)
            .from(row.querySelectorAll("[data-spec-text]"), { autoAlpha: 0, x: i % 2 ? 20 : -20, stagger: 0.08, duration: 0.9 }, 0.3);
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="specifications" className="section paper">
      <div className="wrap grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Heading eyebrow={s.eyebrow} light={s.light} bold={s.bold} size="display-md" tab />
          <p data-fade className="lede mt-8">
            {s.lede}
          </p>
          <figure data-clip className="relative mt-10 hidden aspect-[4/3] overflow-hidden lg:block">
            <Image src={renders.dusk} alt={t.meta.ogAlt} fill sizes="35vw" className="object-cover" />
          </figure>
        </div>

        <ol className="flex flex-col">
          {s.items.map((it, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={it.t} data-spec className={`relative grid items-start gap-6 py-7 ${flip ? "grid-cols-[64px_1fr] md:grid-cols-[1fr_80px] md:text-right" : "grid-cols-[64px_1fr] md:grid-cols-[80px_1fr]"}`}>
                <span data-spec-line className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-blue-deep to-sky" />
                <span data-spec-icon className={`grid h-16 w-16 place-items-center rounded-full bg-white text-blue shadow-[0_8px_30px_-10px_rgba(0,87,168,0.35)] md:h-20 md:w-20 ${flip ? "md:order-2" : ""}`}>
                  <Icon name={it.icon} size={34} strokeWidth={1.3} />
                </span>
                <div className={flip ? "md:order-1" : ""}>
                  <h3 data-spec-text className="text-[15px] font-bold tracking-[0.14em] text-ink uppercase">
                    <span className="mono mr-3 text-[11px] font-normal text-blue">{String(i + 1).padStart(2, "0")}</span>
                    {it.t}
                  </h3>
                  <p data-spec-text className="mt-2 text-[15px] leading-relaxed text-ink/75">
                    {it.b}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
