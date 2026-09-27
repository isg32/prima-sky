"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Heading from "../ui/Heading";
import Icon from "../ui/Icon";
import { useReveal } from "../motion/useReveal";
import type { Dict } from "@/lib/i18n/en";
import { renders, sitePlanSpots } from "@/lib/project";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

export default function Amenities({ t }: { t: Dict }) {
  const ref = useRef<HTMLElement>(null);
  const [spot, setSpot] = useState<number | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  // select a legend item; on phones, slide the plan so its marker is in view
  function pick(n: number) {
    setSpot(n);
    const el = scroller.current;
    const [x] = sitePlanSpots[n][0];
    if (el && el.scrollWidth > el.clientWidth) {
      el.scrollTo({ left: (x / 100) * el.scrollWidth - el.clientWidth / 2, behavior: "smooth" });
    }
  }
  const a = t.amenities;
  useReveal(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-amen]", {
          autoAlpha: 0,
          y: 30,
          scale: 0.92,
          stagger: { each: 0.05, grid: "auto", from: "start" },
          duration: 1,
          scrollTrigger: { trigger: "[data-amen-grid]", start: "top 80%", once: true },
        });
        gsap.from("[data-spot]", {
          scale: 0,
          stagger: 0.03,
          duration: 0.7,
          ease: "back.out(3)",
          scrollTrigger: { trigger: "[data-siteplan]", start: "top 70%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="amenities" className="on-dark relative overflow-clip text-white">
      <div className="grad-bg section">
        <div aria-hidden="true" className="pointer-events-none absolute -top-20 -right-40 w-[60vw] max-w-[900px] opacity-[0.07]">
          <svg viewBox="0 0 100 80" className="w-full" fill="#fff">
            <path d="M4 29 H16.5 C17.5 49 30 63 47.5 65 V76 C23 75 4.5 55 4 29Z M96 29 H83.5 C82.5 49 70 63 52.5 65 V76 C77 75 95.5 55 96 29Z" />
          </svg>
        </div>

        <div className="wrap relative grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-end">
          <Heading eyebrow={a.eyebrow} light={a.light} bold={a.bold} size="display-md" />
          <p data-fade className="lede">
            {a.body}
          </p>
        </div>

        <ul data-amen-grid className="wrap relative mt-16 grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-5">
          {a.items.map((it) => (
            <li key={it.icon} data-amen className="group flex flex-col gap-3 border-t border-white/20 py-5 pr-3 md:gap-4 md:py-6 md:pr-4">
              <Icon name={it.icon} size={40} strokeWidth={1.2} className="text-white transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:scale-110" />
              <span className="text-[14px] leading-snug font-medium">{it.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* renders */}
      <div className="grid md:grid-cols-2">
        {[renders.gardenWalk, renders.eventLawn].map((src, i) => (
          <figure key={src} className="relative aspect-[4/3] overflow-hidden">
            <div data-parallax="8" className="absolute -inset-y-[10%] inset-x-0">
              <Image src={src} alt={t.gallery.items[i === 0 ? 5 : 6].c} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
            </div>
            <figcaption className="absolute bottom-5 left-5 bg-night/60 px-3 py-2 text-[12px] font-semibold tracking-widest uppercase backdrop-blur">
              {t.gallery.items[i === 0 ? 5 : 6].t}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* interactive ground floor */}
      <div className="section bg-night">
        <div className="wrap mb-8 lg:hidden">
          <p className="eyebrow mb-3">{a.siteTitle}</p>
          <p className="text-[13px] text-white/60">{a.siteHint}</p>
        </div>
        <div className="wrap grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-12">
          {/* on phones the plan pins to the top while the legend scrolls beneath it */}
          <div className="sticky top-0 z-10 min-w-0 self-start bg-night pb-3 max-md:-mx-[var(--pad)] max-md:pt-3 lg:static lg:bg-transparent lg:pb-0">
            <div ref={scroller} className="overflow-x-auto scroll-smooth [scrollbar-width:none] md:overflow-visible [&::-webkit-scrollbar]:hidden">
              <div data-siteplan className="relative min-w-[680px] overflow-hidden bg-[#EAF0F3] md:min-w-0">
                <Image src="/plans/ground-floor.jpg" alt={a.siteTitle} width={3552} height={2549} sizes="(min-width:1024px) 60vw, 680px" className="h-auto w-full" />
                {Object.entries(sitePlanSpots).flatMap(([n, pts]) =>
                  pts.map(([x, y], k) => {
                    const on = spot === Number(n);
                    return (
                      <span
                        key={`${n}-${k}`}
                        data-spot
                        style={{ left: `${x}%`, top: `${y}%` }}
                        className={`pointer-events-none absolute grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-[10px] font-bold text-white transition-[background-color,transform] duration-300 md:h-7 md:w-7 ${
                          on ? "pulse z-10 scale-125 bg-ember text-ember" : "bg-blue"
                        }`}
                      >
                        <span className="text-white">{n}</span>
                      </span>
                    );
                  }),
                )}
              </div>
            </div>
            <p className="mono mt-3 flex items-center gap-2 px-[var(--pad)] text-[10px] tracking-[0.2em] text-white/50 uppercase md:hidden">
              <Icon name="arrow" size={14} /> {a.swipe}
            </p>
          </div>
          <div>
            <div className="max-lg:hidden">
              <p className="eyebrow mb-3">{a.siteTitle}</p>
              <p className="mb-6 text-[13px] text-white/60">{a.siteHint}</p>
            </div>
            <ol className="grid gap-x-6 sm:grid-cols-2 lg:grid-cols-1">
              {a.legend.map((l, i) => (
                <li key={l}>
                  <button
                    onMouseEnter={() => setSpot(i + 1)}
                    onMouseLeave={() => setSpot(null)}
                    onFocus={() => setSpot(i + 1)}
                    onBlur={() => setSpot(null)}
                    onClick={() => pick(i + 1)}
                    className={`flex w-full items-baseline gap-4 border-b border-white/10 py-3 text-left text-[14px] transition-colors md:py-2.5 ${spot === i + 1 ? "text-sky" : "text-white/85 hover:text-white"}`}
                  >
                    <span className="mono w-6 text-[11px] text-sky-soft">{String(i + 1).padStart(2, "0")}</span>
                    {l}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
