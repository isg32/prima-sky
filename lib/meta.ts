import type { Metadata, Viewport } from "next";
import type { Dict } from "./i18n/en";
import { SITE_URL, contact } from "./project";
import { route, type Page } from "./routes";

export const viewport: Viewport = {
  themeColor: "#0057A8",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export function buildMetadata(t: Dict, page: Page): Metadata {
  const m = page === "previous" ? t.previous.meta : t.meta;
  const path = route(t.locale, page);
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: path,
      languages: { "en-IN": route("en", page), "gu-IN": route("gu", page), "x-default": route("en", page) },
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: "Prima",
      locale: t.locale === "gu" ? "gu_IN" : "en_IN",
      title: m.title,
      description: m.description,
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: t.meta.ogAlt }],
    },
    twitter: { card: "summary_large_image", title: m.title, description: m.description, images: ["/og.jpg"] },
  };
}

/** Site-wide defaults, set once in each root layout. */
export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Prima",
  robots: { index: true, follow: true, "max-image-preview": "large" },
  formatDetection: { telephone: false },
};

export function jsonLd(t: Dict) {
  return {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: "Prima Sky by Prima",
    description: t.meta.description,
    url: `${SITE_URL}${route(t.locale, "home")}`,
    image: `${SITE_URL}/og.jpg`,
    numberOfAccommodationUnits: 62,
    telephone: contact.phoneIntl,
    email: contact.email,
    hasMap: contact.mapsUrl,
    geo: { "@type": "GeoCoordinates", latitude: contact.geo.lat, longitude: contact.geo.lng },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bh. Shreeyam Party Plot, Nr. Bhadaj Bus Stand, Bhadaj",
      addressLocality: "Ahmedabad",
      postalCode: "380060",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    amenityFeature: [
      "Children play area",
      "High speed elevators",
      "Fire safety",
      "CCTV surveillance",
      "Security cabin",
      "Event lawn / yoga deck",
      "Gym",
      "24 hrs water supply",
      "Multipurpose hall",
      "PNG connection",
      "Basement parking",
    ].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
    brand: { "@type": "Organization", name: "Shree Balaji Lotus Buildcon LLP", email: contact.email },
  };
}
