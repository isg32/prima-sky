"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Heading from "../ui/Heading";
import Icon from "../ui/Icon";
import Lightbox from "../ui/Lightbox";
import { useReveal } from "../motion/useReveal";
import type { Dict } from "@/lib/i18n/en";
import { renders } from "@/lib/project";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

const SHAPES = ["aspect-[4/3]", "aspect-[4/5]", "aspect-[1/1]"];

export default function Gallery({ t }: { t: Dict }) {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  useReveal(ref);

  const items = t.gallery.items.map((g) => ({
    src: renders[g.src as keyof typeof renders],
    alt: `${g.t} — ${g.c}`,
    title: g.t,
    caption: g.c,
  }));

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MOTION_OK} and (min-width: 900px)`, () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: "[data-pin]",
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (s) => gsap.set("[data-progress]", { scaleX: s.progress }),
          },
        });
        // each render pans inside its frame against the track's motion
        gsap.utils.toArray<HTMLElement>("[data-pan]").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
            },
          );
        });
        gsap.utils.toArray<HTMLElement>("[data-card]").forEach((card) => {
          gsap.from(card, {
            clipPath: "inset(12% 0% 12% 0%)",
            ease: "none",
            scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 100%", end: "left 55%", scrub: true },
          });
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="gallery" className="paper relative scroll-mt-0">
      <div className="wrap pt-[clamp(80px,12vw,160px)] pb-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Heading eyebrow={t.gallery.eyebrow} light={t.gallery.light} bold={t.gallery.bold} size="display-md" tab />
          <p data-fade className="lede md:max-w-[36ch] md:text-right">
            {t.gallery.lede}
          </p>
        </div>
      </div>

      <div data-pin className="relative overflow-hidden md:flex md:h-[100svh] md:items-center">
        <div
          ref={track}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--pad)] pb-6 [scrollbar-width:none] md:gap-6 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {items.map((it, i) => (
            <figure key={it.src} className="group relative shrink-0 snap-center">
              <button
                data-card
                onClick={() => setOpen(i)}
                className={`relative block w-[78vw] cursor-zoom-in overflow-hidden bg-paper-2 md:h-[58svh] md:w-auto ${SHAPES[i % SHAPES.length]}`}
                aria-label={`${t.lightbox.open}: ${it.title}`}
              >
                <span data-pan className="absolute inset-y-0 -inset-x-[10%] block">
                  <Image src={it.src} alt={it.alt} fill sizes="(min-width: 900px) 46vw, 80vw" className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]" />
                </span>
                <span className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-white/85 text-blue-deep opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <Icon name="expand" size={18} />
                </span>
              </button>
              <figcaption className="mt-4 flex items-baseline gap-4">
                <span className="mono text-[11px] tracking-widest text-blue">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block text-[15px] font-semibold tracking-wide uppercase">{it.title}</span>
                  <span className="mt-1 block max-w-[40ch] text-[13px] leading-snug text-ink/65">{it.caption}</span>
                </span>
              </figcaption>
            </figure>
          ))}
          <div className="hidden w-[10vw] shrink-0 md:block" aria-hidden="true" />
        </div>
        <div className="absolute inset-x-[var(--pad)] bottom-6 hidden items-center gap-4 md:flex" aria-hidden="true">
          <span className="mono text-[10px] tracking-[0.25em] text-ink/60 uppercase">{t.gallery.drag}</span>
          <span className="relative h-px flex-1 bg-ink/15">
            <span data-progress className="absolute inset-0 origin-left scale-x-0 bg-blue" />
          </span>
        </div>
      </div>
      <div className="h-[clamp(40px,6vw,80px)]" />

      <Lightbox items={items} index={open} onClose={() => setOpen(null)} labels={t.lightbox} />
    </section>
  );
}
