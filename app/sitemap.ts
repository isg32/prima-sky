import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/project";
import { route, type Page } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [Page, number][] = [
    ["home", 1],
    ["previous", 0.5],
  ];
  return pages.flatMap(([page, priority]) => {
    const languages = { "en-IN": `${SITE_URL}${route("en", page)}`, "gu-IN": `${SITE_URL}${route("gu", page)}` };
    return (["en", "gu"] as const).map((l) => ({
      url: `${SITE_URL}${route(l, page)}`,
      changeFrequency: "monthly" as const,
      priority: l === "en" ? priority : priority * 0.9,
      alternates: { languages },
    }));
  });
}
