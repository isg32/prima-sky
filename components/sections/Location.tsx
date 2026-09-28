"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Heading from "../ui/Heading";
import Icon from "../ui/Icon";
import { useReveal } from "../motion/useReveal";
import type { Dict } from "@/lib/i18n/en";
import { contact } from "@/lib/project";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";


export default function Location({ t }: { t: Dict }) {
  const ref = useRef<HTMLElement>(null);
  const [cat, setCat] = useState(0);
  const l = t.location;
  useReveal(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-dist] li", { autoAlpha: 0, y: 14, stagger: 0.06, duration: 0.8 });
        gsap.from("[data-dist] i", { scaleX: 0, transformOrigin: "left", stagger: 0.06, duration: 1.2, ease: "expo.inOut" });
      });
    },
    { scope: ref, dependencies: [cat], revertOnUpdate: true },
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo("[data-map] img", { scale: 1.25 }, { scale: 1, ease: "none", scrollTrigger: { trigger: "[data-map]", start: "top bottom", end: "bottom top", scrub: true } });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="location" className="section bg-mist">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <Heading eyebrow={l.eyebrow} light={l.light} bold={l.bold} size="display-md" tab />
          <div data-fade>
            <p className="lede">{l.lede}</p>
            <a href={contact.mapsUrl} target="_blank" rel="noopener" className="btn btn-ghost mt-6">
              <Icon name="map" /> {l.maps}
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <figure data-map data-clip className="relative aspect-[1.33/1] overflow-hidden border border-rule bg-white">
            <Image src="/brand/location-map.jpg" alt={l.lede} fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
            {/* site marker over the brochure's red plot */}
            <span className="pulse absolute top-[39%] left-[15.5%] z-10 grid h-4 w-4 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-blue text-blue ring-4 ring-white" />
            <span className="absolute top-[31%] left-[17%] z-10 bg-blue-deep px-2.5 py-1 text-[10px] font-bold tracking-widest text-white uppercase shadow-lg">
              Prima Sky
            </span>
          </figure>

          <div>
            <div role="tablist" className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {l.categories.map((c, i) => (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={i === cat}
                  onClick={() => setCat(i)}
                  className={`border px-3 py-3 text-[12px] font-semibold tracking-[0.1em] uppercase transition-colors duration-500 ${
                    i === cat ? "border-blue bg-blue text-white" : "border-rule bg-white text-ink hover:border-blue/60"
                  }`}
                >
                  {c.t}
                </button>
              ))}
            </div>
            <ul data-dist role="tabpanel" className="mono mt-6 text-[13.5px]">
              {l.categories[cat].items.map(([name, time, dist]) => (
                <li key={name} className="leader">
                  <b className="font-sans text-[14.5px] font-medium">{name}</b>
                  <i />
                  <span className="whitespace-nowrap text-blue">{time}</span>
                  {dist && <span className="w-16 text-right whitespace-nowrap text-slate">{dist}</span>}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[12.5px] text-slate">{l.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
