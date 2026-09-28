"use client";

import Link from "next/link";
import PrimaMark from "./brand/PrimaMark";
import { useEffect, useRef, useState } from "react";
import Icon from "./ui/Icon";
import type { Dict } from "@/lib/i18n/en";
import { waLink } from "@/lib/links";
import { gsap } from "@/lib/gsap";

export type NavItem = { href: string; label: string };

export default function Header({
  t,
  nav,
  homeHref,
  switchHref,
  project,
  light = false,
  waText,
  showPrice = false,
  menuExtra = [],
}: {
  t: Dict;
  nav: NavItem[];
  homeHref: string;
  switchHref: string;
  project?: string; // shown beside the Prima mark on a project page
  light?: boolean; // page opens on a light background (no dark hero)
  waText?: string;
  showPrice?: boolean;
  menuExtra?: NavItem[];
}) {
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

  const dark = !solid && !light;

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
        <div className="wrap flex h-[var(--header-h)] items-center gap-3 sm:gap-6">
          <Link href={homeHref} aria-label={`${t.brand} — ${t.backHome}`} className="flex shrink-0 items-center gap-3 text-[15px] md:text-[17px]">
            <PrimaMark tone={dark ? "white" : "brand"} />
            {project && (
              <span className={`hidden border-l pl-3 text-[11px] font-semibold tracking-[0.2em] uppercase sm:inline ${dark ? "border-white/30 text-white/80" : "border-ink/20 text-ink/70"}`}>
                {project}
              </span>
            )}
          </Link>
          <nav aria-label="Sections" className={`ml-auto hidden gap-5 text-[12.5px] font-medium whitespace-nowrap xl:flex ${dark ? "text-white/85" : "text-ink/75"}`}>
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="relative py-1 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:scale-x-100">
                {n.label}
              </a>
            ))}
          </nav>
          <div className={`ml-auto flex shrink-0 items-center gap-2 sm:gap-3 xl:ml-4 ${dark ? "text-white" : "text-ink"}`}>
            {showPrice && (
              <span className="mono hidden text-[11px] tracking-widest whitespace-nowrap uppercase opacity-70 lg:inline xl:hidden 2xl:inline">{t.priceOnRequest}</span>
            )}
            <Link
              href={switchHref}
              aria-label={t.switchTo.aria}
              hrefLang={t.switchTo.hrefLang}
              lang={t.switchTo.hrefLang}
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-current/30 px-3.5 text-[13px] font-semibold whitespace-nowrap transition-colors hover:border-current"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" />
              </svg>
              {t.switchTo.label}
            </Link>
            <a href={waLink(t, waText)} target="_blank" rel="noopener" className="btn btn-wa hidden !py-2.5 md:inline-flex">
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
              {[...nav, ...menuExtra].map((n, i) => (
                <li key={n.href} className="overflow-hidden">
                  <a
                    data-m
                    href={n.href}
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
            <a href={waLink(t, waText)} target="_blank" rel="noopener" className="btn btn-white">
              <Icon name="whatsapp" /> {t.cta.whatsapp}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
