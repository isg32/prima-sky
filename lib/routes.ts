export type Locale = "en" | "gu";
export type Page = "home" | "previous";

const PATHS: Record<Page, string> = { home: "/", previous: "/previous-projects" };

/** Path of a page in a given language: English at the root, Gujarati under /gu. */
export function route(locale: string, page: Page): string {
  const p = PATHS[page];
  if (locale !== "gu") return p;
  return p === "/" ? "/gu" : `/gu${p}`;
}

export const otherLocale = (locale: string): Locale => (locale === "gu" ? "en" : "gu");
