"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Heading from "../ui/Heading";
import Icon from "../ui/Icon";
import { useReveal } from "../motion/useReveal";
import { scrollToId } from "../motion/SmoothScroll";
import type { Dict } from "@/lib/i18n/en";
import { enquire } from "@/lib/links";
import { feet, renders, shopArea, shops } from "@/lib/project";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

const maxDepth = Math.max(...shops.map((s) => feet(s.d)));

export default function Shops({ t }: { t: Dict }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(6);
  const s = t.shops;
  const shop = shops[active];
  useReveal(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: "[data-strip]", start: "top 80%", once: true } });
        tl.from("[data-road]", { scaleX: 0, transformOrigin: "left", duration: 1.4, ease: "expo.inOut" })
          .from("[data-bar]", { scaleY: 0, transformOrigin: "50% 100%", duration: 1.1, stagger: 0.05 }, 0.3)
          .from("[data-bar-no]", { autoAlpha: 0, y: 8, stagger: 0.04, duration: 0.6 }, 0.9);
        gsap.to("[data-dash]", { backgroundPositionX: "-200px", ease: "none", repeat: -1, duration: 6 });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="shops" className="section overflow-hidden bg-white">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <Heading eyebrow={s.eyebrow} light={s.light} bold={s.bold} size="display-md" tab />
          <p data-fade className="lede">
            {s.lede}
          </p>
        </div>

        <ul data-stagger className="mt-14 grid grid-cols-2 gap-px bg-rule md:grid-cols-4">
          {s.facts.map((f) => (
            <li key={f.l} className="bg-white py-6 pr-4">
              <span className="text-grad block text-[clamp(28px,3.4vw,46px)] leading-none font-bold">{f.v}</span>
              <span className="mt-2 block text-[12px] font-semibold tracking-[0.12em] text-slate uppercase">{f.l}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* the interactive frontage */}
      <div className="wrap mt-14">
        <div className="-mx-[var(--pad)] overflow-x-auto px-[var(--pad)] pb-4 [scrollbar-width:thin]">
          <div data-strip className="relative min-w-[880px]">
            <div className="flex h-[280px] items-end gap-[3px]">
              {shops.map((sh, i) => {
                const on = i === active;
                return (
                  <button
                    key={sh.no}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => {
                      setActive(i);
                      enquire(`${s.shop} ${sh.no}`);
                      scrollToId("contact");
                    }}
                    aria-label={`${s.shop} ${sh.no}, ${sh.w} × ${sh.d}, ≈ ${shopArea(sh)} ${s.sqft}. ${s.enquire}`}
                    style={{ flexGrow: feet(sh.w), flexBasis: 0, height: `${(feet(sh.d) / maxDepth) * 100}%` }}
                    className="group relative min-w-0 outline-none"
                  >
                    <span
                      data-bar
                      className={`absolute inset-0 border transition-colors duration-500 ${
                        on ? "border-blue-deep bg-[linear-gradient(180deg,var(--color-sky),var(--color-blue-deep))]" : "border-ink/25 bg-paper-2 group-hover:bg-paper"
                      }`}
                    />
                    <span data-bar-no className={`mono absolute inset-x-0 bottom-3 text-center text-[11px] font-medium ${on ? "text-white" : "text-ink/70"}`}>
                      {sh.no}
                    </span>
                  </button>
                );
              })}
            </div>
            {/* promenade + road */}
            <div data-road className="mt-[3px] h-5 bg-[#E4D9CF]" />
            <div data-road className="relative h-12 bg-[#8C9196]">
              <span data-dash className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-[linear-gradient(90deg,#fff_0_40px,transparent_40px_80px)] bg-[length:80px_3px]" />
              <span className="mono absolute right-4 bottom-1 text-[10px] tracking-widest text-white/80">18.00 M WIDE ROAD</span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div aria-live="polite" className="flex flex-col justify-between border border-rule bg-mist p-7">
            <div>
              <p className="eyebrow mb-3">{s.shop}</p>
              <p className="text-[clamp(48px,6vw,84px)] leading-none font-bold text-blue-deep">{shop.no}</p>
              <dl className="mono mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-[10px] tracking-widest text-slate uppercase">{s.size}</dt>
                  <dd className="mt-1 text-base text-ink">
                    {shop.w} × {shop.d}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] tracking-widest text-slate uppercase">{s.area}</dt>
                  <dd className="mt-1 text-base text-ink">
                    {shopArea(shop)} {s.sqft}
                  </dd>
                </div>
              </dl>
            </div>
            <a href="#contact" onClick={() => enquire(`${s.shop} ${shop.no}`)} className="btn btn-primary mt-8 self-start">
              {s.enquire} <Icon name="arrow" />
            </a>
          </div>
          <figure data-clip className="relative aspect-[16/10] overflow-hidden">
            <Image src={renders.frontElevation} alt={t.gallery.items[1].c} fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover object-bottom" />
          </figure>
        </div>
        <p className="mt-5 text-[12.5px] text-slate">{s.approx}</p>
      </div>
    </section>
  );
}
