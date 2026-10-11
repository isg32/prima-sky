"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Heading from "../ui/Heading";
import Lightbox from "../ui/Lightbox";
import { useReveal } from "../motion/useReveal";
import type { Dict } from "@/lib/i18n/en";
import { residency } from "@/lib/project";

/** Prima Residency at a glance: key facts from the architect's plans beside the renders. */
export default function Overview({ t }: { t: Dict }) {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const o = t.residency.overview;
  useReveal(ref);

  const items = residency.images.map((src, i) => ({ src, alt: o.alts[i], title: o.alts[i] }));
  const [main, ...thumbs] = items;

  return (
    <section ref={ref} id="overview" className="section paper">
      <div className="wrap grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
        <div>
          <Heading eyebrow={o.eyebrow} light={o.light} bold={o.bold} size="display-md" tab />
          <p data-fade className="lede mt-6">
            {o.lede}
          </p>

          <dl data-stagger className="mt-10 grid grid-cols-2 border-t border-ink/15 sm:grid-cols-3">
            {o.facts.map((f) => (
              <div key={f.k} className="border-b border-ink/15 py-4 pr-3">
                <dt className="mono mb-1.5 text-[10px] tracking-[0.16em] text-slate uppercase gu:tracking-normal">{f.k}</dt>
                <dd className="text-[clamp(17px,1.6vw,22px)] font-semibold tracking-tight whitespace-nowrap">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <div className="grid grid-cols-3 gap-3">
            <button data-clip onClick={() => setOpen(0)} aria-label={`${t.lightbox.open}: ${main.alt}`} className="group relative col-span-3 aspect-[4/3] overflow-hidden bg-paper-2">
              <Image src={main.src} alt={main.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]" />
            </button>
            {thumbs.map((img, i) => (
              <button key={img.src} data-clip onClick={() => setOpen(i + 1)} aria-label={`${t.lightbox.open}: ${img.alt}`} className="group relative aspect-square overflow-hidden bg-paper-2">
                <Image src={img.src} alt={img.alt} fill sizes="(min-width:1024px) 17vw, 33vw" className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]" />
              </button>
            ))}
          </div>
          <p className="mt-4 text-[12px] text-slate">{o.note}</p>
        </div>
      </div>

      <Lightbox items={items} index={open} onClose={() => setOpen(null)} labels={t.lightbox} />
    </section>
  );
}
