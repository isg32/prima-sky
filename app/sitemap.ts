import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/project";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { "en-IN": `${SITE_URL}/`, "gu-IN": `${SITE_URL}/gu` };
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: `${SITE_URL}/gu`, changeFrequency: "monthly", priority: 0.8, alternates: { languages } },
  ];
}
