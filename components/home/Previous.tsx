"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Header from "../Header";
import Lotus from "../brand/Lotus";
import PrimaMark from "../brand/PrimaMark";
import SmoothScroll from "../motion/SmoothScroll";
import { useReveal } from "../motion/useReveal";
import Icon from "../ui/Icon";
import type { Dict } from "@/lib/i18n/en";
import { mailLink, telLink } from "@/lib/links";
import { previousProjects } from "@/lib/previous";
import { contact } from "@/lib/project";
import { otherLocale, route } from "@/lib/routes";

export default function Previous({ t }: { t: Dict }) {
  const ref = useRef<HTMLElement>(null);
  const p = t.previous;
  useReveal(ref);

  return (
    <>
      <SmoothScroll />
      <Header
        t={t}
        nav={[{ href: route(t.locale, "home"), label: t.backHome }]}
        homeHref={route(t.locale, "home")}
        switchHref={route(otherLocale(t.locale), "previous")}
        light
        waText={t.home.whatsappMessage}
      />

      <main id="main">
        <section ref={ref} className="paper min-h-[100svh] pt-[calc(var(--header-h)+clamp(36px,6vw,80px))] pb-[clamp(70px,10vw,130px)]">
          <div className="wrap">
            <Link href={route(t.locale, "home")} data-fade className="mb-10 inline-flex items-center gap-2 text-[13px] font-medium text-ink/65 hover:text-blue">
              <Icon name="arrow" size={14} className="rotate-180" /> {t.backHome}
            </Link>
            <p data-fade className="eyebrow mb-5">
              {p.eyebrow}
            </p>
            <h1 data-split className="display display-md !font-semibold text-ink">
              {p.title}
            </h1>
            <p data-fade className="mt-5 max-w-[56ch] text-[14px] text-ink/55">
              {p.note}
            </p>

            <ul data-stagger className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {previousProjects.map((proj, i) =>
                proj.name ? (
                  <li key={i} className="overflow-hidden border border-rule bg-white">
                    <div className="relative aspect-[4/3] bg-paper-2">
                      {proj.image ? (
                        <Image src={proj.image} alt={proj.name} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
                      ) : (
                        <Lotus className="absolute top-1/2 left-1/2 w-20 -translate-x-1/2 -translate-y-1/2 opacity-30" />
                      )}
                    </div>
                    <div className="p-5">
                      <h2 className="text-[16px] font-semibold tracking-wide uppercase">{proj.name}</h2>
                      <dl className="mono mt-3 grid gap-1 text-[12px] text-slate">
                        {proj.type && (
                          <div className="flex gap-2">
                            <dt>{p.type}:</dt>
                            <dd className="text-ink">{proj.type}</dd>
                          </div>
                        )}
                        {proj.location && (
                          <div className="flex gap-2">
                            <dt>{p.location}:</dt>
                            <dd className="text-ink">{proj.location}</dd>
                          </div>
                        )}
                      </dl>
                    </div>
                  </li>
                ) : (
                  <li key={i} className="flex aspect-[4/3] flex-col items-center justify-center gap-3 border border-dashed border-ink/20 bg-white/40 p-5 text-center sm:aspect-auto sm:min-h-[260px]">
                    <Lotus className="w-12 opacity-25" />
                    <span className="mono text-[11px] tracking-widest text-ink/45 uppercase">{p.tbd}</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </section>
      </main>

      <footer className="bg-night py-10 text-white">
        <div className="wrap flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <PrimaMark tone="white" className="text-[17px]" />
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-white/70">
            <a href={telLink} className="hover:text-white">
              {contact.phoneDisplay}
            </a>
            <a href={mailLink()} className="[overflow-wrap:anywhere] hover:text-white">
              {contact.email}
            </a>
          </div>
          <p className="mono text-[10.5px] tracking-[0.14em] text-white/45 uppercase">
            © {new Date().getFullYear()} {t.contact.rights}
          </p>
        </div>
      </footer>
    </>
  );
}
