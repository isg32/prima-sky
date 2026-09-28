"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Header from "../Header";
import Intro from "../Intro";
import StickyBar from "../StickyBar";
import Lotus from "../brand/Lotus";
import SmoothScroll, { scrollToId } from "../motion/SmoothScroll";
import Contact from "../sections/Contact";
import Icon from "../ui/Icon";
import type { Dict } from "@/lib/i18n/en";
import { enquire } from "@/lib/links";
import { organizationLd } from "@/lib/meta";
import { brochureUrl, renders } from "@/lib/project";
import { otherLocale, route } from "@/lib/routes";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";

export default function Home({ t }: { t: Dict }) {
  const ref = useRef<HTMLElement>(null);
  const h = t.home;
  const [first, ...rest] = h.title.split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create("[data-home-title] > span", { type: "lines", mask: "lines", linesClass: "split-line" });
        const tl = gsap.timeline({ paused: true });
        tl.from(split.lines, { yPercent: 115, duration: 1.4, stagger: 0.1 })
          .from("[data-home-fade]", { y: 24, autoAlpha: 0, stagger: 0.08, duration: 1.1 }, 0.2)
          .from("[data-card]", { clipPath: "inset(100% 0% 0% 0%)", duration: 1.5, stagger: 0.14, ease: "expo.inOut" }, 0.25)
          .from("[data-card-img]", { scale: 1.3, duration: 2.2, stagger: 0.14 }, 0.25)
          .from("[data-card-body] > *", { y: 30, autoAlpha: 0, stagger: 0.06, duration: 1 }, 0.9)
          .from("[data-aside] > *", { x: 20, autoAlpha: 0, stagger: 0.08, duration: 1 }, 1.1);

        const play = () => tl.play();
        if (!document.querySelector("[data-intro-inner]")) play();
        window.addEventListener("prima:intro", play, { once: true });

        // gentle tilt that follows the pointer (desktop only)
        const cards = gsap.utils.toArray<HTMLElement>("[data-tilt]");
        const cleanups = cards.map((card) => {
          const rx = gsap.quickTo(card, "rotationX", { duration: 0.8, ease: "power3" });
          const ry = gsap.quickTo(card, "rotationY", { duration: 0.8, ease: "power3" });
          const move = (e: PointerEvent) => {
            if (e.pointerType !== "mouse") return;
            const r = card.getBoundingClientRect();
            ry(((e.clientX - r.left) / r.width - 0.5) * 6);
            rx(-((e.clientY - r.top) / r.height - 0.5) * 6);
          };
          const leave = () => {
            rx(0);
            ry(0);
          };
          card.addEventListener("pointermove", move);
          card.addEventListener("pointerleave", leave);
          return () => {
            card.removeEventListener("pointermove", move);
            card.removeEventListener("pointerleave", leave);
          };
        });

        // the residency lotus breathes
        gsap.to("[data-breathe]", { scale: 1.06, rotate: 3, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1 });

        return () => {
          window.removeEventListener("prima:intro", play);
          cleanups.forEach((c) => c());
          split.revert();
        };
      });
    },
    { scope: ref },
  );

  const toContact = (interest: string) => {
    enquire(interest);
    scrollToId("contact");
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd(t)).replace(/</g, "\\u003c") }}
      />
      <SmoothScroll />
      <Intro line={h.intro} />
      <Header
        t={t}
        nav={h.nav}
        homeHref={route(t.locale, "home")}
        switchHref={route(otherLocale(t.locale), "home")}
        light
        waText={h.whatsappMessage}
      />

      <main id="main">
        <section ref={ref} id="projects" className="paper relative overflow-clip pt-[calc(var(--header-h)+clamp(40px,7vw,96px))] pb-[clamp(70px,10vw,140px)]">
          <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 w-[min(70vw,760px)] opacity-[0.07]">
            <Lotus tone="brand" className="w-full" />
          </div>

          <div className="wrap relative">
            <p data-home-fade className="eyebrow mb-6">
              {h.eyebrow}
            </p>
            <h1 data-home-title className="display !text-[clamp(44px,9vw,136px)] !leading-[0.92] text-ink" aria-label={h.title}>
              <span className="block" aria-hidden="true">
                {first}
              </span>
              <span className="block font-bold text-blue-deep" aria-hidden="true">
                {rest.join(" ")}
              </span>
            </h1>
            <p data-home-fade className="lede mt-6 md:mt-8">
              {h.lede}
            </p>

            <div className="mt-[clamp(40px,6vw,72px)] grid grid-cols-[minmax(0,1fr)] gap-5 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_190px] lg:gap-6 [perspective:1400px]">
              {/* Prima Sky */}
              <article data-tilt className="relative [transform-style:preserve-3d]">
                <div data-card className="group relative flex min-h-[560px] flex-col justify-end overflow-hidden bg-night text-white md:min-h-[640px]">
                  <div data-card-img className="absolute inset-0">
                    <Image
                      src={renders.dusk}
                      alt={t.meta.ogAlt}
                      fill
                      priority
                      sizes="(min-width: 768px) 45vw, 100vw"
                      className="object-cover object-[60%_center] transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,27,46,0.15)_0%,rgba(11,27,46,0.1)_35%,rgba(11,27,46,0.88)_78%,rgba(11,27,46,0.96)_100%)]" />

                  <div data-card-body className="relative flex flex-col gap-4 p-6 md:p-8">
                    <span className="mono text-[10.5px] tracking-[0.2em] text-sky-soft uppercase">{h.sky.type}</span>
                    <h2 className="text-[clamp(34px,4vw,54px)] leading-none font-bold tracking-wide uppercase">{h.sky.name}</h2>
                    <p className="flex items-center gap-2 text-[13px] text-white/75">
                      <Icon name="pin" size={16} /> {h.sky.place}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {h.sky.facts.map((f) => (
                        <li key={f} className="rounded-full border border-white/25 px-3 py-1 text-[12px] text-white/85">
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap">
                      <Link href={route(t.locale, "sky")} className="btn btn-white col-span-2 justify-center">
                        {h.sky.explore} <Icon name="arrow" />
                      </Link>
                      <button onClick={() => toContact(h.formOptions[0])} className="btn btn-ghost justify-center text-white max-sm:!px-3">
                        {h.sky.enquire}
                      </button>
                      <a href={brochureUrl} download="Prima-Sky-Brochure.pdf" className="btn btn-ghost justify-center text-white max-sm:!px-3">
                        <Icon name="download" /> <span className="sm:hidden">PDF</span>
                        <span className="max-sm:hidden">{h.sky.brochure}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </article>

              {/* Prima Residency — coming soon */}
              <article data-tilt className="relative [transform-style:preserve-3d]">
                <div data-card className="grad-bg relative flex min-h-[460px] flex-col justify-end overflow-hidden text-white md:min-h-[640px]">
                  <div data-card-img aria-hidden="true" className="absolute inset-0 opacity-[0.16] mix-blend-overlay" style={{ backgroundImage: "url(/brand/paper.jpg)", backgroundSize: "700px auto" }} />
                  <div aria-hidden="true" className="absolute top-[12%] left-1/2 w-[62%] max-w-[340px] -translate-x-1/2 opacity-25">
                    <div data-breathe>
                      <Lotus tone="white" className="w-full" />
                    </div>
                  </div>
                  <div data-card-body className="relative flex flex-col gap-4 p-6 md:p-8">
                    <span className="inline-flex items-center gap-2 self-start rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase backdrop-blur">
                      <span className="pulse relative inline-block h-1.5 w-1.5 rounded-full bg-white text-white" />
                      {h.residency.status}
                    </span>
                    <h2 className="text-[clamp(34px,4vw,54px)] leading-none font-bold tracking-wide uppercase">{h.residency.name}</h2>
                    <p className="max-w-[40ch] text-[14px] leading-relaxed text-white/85">{h.residency.blurb}</p>
                    <button onClick={() => toContact(h.formOptions[2])} className="btn btn-white mt-2 justify-center self-stretch sm:self-start">
                      {h.residency.enquire} <Icon name="arrow" />
                    </button>
                  </div>
                </div>
              </article>

              {/* Previous associated projects — deliberately understated */}
              <aside data-aside className="flex flex-col gap-2 md:col-span-2 lg:col-span-1 lg:justify-end lg:pb-2">
                <Link
                  href={route(t.locale, "previous")}
                  className="group inline-flex items-center gap-2 self-start rounded-full border border-ink/20 px-3.5 py-2 text-[12px] font-medium text-ink/70 transition-colors hover:border-blue hover:text-blue"
                >
                  {h.previous.cta}
                  <Icon name="arrow" size={14} className="transition-transform duration-500 group-hover:translate-x-0.5" />
                </Link>
                <p className="max-w-[34ch] pl-1 text-[11px] leading-snug text-ink/45">{h.previous.note}</p>
              </aside>
            </div>
          </div>
        </section>

        <Contact t={t} options={h.formOptions} brochure={false} footerMark="prima" waText={h.whatsappMessage} eyebrow={h.nav[1].label} />
      </main>
      <StickyBar t={t} waText={h.whatsappMessage} />
    </>
  );
}
