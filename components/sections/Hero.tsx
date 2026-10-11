"use client";

import Image from "next/image";
import { useRef } from "react";
import Icon from "../ui/Icon";
import Lotus from "../brand/Lotus";
import type { Dict } from "@/lib/i18n/en";
import { projectName } from "@/lib/i18n/project";
import { brochureDownloadAs, brochureUrl, renders, residency } from "@/lib/project";
import type { ProjectKey } from "@/lib/routes";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";

export default function Hero({ t, project }: { t: Dict; project: ProjectKey }) {
  const ref = useRef<HTMLElement>(null);
  const sky = project === "sky";
  const h = sky ? t.hero : t.residency.hero;
  const name = `${projectName(t, project)} — ${sky ? t.brandSub : `${h.light} ${h.bold}`}`;
  const brochure = sky ? { href: brochureUrl, as: brochureDownloadAs } : { href: residency.plans, as: residency.plansDownloadAs };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create("[data-hero-title] > span", { type: "lines", mask: "lines", linesClass: "split-line" });
        const tl = gsap.timeline({ paused: true });
        tl.from("[data-hero-img]", { scale: 1.25, duration: 2.6, ease: "expo.out" })
          .from(split.lines, { yPercent: 115, duration: 1.4, stagger: 0.1 }, 0.1)
          .from("[data-hero-fade]", { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1.2 }, 0.45)
          .from("[data-fact]", { y: 24, autoAlpha: 0, stagger: 0.06, duration: 1 }, 0.7)
          .from("[data-dims-line]", { scaleX: 0, transformOrigin: "left", duration: 1.6, ease: "expo.inOut" }, 0.5);

        // counters in the facts strip
        gsap.utils.toArray<HTMLElement>("[data-hero-count]").forEach((el) => {
          const target = Number(el.dataset.heroCount);
          const o = { v: 0 };
          tl.to(o, { v: target, duration: 1.8, ease: "power3.out", onUpdate: () => (el.textContent = String(Math.round(o.v))) }, 0.8);
        });

        const play = () => tl.play();
        if (!document.querySelector("[data-intro-inner]")) play();
        window.addEventListener("prima:intro", play, { once: true });

        // scroll-away: image drifts, content lifts and fades
        gsap.to("[data-hero-img]", {
          yPercent: 18,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-content]", {
          y: -80,
          autoAlpha: 0.2,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "30% top", end: "bottom top", scrub: true },
        });

        return () => {
          window.removeEventListener("prima:intro", play);
          split.revert();
        };
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="top" className="on-dark relative isolate min-h-[100svh] overflow-hidden bg-night text-white">
      <div className="absolute inset-0 -z-10">
        <div data-hero-img className="absolute inset-0 will-change-transform">
          <Image
            src={sky ? renders.dusk : residency.hero}
            alt={sky ? t.meta.ogAlt : t.residency.meta.ogAlt}
            fill
            priority
            sizes="100vw"
            quality={85}
            className={`object-cover ${sky ? "object-[60%_40%]" : "object-[55%_30%]"}`}
          />
        </div>
        {/* the Residency render is a bright daytime sky: deepen it so the white type holds */}
        {!sky && <div className="absolute inset-0 bg-night/45" />}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,27,46,0.55)_0%,rgba(11,27,46,0.1)_35%,rgba(11,27,46,0.55)_65%,rgba(11,27,46,0.95)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_0%_100%,rgba(0,87,168,0.45),transparent_60%)]" />
      </div>

      <div data-hero-content className="wrap flex min-h-[100svh] flex-col justify-end pt-28 pb-7 md:pt-32 md:pb-14">
        {sky ? (
          <Image
            data-hero-fade
            src="/brand/logo.png"
            alt={name}
            width={1664}
            height={646}
            priority
            className="mb-7 h-12 w-auto self-start brightness-0 invert md:h-14"
          />
        ) : (
          // no artwork for Prima Residency yet: the lotus with its name set in the logo's style
          <p data-hero-fade className="mb-7 flex items-center gap-3 self-start" role="img" aria-label={name}>
            <Lotus tone="white" className="h-12 w-auto md:h-14" />
            <span className="text-[clamp(22px,2.6vw,30px)] leading-none font-bold tracking-[0.14em] uppercase" style={{ fontFamily: "var(--font-montserrat)" }}>
              Prima <span className="font-light">Residency</span>
            </span>
          </p>
        )}
        {h.eyebrow && (
          <p data-hero-fade className="eyebrow mb-6 !text-white/75">
            {h.eyebrow}
          </p>
        )}
        <h1 data-hero-title className="display !text-[clamp(42px,11.5vw,132px)] !leading-[0.95] gu:!leading-[1.25] md:!text-[clamp(40px,8.4vw,132px)]" aria-label={`${h.light} ${h.bold}`}>
          <span className="block" aria-hidden="true">
            {h.light}
          </span>
          <span className="block font-bold" aria-hidden="true">
            {h.bold}
          </span>
        </h1>
        {/* side by side only when the three CTAs fit on one line next to the copy */}
        <div className="mt-6 flex flex-col gap-6 md:mt-7 xl:flex-row xl:items-end xl:justify-between">
          <p data-hero-fade className="max-w-[46ch] text-[clamp(15px,1.3vw,18px)] leading-relaxed text-white/80">
            {h.sub}
          </p>
          <div data-hero-fade className="grid grid-cols-2 gap-3 md:flex md:flex-nowrap xl:shrink-0">
            <a href="#contact" className="btn btn-white justify-center max-md:!px-4">
              {t.cta.enquire} <Icon name="arrow" />
            </a>
            <a href={brochure.href} download={brochure.as} className="btn btn-ghost justify-center max-md:!px-4">
              <Icon name="download" />
              <span className="md:hidden">{t.cta.brochureShort}</span>
              <span className="max-md:hidden">{t.cta.brochure}</span>
            </a>
            <a href="#residences" className="btn btn-ghost col-span-2 justify-center max-md:!px-4">
              {t.nav[2].label}
            </a>
          </div>
        </div>

        {/* signature: the dimension strip */}
        <dl className="relative mt-8 grid grid-cols-3 md:mt-14 md:grid-cols-6">
          <span data-dims-line className="absolute inset-x-0 top-0 h-px bg-white/35" />
          {h.facts.map((f, i) => {
            const n = Number(f.v);
            return (
              <div
                key={f.k}
                data-fact
                className={`border-white/15 py-3.5 max-md:px-3 md:border-r md:px-5 md:py-5 md:first:pl-0 md:last:border-r-0 ${i % 3 === 0 ? "max-md:pl-0" : ""} ${i % 3 !== 2 ? "max-md:border-r" : ""} ${i < 3 ? "max-md:border-b" : ""}`}
              >
                <dt className="mono mb-1.5 text-[10px] tracking-[0.18em] text-sky-soft uppercase">{f.k}</dt>
                <dd className="flex flex-col text-[clamp(19px,1.9vw,28px)] font-semibold tracking-tight whitespace-nowrap md:block">
                  <span {...(Number.isFinite(n) && f.v.length <= 3 ? { "data-hero-count": n } : {})}>{f.v}</span>{" "}
                  <em className="mono text-[10px] font-normal tracking-wider text-white/65 not-italic uppercase md:text-[0.5em]">{f.em}</em>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>

      <div className="pointer-events-none absolute right-[var(--pad)] bottom-10 hidden flex-col items-center gap-3 text-white/60 lg:flex" aria-hidden="true">
        <span className="mono text-[10px] tracking-[0.3em] uppercase [writing-mode:vertical-rl]">{t.hero.scroll}</span>
        <span className="block h-14 w-px animate-[scroll-cue_2.4s_ease-in-out_infinite] bg-white/70" />
      </div>
    </section>
  );
}
