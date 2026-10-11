"use client";

import { useRef } from "react";
import Heading from "../ui/Heading";
import Icon from "../ui/Icon";
import { useReveal } from "../motion/useReveal";
import type { Dict } from "@/lib/i18n/en";
import { residency } from "@/lib/project";

/** Prima Residency's pin at Ognaj, with a live map. */
export default function Location({ t }: { t: Dict }) {
  const ref = useRef<HTMLElement>(null);
  const l = t.residency.location;
  useReveal(ref);

  return (
    <section ref={ref} id="location" className="section bg-white">
      <div className="wrap grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
        <div>
          <Heading eyebrow={l.eyebrow} light={l.light} bold={l.bold} size="display-md" tab />
          <p data-fade className="lede mt-6">
            {l.lede}
          </p>
          <a data-fade href={residency.mapsUrl} target="_blank" rel="noopener" className="btn btn-ghost mt-8">
            <Icon name="map" /> {l.maps}
          </a>
        </div>
        <figure data-clip className="relative aspect-[4/3] overflow-hidden border border-rule bg-paper-2">
          <iframe
            src={residency.embedUrl}
            title={l.mapTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
          />
        </figure>
      </div>
    </section>
  );
}
