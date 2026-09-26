import type { Metadata, Viewport } from "next";
import type { Dict } from "./i18n/en";
import { SITE_URL, contact } from "./project";

export const viewport: Viewport = {
  themeColor: "#0057A8",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export function buildMetadata(t: Dict): Metadata {
  const path = t.locale === "gu" ? "/gu" : "/";
  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: path,
      languages: { "en-IN": "/", "gu-IN": "/gu", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: "Prima Sky",
      locale: t.locale === "gu" ? "gu_IN" : "en_IN",
      title: t.meta.title,
      description: t.meta.description,
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: t.meta.ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: ["/og.jpg"],
    },
    robots: { index: true, follow: true, "max-image-preview": "large" },
    formatDetection: { telephone: false },
  };
}

export function jsonLd(t: Dict) {
  return {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: "Prima Sky",
    description: t.meta.description,
    url: SITE_URL,
    image: `${SITE_URL}/og.jpg`,
    numberOfAccommodationUnits: 62,
    telephone: contact.phoneIntl,
    email: contact.email,
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
