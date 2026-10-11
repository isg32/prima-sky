"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Header from "../Header";
import Intro from "../Intro";
import PrimaMark from "../brand/PrimaMark";
import SmoothScroll from "../motion/SmoothScroll";
import Icon from "../ui/Icon";
import type { Dict } from "@/lib/i18n/en";
import { projectName } from "@/lib/i18n/project";
import { mailLink, telLink } from "@/lib/links";
import { organizationLd } from "@/lib/meta";
import { contact, renders, residency } from "@/lib/project";
import { otherLocale, route, type ProjectKey } from "@/lib/routes";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";

const CARDS: { key: ProjectKey; image: string; position: string }[] = [
  { key: "sky", image: renders.dusk, position: "object-[60%_40%]" },
  { key: "residency", image: residency.hero, position: "object-[55%_30%]" },
];

/** Front page: the same opening as a project page, then a choice between the two projects. */
export default function Home({ t }: { t: Dict }) {
  const ref = useRef<HTMLElement>(null);
  const h = t.home;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create("[data-home-title] > span", { type: "lines", mask: "lines", linesClass: "split-line" });
        const tl = gsap.timeline({ paused: true });
        tl.from("[data-home-bg]", { scale: 1.25, duration: 2.6, ease: "expo.out" })
          .from(split.lines, { yPercent: 115, duration: 1.4, stagger: 0.1 }, 0.1)
          .from("[data-home-fade]", { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1.2 }, 0.45)
          .from("[data-card]", { clipPath: "inset(100% 0% 0% 0%)", duration: 1.5, stagger: 0.14, ease: "expo.inOut" }, 0.35)
          .from("[data-card-img]", { scale: 1.3, duration: 2.2, stagger: 0.14 }, 0.35)
          .from("[data-card-body] > *", { y: 30, autoAlpha: 0, stagger: 0.06, duration: 1 }, 1)
          .from("[data-home-previous]", { y: 20, autoAlpha: 0, duration: 1 }, 1.3);

        const play = () => tl.play();
        if (!document.querySelector("[data-intro-inner]")) play();
        window.addEventListener("prima:intro", play, { once: true });

        // the backdrop drifts as the cards scroll up (phones stack them)
        gsap.to("[data-home-bg]", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });

        // gentle tilt that follows the pointer (mouse only)
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

        return () => {
          window.removeEventListener("prima:intro", play);
          cleanups.forEach((c) => c());
          split.revert();
        };
      });
    },
    { scope: ref },
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd(t)).replace(/</g, "\\u003c") }}
      />
      <SmoothScroll />
      <Intro line={t.intro} />
      <Header
        t={t}
        nav={[
          ...CARDS.map((c) => ({ href: route(t.locale, c.key), label: projectName(t, c.key) })),
          { href: route(t.locale, "previous"), label: t.previousLink.cta },
        ]}
        homeHref={route(t.locale, "home")}
        switchHref={route(otherLocale(t.locale), "home")}
      />

      <main id="main">
        <section ref={ref} id="top" className="on-dark relative isolate min-h-[100svh] overflow-hidden bg-night text-white">
          <div className="absolute inset-0 -z-10">
            <div data-home-bg className="absolute inset-0 opacity-40 will-change-transform">
              <Image src={renders.aerialCorner} alt="" fill priority sizes="100vw" className="object-cover" />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,27,46,0.7)_0%,rgba(11,27,46,0.45)_35%,rgba(11,27,46,0.85)_75%,rgba(11,27,46,1)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_0%_100%,rgba(0,87,168,0.45),transparent_60%)]" />
          </div>

          <div className="wrap flex min-h-[100svh] flex-col justify-end pt-[calc(var(--header-h)+clamp(32px,4vw,56px))] pb-10 md:pb-12">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)] lg:items-end">
              <div>
                <p data-home-fade className="eyebrow mb-6 !text-white/75">
                  {t.developerName}
                </p>
                <h1 data-home-title className="display !text-[clamp(38px,5.4vw,80px)] !leading-[0.95] gu:!leading-[1.25]" aria-label={`${h.light} ${h.bold}`}>
                  <span className="block" aria-hidden="true">
                    {h.light}
                  </span>
                  <span className="block font-bold" aria-hidden="true">
                    {h.bold}
                  </span>
                </h1>
              </div>
              <p data-home-fade className="max-w-[46ch] text-[clamp(15px,1.3vw,18px)] leading-relaxed text-white/80 lg:pb-2">
                {h.lede}
              </p>
            </div>

            <ul className="mt-[clamp(28px,3.5vw,44px)] grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2 md:gap-5 [perspective:1400px]">
              {CARDS.map((c, i) => {
                const name = projectName(t, c.key);
                const [first, ...rest] = name.split(" ");
                return (
                  <li key={c.key} data-tilt className="[transform-style:preserve-3d]">
                    <Link href={route(t.locale, c.key)} className="group block">
                      <div data-card className="relative flex min-h-[clamp(320px,44svh,500px)] flex-col justify-end overflow-hidden bg-night-2">
                        <div data-card-img className="absolute inset-0">
                          <Image
                            src={c.image}
                            alt=""
                            fill
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className={`object-cover ${c.position} transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]`}
                          />
                        </div>
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,27,46,0.35)_0%,rgba(11,27,46,0)_30%,rgba(11,27,46,0.55)_60%,rgba(11,27,46,0.95)_100%)]" />
                        <span className="mono absolute top-5 left-6 text-[11px] tracking-[0.2em] text-white/70 md:top-7 md:left-8">
                          {String(i + 1).padStart(2, "0")}
                        </span>

                        <div data-card-body className="relative flex flex-col gap-3 p-6 md:p-8">
                          <span className="mono text-[10.5px] tracking-[0.2em] text-sky-soft uppercase">{c.key === "residency" ? h.residencyTag : t.brandSub}</span>
                          <h2 className="text-[clamp(32px,3.6vw,52px)] leading-[0.95] tracking-wide uppercase gu:leading-[1.25] gu:tracking-normal">
                            <span className="font-light">{first}</span> <span className="font-bold">{rest.join(" ")}</span>
                          </h2>
                          {c.key === "sky" && (
                            <p className="flex items-center gap-2 text-[13px] text-white/75">
                              <Icon name="pin" size={16} /> {t.hero.eyebrow}
                            </p>
                          )}
                          {/* the entrance tween moves this wrapper: .btn's own transform transition would leave it stuck mid-way */}
                          <div className="mt-2">
                            <span className="btn btn-white">
                              {h.explore} <span className="sr-only">{name}</span>
                              <Icon name="arrow" className="transition-transform duration-500 group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div data-home-previous className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <Link href={route(t.locale, "previous")} className="btn btn-ghost self-start !px-5 !py-3 !text-[12px] max-sm:!whitespace-normal">
                {t.previousLink.cta} <Icon name="arrow" />
              </Link>
              <p className="max-w-[44ch] text-[12px] leading-snug text-white/50">{t.previousLink.note}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-night pb-10 text-white">
        <div className="wrap flex flex-col gap-6 border-t border-white/15 pt-8 md:flex-row md:items-center md:justify-between">
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
