export type Locale = "en" | "gu";
export type ProjectKey = "sky" | "residency";
export type Page = "home" | ProjectKey | "previous" | "giving";

const PATHS: Record<Page, string> = {
  home: "/",
  sky: "/prima-sky",
  residency: "/prima-residency",
  previous: "/previous-projects",
  giving: "/giving-back",
};

/** Path of a page in a given language: English at the root, Gujarati under /gu. */
export function route(locale: string, page: Page): string {
  const p = PATHS[page];
  if (locale !== "gu") return p;
  return p === "/" ? "/gu" : `/gu${p}`;
}

export const otherLocale = (locale: string): Locale => (locale === "gu" ? "en" : "gu");
