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
  const m = page === "home" ? t.home.meta : page === "previous" ? t.previous.meta : page === "residency" ? t.residency.meta : t.meta;
  const path = route(t.locale, page);
  const og = page === "residency" ? { url: "/prima-residency/og.jpg", alt: t.residency.meta.ogAlt } : { url: "/og.jpg", alt: t.meta.ogAlt };
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
      images: [{ url: og.url, width: 1200, height: 630, alt: og.alt }],
    },
    twitter: { card: "summary_large_image", title: m.title, description: m.description, images: [og.url] },
  };
}

/** Site-wide defaults, set once in each root layout. */
export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Prima",
  robots: { index: true, follow: true, "max-image-preview": "large" },
  formatDetection: { telephone: false },
};

export function organizationLd(t: Dict) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Prima",
    legalName: "Shree Balaji Lotus Buildcon LLP",
    url: `${SITE_URL}${route(t.locale, "home")}`,
    email: contact.email,
    telephone: contact.phoneIntl,
    description: t.home.meta.description,
  };
}

export function residencyLd(t: Dict) {
  return {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: "Prima Residency by Prima",
    description: t.residency.meta.description,
    url: `${SITE_URL}${route(t.locale, "residency")}`,
    image: `${SITE_URL}/prima-residency/og.jpg`,
    telephone: contact.phoneIntl,
    email: contact.email,
    brand: { "@type": "Organization", name: "Shree Balaji Lotus Buildcon LLP", email: contact.email },
  };
}

export function jsonLd(t: Dict) {
  return {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: `${t.projectName} by Prima`,
    description: t.meta.description,
    url: `${SITE_URL}${route(t.locale, "sky")}`,
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
