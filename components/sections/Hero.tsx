"use client";

import Image from "next/image";
import { useRef } from "react";
import Icon from "../ui/Icon";
import type { Dict } from "@/lib/i18n/en";
import { renders } from "@/lib/project";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";

export default function Hero({ t }: { t: Dict }) {
  const ref = useRef<HTMLElement>(null);

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
            src={renders.dusk}
            alt={t.meta.ogAlt}
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover object-[60%_40%]"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,27,46,0.55)_0%,rgba(11,27,46,0.1)_35%,rgba(11,27,46,0.55)_65%,rgba(11,27,46,0.95)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_0%_100%,rgba(0,87,168,0.45),transparent_60%)]" />
      </div>

      <div data-hero-content className="wrap flex min-h-[100svh] flex-col justify-end pt-28 pb-7 md:pt-32 md:pb-14">
        <Image
          data-hero-fade
          src="/brand/logo.png"
          alt="Prima Sky — 3 BHK Homes & Shops"
          width={1664}
          height={646}
          priority
          className="mb-3 h-12 w-auto self-start brightness-0 invert md:h-14"
        />
        <p data-hero-fade className="mb-7 self-start rounded-full border border-white/25 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-white/85 uppercase">
          {t.hero.projects}
        </p>
        <p data-hero-fade className="eyebrow mb-6 !text-white/75">
          {t.hero.eyebrow}
        </p>
        <h1 data-hero-title className="display !text-[clamp(42px,11.5vw,132px)] !leading-[0.95] md:!text-[clamp(40px,8.4vw,132px)]" aria-label={`${t.hero.light} ${t.hero.bold}`}>
          <span className="block" aria-hidden="true">
            {t.hero.light}
          </span>
          <span className="block font-bold" aria-hidden="true">
            {t.hero.bold}
          </span>
        </h1>
        <div className="mt-6 flex flex-col gap-6 md:mt-7 md:flex-row md:items-end md:justify-between">
          <p data-hero-fade className="max-w-[46ch] text-[clamp(15px,1.3vw,18px)] leading-relaxed text-white/80">
            {t.hero.sub}
          </p>
          <div data-hero-fade className="grid grid-cols-2 gap-3 md:flex md:flex-wrap">
            <a href="#contact" className="btn btn-white justify-center max-md:!px-4">
              {t.cta.enquire} <Icon name="arrow" />
            </a>
            <a href="#residences" className="btn btn-ghost justify-center text-white max-md:!px-4">
              {t.nav[2].label}
            </a>
          </div>
        </div>

        {/* signature: the dimension strip */}
        <dl className="relative mt-8 grid grid-cols-3 md:mt-14 md:grid-cols-6">
          <span data-dims-line className="absolute inset-x-0 top-0 h-px bg-white/35" />
          {t.hero.facts.map((f, i) => {
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
