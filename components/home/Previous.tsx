"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Header from "../Header";
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

            <ul data-stagger className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {previousProjects.map((proj) => {
                const lang = t.locale === "gu" ? "gu" : "en";
                return (
                  <li key={proj.name} className="group flex flex-col overflow-hidden border border-rule bg-white">
                    <a href={proj.brochure} target="_blank" rel="noopener" aria-label={`${p.view}: ${proj.name}`} className="relative block aspect-[4/3] overflow-hidden bg-paper-2">
                      <Image
                        src={proj.image}
                        alt={proj.name}
                        fill
                        sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                      />
                    </a>
                    <div className="flex flex-1 flex-col p-5">
                      <h2 className="text-[16px] font-semibold tracking-wide uppercase">{proj.name}</h2>
                      <p className="mt-2 text-[13px] text-ink/70">{proj.type[lang]}</p>
                      <p className="mt-1 mb-5 flex items-start gap-1.5 text-[12.5px] text-slate">
                        <Icon name="pin" size={14} className="mt-0.5 shrink-0" />
                        {proj.location[lang]}
                      </p>
                      <a
                        href={proj.brochure}
                        download={proj.downloadAs}
                        className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-rule pt-4 text-[13px] font-medium whitespace-nowrap text-blue-deep transition-colors hover:text-blue"
                      >
                        <span className="flex items-center gap-2">
                          <Icon name="download" size={15} />
                          {p.download}
                        </span>
                        <span className="mono text-[10.5px] font-normal text-slate">{proj.sizeMB} MB</span>
                      </a>
                    </div>
                  </li>
                );
              })}
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
