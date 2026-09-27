"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Heading from "../ui/Heading";
import Icon from "../ui/Icon";
import Lightbox, { type LightboxItem } from "../ui/Lightbox";
import KeyPlan from "../plans/KeyPlan";
import PlanSVG, { roomName } from "../plans/PlanSVG";
import { useReveal } from "../motion/useReveal";
import type { Dict } from "@/lib/i18n/en";
import { enquire } from "@/lib/links";
import { plans } from "@/lib/project";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

export default function Residences({ t }: { t: Dict }) {
  const ref = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);
  const [active, setActive] = useState<string | null>(null);
  const [box, setBox] = useState<{ items: LightboxItem[]; i: number } | null>(null);
  const r = t.residences;
  const plan = plans[idx];
  useReveal(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-sched] li", { autoAlpha: 0, x: 16, stagger: 0.035, duration: 0.8 });
        gsap.from("[data-tb] > *", { autoAlpha: 0, y: 8, stagger: 0.05, duration: 0.8 });
      });
    },
    { scope: ref, dependencies: [idx], revertOnUpdate: true },
  );

  const title = `${r.type} ${plan.type} · ${r.block} ${plan.block}`;
  const planLabel = `3 BHK | ${r.block}-${plan.block} | ${r.type}-${plan.type}`;
  const originals: LightboxItem[] = [
    ...plans.map((p) => ({ src: p.original, alt: `3 BHK ${r.block}-${p.block} ${r.type}-${p.type}`, title: `3 BHK | ${r.block}-${p.block} | ${r.type}-${p.type}` })),
    { src: "/plans/typical-floor.jpg", alt: r.typical, title: r.typical },
    { src: "/plans/ground-floor.jpg", alt: r.ground, title: r.ground },
  ];

  return (
    <section ref={ref} id="residences" className="section bg-mist">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <Heading eyebrow={r.eyebrow} light={r.light} bold={r.bold} size="display-md" tab />
          <p data-fade className="lede">
            {r.lede}
          </p>
        </div>

        {/* type tabs */}
        <div role="tablist" aria-label={r.bold} data-stagger className="mt-14 grid grid-cols-2 gap-2 md:grid-cols-4">
          {plans.map((p, i) => {
            const on = i === idx;
            return (
              <button
                key={p.type}
                role="tab"
                aria-selected={on}
                aria-controls="plan-panel"
                onClick={() => {
                  setIdx(i);
                  setActive(null);
                }}
                className={`group relative overflow-hidden border px-4 py-3.5 text-left transition-colors duration-500 md:px-5 md:py-4 ${
                  on ? "border-blue bg-blue text-white" : "border-rule bg-white hover:border-blue/60"
                }`}
              >
                <span className={`mono block text-[10px] tracking-[0.2em] uppercase ${on ? "text-white/75" : "text-slate"}`}>
                  {r.block} {p.block}
                  <span className="max-md:hidden"> · {p.units.join(" / ")}</span>
                </span>
                <span className="mt-1 block text-lg font-semibold tracking-wide uppercase">
                  {r.type} {p.type}
                </span>
              </button>
            );
          })}
        </div>

        <div id="plan-panel" role="tabpanel" aria-label={title} className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          {/* drawing sheet */}
          <div className="relative border border-rule bg-white p-[clamp(14px,3vw,36px)] max-md:-mx-[var(--pad)] max-md:border-x-0 max-md:px-3">
            {/* readout of the tapped room — plan labels are small on phones */}
            {(() => {
              const room = plan.rooms.find((x) => x.id === active);
              return (
                <div aria-live="polite" className="mb-3 flex min-h-[58px] items-center justify-between gap-3 border-b border-rule px-2 pb-3 md:hidden">
                  {room ? (
                    <>
                      <span className="text-[17px] font-semibold tracking-wide text-blue-deep uppercase">{roomName(room, r.rooms)}</span>
                      <span className="mono text-[17px] text-ink">{room.dim ?? "—"}</span>
                    </>
                  ) : (
                    <span className="flex items-center gap-2 text-[13px] text-slate">
                      <span className="pulse relative inline-block h-2 w-2 rounded-full bg-sky text-sky" />
                      {r.tapHint}
                    </span>
                  )}
                </div>
              );
            })()}
            <div className="mx-auto max-w-[620px]">
              <PlanSVG plan={plan} names={r.rooms} puja={r.puja} entry={r.entry} active={active} onActive={setActive} />
            </div>
            <div data-tb className="mono mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink pt-3 text-[10.5px] tracking-[0.12em] text-slate uppercase max-md:mx-2">
              <span>
                {r.config} — <b className="font-medium text-ink">{r.configValue}</b>
              </span>
              <span>
                {r.block} — <b className="font-medium text-ink">{plan.block}</b>
              </span>
              <span>
                {r.type} — <b className="font-medium text-ink">{plan.type}</b>
              </span>
              <span>
                {r.units} — <b className="font-medium text-ink">{plan.units.join(", ")}</b>
              </span>
            </div>
          </div>

          {/* info column */}
          <div className="flex flex-col gap-6">
            <div className="border border-rule bg-white p-5 md:p-6">
              <p className="eyebrow mb-4">{r.keyPlan}</p>
              <KeyPlan plan={plan} foyer={r.foyer} lift={r.lift} />
              <p className="mt-3 text-[13px] text-slate">{r.floors[plan.block]}</p>
            </div>

            <div className="border border-rule bg-white p-5 md:p-6">
              <h3 className="mb-4 flex items-baseline justify-between gap-4 text-[15px] font-semibold tracking-wide uppercase">
                {r.schedule}
                <span className="mono text-[10px] font-normal tracking-widest text-slate max-md:hidden">{planLabel}</span>
              </h3>
              <ul data-sched className="mono grid text-[12.5px] sm:grid-cols-2 sm:gap-x-8">
                {plan.rooms.map((room) => {
                  const on = active === room.id;
                  return (
                    <li
                      key={`${plan.type}-${room.id}`}
                      onMouseEnter={() => setActive(room.id)}
                      onMouseLeave={() => setActive(null)}
                      onClick={() => setActive(on ? null : room.id)}
                      className={`flex cursor-default justify-between gap-3 border-b border-rule py-2.5 transition-colors duration-300 md:py-2 ${on ? "text-blue" : ""}`}
                    >
                      <span className="font-sans font-medium">{roomName(room, r.rooms)}</span>
                      <span className={on ? "text-blue" : "text-slate"}>{room.dim ?? "—"}</span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
                <button onClick={() => setBox({ items: originals, i: idx })} className="btn btn-ghost justify-center !px-5 !py-3 text-ink">
                  <Icon name="expand" /> {r.viewOriginal}
                </button>
                <a href="#contact" onClick={() => enquire(t.contact.form.options[plan.type])} className="btn btn-primary justify-center !px-5 !py-3">
                  {t.cta.enquire}
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-5 max-w-[80ch] text-[12.5px] text-slate">{r.note}</p>

        {/* whole-floor sheets */}
        <div data-stagger className="mt-16 grid gap-6 md:grid-cols-2">
          {[
            { src: "/plans/typical-floor.jpg", t: r.typical, i: 4 },
            { src: "/plans/ground-floor.jpg", t: r.ground, i: 5 },
          ].map((s) => (
            <button key={s.src} onClick={() => setBox({ items: originals, i: s.i })} className="group text-left">
              <span className="relative block aspect-[1.45/1] overflow-hidden border border-rule bg-paper-2">
                <Image src={s.src} alt={s.t} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]" />
              </span>
              <span className="mt-4 flex items-center justify-between text-[15px] font-semibold tracking-wide uppercase">
                {s.t}
                <Icon name="arrowUpRight" size={22} className="text-blue transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </button>
          ))}
        </div>
      </div>

      <Lightbox items={box?.items ?? []} index={box ? box.i : null} onClose={() => setBox(null)} labels={t.lightbox} />
    </section>
  );
}
