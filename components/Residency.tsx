import Header from "./Header";
import Intro from "./Intro";
import StickyBar from "./StickyBar";
import SmoothScroll from "./motion/SmoothScroll";
import Overview from "./residency/Overview";
import Plans from "./residency/Plans";
import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import type { Dict } from "@/lib/i18n/en";
import { residencyLd } from "@/lib/meta";
import { otherLocale, route } from "@/lib/routes";

// sections on this page, labelled with the site-wide nav names
const SECTIONS = ["overview", "residences", "contact"];

/** The Prima Residency page — same frame and motion as Prima Sky; content only from its plan set. */
export default function Residency({ t }: { t: Dict }) {
  const wa = t.residency.whatsappMessage;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(residencyLd(t)).replace(/</g, "\\u003c") }}
      />
      <SmoothScroll />
      <Intro line={`${t.residency.hero.light} ${t.residency.hero.bold}`} />
      <Header
        t={t}
        nav={t.nav.filter((n) => SECTIONS.includes(n.id)).map((n) => ({ href: `#${n.id}`, label: n.label }))}
        homeHref={route(t.locale, "home")}
        switchHref={route(otherLocale(t.locale), "residency")}
        waText={wa}
        showPrice
        menuExtra={[
          { href: route(t.locale, "home"), label: t.backHome },
          { href: route(t.locale, "previous"), label: t.previousLink.cta },
          { href: route(t.locale, "giving"), label: t.giving.cta },
        ]}
      />
      <main id="main">
        <Hero t={t} project="residency" />
        <Overview t={t} />
        <Plans t={t} />
        <Contact t={t} project="residency" />
      </main>
      <StickyBar t={t} waText={wa} />
    </>
  );
}
