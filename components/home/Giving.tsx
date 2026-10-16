"use client";

import Link from "next/link";
import { useRef } from "react";
import Header from "../Header";
import Lotus from "../brand/Lotus";
import PrimaMark from "../brand/PrimaMark";
import SmoothScroll from "../motion/SmoothScroll";
import { useReveal } from "../motion/useReveal";
import Icon from "../ui/Icon";
import type { Dict } from "@/lib/i18n/en";
import { mailLink, telLink, waLink } from "@/lib/links";
import { contact } from "@/lib/project";
import { otherLocale, route } from "@/lib/routes";

/** Giving Back to Society: free property-buying guidance, booked over WhatsApp. */
export default function Giving({ t }: { t: Dict }) {
  const ref = useRef<HTMLElement>(null);
  const g = t.giving;
  const wa = waLink(t, g.whatsappMessage);
  useReveal(ref);

  return (
    <>
      <SmoothScroll />
      <Header
        t={t}
        nav={[{ href: route(t.locale, "home"), label: t.backHome }]}
        homeHref={route(t.locale, "home")}
        switchHref={route(otherLocale(t.locale), "giving")}
        waText={g.whatsappMessage}
        light
      />

      <main id="main">
        <section ref={ref} className="paper relative overflow-clip pt-[calc(var(--header-h)+clamp(36px,6vw,80px))] pb-[clamp(70px,10vw,130px)]">
          <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 w-[min(70vw,640px)] opacity-[0.07]">
            <Lotus tone="brand" className="w-full" />
          </div>

          <div className="wrap relative">
            <Link href={route(t.locale, "home")} data-fade className="mb-10 inline-flex items-center gap-2 text-[13px] font-medium text-ink/65 hover:text-blue">
              <Icon name="arrow" size={14} className="rotate-180" /> {t.backHome}
            </Link>
            <p data-fade className="eyebrow mb-5">
              {g.eyebrow}
            </p>
            <h1 data-split className="display display-md !font-semibold text-ink">
              {g.title}
            </h1>
            <p data-fade className="lede mt-6 max-w-[68ch]">
              {g.lede}
            </p>

            <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
              <div data-fade className="border border-rule bg-white p-[clamp(22px,3vw,36px)]">
                <h2 className="mb-5 text-[15px] font-semibold tracking-wide uppercase">{g.helpTitle}</h2>
                <ul className="grid gap-3.5">
                  {g.help.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink/80">
                      <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div data-fade className="border border-rule bg-white p-[clamp(22px,3vw,36px)]">
                <h2 className="mb-5 text-[15px] font-semibold tracking-wide uppercase">{g.howTitle}</h2>
                <ol className="grid gap-4">
                  {g.how.map((item, i) => (
                    <li key={item} className="flex gap-4 text-[15px] leading-relaxed text-ink/80">
                      <span className="mono mt-0.5 shrink-0 text-[12px] text-blue">{String(i + 1).padStart(2, "0")}</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* the way in: WhatsApp */}
            <div data-fade className="on-dark mt-6 grid grid-cols-[minmax(0,1fr)] items-center gap-8 bg-night p-[clamp(24px,4vw,48px)] text-white md:grid-cols-[minmax(0,1fr)_auto]">
              <div>
                <h2 className="text-[clamp(22px,2.4vw,32px)] font-semibold">{g.contactTitle}</h2>
                <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-white/75">{g.contactBody}</p>
                <a href={wa} target="_blank" rel="noopener" className="mt-5 inline-flex items-center gap-2.5 text-[clamp(20px,2vw,26px)] font-semibold tracking-wide text-white underline decoration-white/30 underline-offset-[6px] hover:decoration-white">
                  <Icon name="whatsapp" size={22} /> +91 {contact.phoneDisplay}
                </a>
              </div>
              <a href={wa} target="_blank" rel="noopener" className="btn btn-wa justify-center max-md:w-full">
                <Icon name="whatsapp" /> {t.cta.whatsapp}
              </a>
            </div>

            <div data-fade className="mt-10 max-w-[90ch] border-t border-ink/15 pt-6">
              <h2 className="mono mb-3 text-[11px] tracking-[0.16em] text-slate uppercase">{g.disclaimerTitle}</h2>
              <p className="text-[13px] leading-relaxed text-slate">{g.disclaimer}</p>
            </div>
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
