import Header from "./Header";
import Intro from "./Intro";
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

export default function Site({ t }: { t: Dict }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(t)).replace(/</g, "\\u003c") }}
      />
      <SmoothScroll />
      <Intro line={t.intro} />
      <Header t={t} />
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
