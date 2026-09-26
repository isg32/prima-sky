"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Icon from "./ui/Icon";
import type { Dict } from "@/lib/i18n/en";
import { waLink } from "@/lib/links";
import { gsap } from "@/lib/gsap";

export default function Header({ t }: { t: Dict }) {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > window.innerHeight * 0.75);
      setHidden(y > last && y > 400);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    if (menu) {
      window.__lenis?.stop();
      gsap.fromTo(el, { clipPath: "circle(0% at 100% 0%)" }, { clipPath: "circle(150% at 100% 0%)", duration: 0.9, ease: "expo.inOut" });
      gsap.fromTo(el.querySelectorAll("[data-m]"), { yPercent: 110 }, { yPercent: 0, stagger: 0.04, delay: 0.25, duration: 0.9 });
    } else {
      window.__lenis?.start();
    }
  }, [menu]);

  const dark = !solid;

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[120] focus:bg-white focus:p-3">
        {t.skip}
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-[transform,background-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] ${
          hidden && !menu ? "-translate-y-full" : ""
        } ${solid ? "bg-mist/85 shadow-[0_1px_0_var(--color-rule)] backdrop-blur-xl backdrop-saturate-150" : ""}`}
      >
        <div className="wrap flex h-[var(--header-h)] items-center gap-6">
          <a href="#top" aria-label="Prima Sky — top" className="shrink-0">
            <Image
              src="/brand/logo.png"
              alt="Prima Sky"
              width={1664}
              height={646}
              priority
              className={`h-10 w-auto transition-[filter] duration-500 md:h-11 ${dark ? "brightness-0 invert" : ""}`}
            />
          </a>
          <nav aria-label="Sections" className={`ml-auto hidden gap-5 text-[12.5px] font-medium whitespace-nowrap xl:flex ${dark ? "text-white/85" : "text-ink/75"}`}>
            {t.nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="relative py-1 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:scale-x-100">
                {n.label}
              </a>
            ))}
          </nav>
          <div className={`ml-auto flex items-center gap-3 xl:ml-4 ${dark ? "text-white" : "text-ink"}`}>
            <span className="mono hidden text-[11px] tracking-widest whitespace-nowrap uppercase opacity-70 lg:inline xl:hidden 2xl:inline">{t.priceOnRequest}</span>
            <Link
              href={t.switchTo.href}
              aria-label={t.switchTo.aria}
              hrefLang={t.switchTo.href === "/" ? "en" : "gu"}
              className="grid h-9 min-w-9 place-items-center rounded-full border border-current/30 px-2 text-xs font-semibold transition-colors hover:border-current"
            >
              {t.switchTo.label}
            </Link>
            <a href={waLink(t)} target="_blank" rel="noopener" className="btn btn-wa hidden !py-2.5 md:inline-flex">
              <Icon name="whatsapp" /> {t.cta.whatsapp}
            </a>
            <button
              onClick={() => setMenu((m) => !m)}
              aria-expanded={menu}
              aria-controls="menu"
              aria-label="Menu"
              className="relative z-[2] grid h-10 w-10 place-items-center xl:hidden"
            >
              <span className={`block h-px w-6 bg-current transition-transform duration-500 ${menu ? "translate-y-[3.5px] rotate-45 !bg-white" : ""}`} />
              <span className={`absolute block h-px w-6 bg-current transition-transform duration-500 ${menu ? "rotate-[-45deg] !bg-white" : "translate-y-[7px]"}`} />
            </button>
          </div>
        </div>
      </header>

      {menu && (
        <div id="menu" ref={panel} className="grad-bg fixed inset-0 z-[79] flex flex-col justify-between overflow-y-auto px-[var(--pad)] pt-28 pb-10 text-white xl:hidden">
          <nav aria-label="Menu">
            <ol className="space-y-1">
              {t.nav.map((n, i) => (
                <li key={n.id} className="overflow-hidden">
                  <a
                    data-m
                    href={`#${n.id}`}
                    onClick={() => setMenu(false)}
                    className="flex items-baseline gap-4 py-1.5 text-[clamp(28px,8vw,48px)] font-light uppercase"
                  >
                    <span className="mono text-xs opacity-60">{String(i + 1).padStart(2, "0")}</span>
                    {n.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={waLink(t)} target="_blank" rel="noopener" className="btn btn-white">
              <Icon name="whatsapp" /> {t.cta.whatsapp}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
