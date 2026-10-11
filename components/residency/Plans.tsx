"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Heading from "../ui/Heading";
import Icon from "../ui/Icon";
import Lightbox from "../ui/Lightbox";
import { useReveal } from "../motion/useReveal";
import type { Dict } from "@/lib/i18n/en";
import { enquire } from "@/lib/links";
import { residency } from "@/lib/project";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/** The architect's plan sheets, one tab per floor, with the sizes marked on each. */
export default function Plans({ t }: { t: Dict }) {
  const ref = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);
  const [box, setBox] = useState<number | null>(null);
  const p = t.residency.plans;
  const sheet = p.sheets[idx];
  useReveal(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-sched] li", { autoAlpha: 0, x: 16, stagger: 0.035, duration: 0.8 });
        gsap.from("[data-sheet]", { autoAlpha: 0, scale: 0.98, duration: 0.9 });
      });
    },
    { scope: ref, dependencies: [idx], revertOnUpdate: true },
  );

  const items = residency.sheets.map((src, i) => ({ src, alt: `${p.sheets[i].t} — ${p.sheets[i].s}`, title: `${p.sheets[i].t} · ${p.sheets[i].s}` }));

  return (
    <section ref={ref} id="residences" className="section bg-mist">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <Heading eyebrow={p.eyebrow} light={p.light} bold={p.bold} size="display-md" tab />
          <p data-fade className="lede">
            {p.lede}
          </p>
        </div>

        <div role="tablist" aria-label={p.bold} data-stagger className="mt-14 grid grid-cols-2 gap-2 md:grid-cols-4">
          {p.sheets.map((s, i) => {
            const on = i === idx;
            return (
              <button
                key={s.t}
                role="tab"
                aria-selected={on}
                aria-controls="sheet-panel"
                onClick={() => setIdx(i)}
                className={`border px-4 py-3.5 text-left transition-colors duration-500 md:px-5 md:py-4 ${on ? "border-blue bg-blue text-white" : "border-rule bg-white hover:border-blue/60"}`}
              >
                <span className={`mono block text-[10px] tracking-[0.16em] uppercase gu:tracking-normal ${on ? "text-white/75" : "text-slate"}`}>{s.s}</span>
                <span className="mt-1 block text-lg font-semibold tracking-wide uppercase gu:tracking-normal">{s.t}</span>
              </button>
            );
          })}
        </div>

        <div id="sheet-panel" role="tabpanel" aria-label={`${sheet.t} — ${sheet.s}`} className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <button data-sheet onClick={() => setBox(idx)} aria-label={`${p.view}: ${sheet.t}`} className="group relative block border border-rule bg-white p-[clamp(10px,2vw,24px)] max-md:-mx-[var(--pad)] max-md:border-x-0">
            <span className="relative block aspect-square">
              <Image src={residency.sheets[idx]} alt={items[idx].alt} fill sizes="(min-width:1024px) 55vw, 100vw" className="object-contain" />
            </span>
            <span className="absolute right-4 bottom-4 grid h-11 w-11 place-items-center rounded-full bg-blue text-white shadow-lg transition-transform duration-500 group-hover:scale-110">
              <Icon name="expand" size={18} />
            </span>
          </button>

          <div className="border border-rule bg-white p-5 md:p-6">
            <h3 className="mb-4 flex items-baseline justify-between gap-4 text-[15px] font-semibold tracking-wide uppercase gu:tracking-normal">
              {p.schedule}
              <span className="mono text-[10px] font-normal tracking-widest text-slate">{sheet.t}</span>
            </h3>
            <ul data-sched className="mono text-[12.5px]">
              {sheet.rooms.map(([name, dim], i) => (
                <li key={`${idx}-${i}`} className="flex justify-between gap-3 border-b border-rule py-2.5 md:py-2">
                  <span className="font-sans font-medium">{name}</span>
                  <span className="text-right text-slate">{dim}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
              <button onClick={() => setBox(idx)} className="btn btn-ghost justify-center !px-5 !py-3">
                <Icon name="expand" /> {p.view}
              </button>
              <a href="#contact" onClick={() => enquire(t.residency.contact.options[[0, 1, 1, 2][idx]])} className="btn btn-primary justify-center !px-5 !py-3">
                {t.cta.enquire}
              </a>
            </div>
            <a href={residency.plans} download={residency.plansDownloadAs} className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-blue-deep underline decoration-blue/30 underline-offset-4 hover:text-blue">
              <Icon name="download" size={15} /> {p.download}
              <span className="mono text-[10.5px] font-normal text-slate no-underline">{t.residency.contact.brochure.size}</span>
            </a>
          </div>
        </div>
        <p className="mt-5 max-w-[80ch] text-[12.5px] text-slate">{p.note}</p>
      </div>

      <Lightbox items={items} index={box} onClose={() => setBox(null)} labels={t.lightbox} />
    </section>
  );
}
