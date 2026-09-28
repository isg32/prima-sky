import Header from "./Header";
import StickyBar from "./StickyBar";
import SmoothScroll from "./motion/SmoothScroll";
import Amenities from "./sections/Amenities";
import Contact from "./sections/Contact";
import Corridor from "./sections/Corridor";
import Gallery from "./sections/Gallery";
import Hero from "./sections/Hero";
import Location from "./sections/Location";
import Overview from "./sections/Overview";
import Residences from "./sections/Residences";
import Shops from "./sections/Shops";
import Specs from "./sections/Specs";
import type { Dict } from "@/lib/i18n/en";
import { jsonLd } from "@/lib/meta";
import { otherLocale, route } from "@/lib/routes";

export default function Site({ t }: { t: Dict }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(t)).replace(/</g, "\\u003c") }}
      />
      <SmoothScroll />
      <Header
        t={t}
        nav={t.nav.map((n) => ({ href: `#${n.id}`, label: n.label }))}
        homeHref={route(t.locale, "home")}
        switchHref={route(otherLocale(t.locale), "sky")}
        project={t.home.sky.name}
        showPrice
        menuExtra={[{ href: route(t.locale, "home"), label: t.backHome }]}
      />
      <main id="main">
        <Hero t={t} />
        <Overview t={t} />
        <Gallery t={t} />
        <Corridor t={t} />
        <Residences t={t} />
        <Shops t={t} />
        <Amenities t={t} />
        <Specs t={t} />
        <Location t={t} />
        <Contact t={t} />
      </main>
      <StickyBar t={t} />
    </>
  );
}
