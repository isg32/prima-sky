import type { Dict } from "./en";
import type { ProjectKey } from "../routes";

export const projectNames: Record<ProjectKey, { en: string; gu: string }> = {
  sky: { en: "Prima Sky", gu: "પ્રાઇમા સ્કાય" },
  residency: { en: "Prima Residency", gu: "પ્રાઇમા રેસિડેન્સી" },
};

export const projectName = (t: Dict, p: ProjectKey) => projectNames[p][t.locale === "gu" ? "gu" : "en"];

// Prima Residency shares Prima Sky's brochure and content, so its page is the same
// copy under its own name. Lines that already name both projects, and the site
// address (the plot is signed "Prima Sky"), are left as they are.
const KEEP = ["contact.addressLines"];

export function forProject(t: Dict, p: ProjectKey): Dict {
  if (p === "sky") return t;
  const from = projectName(t, "sky");
  const to = projectName(t, p);
  const walk = (v: unknown, path: string): unknown => {
    if (KEEP.some((k) => path.startsWith(k))) return v;
    if (typeof v === "string") return v.includes(to) ? v : v.replaceAll(from, to);
    if (Array.isArray(v)) return v.map((x, i) => walk(x, `${path}.${i}`));
    if (v && typeof v === "object") {
      return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x, path ? `${path}.${k}` : k)]));
    }
    return v;
  };
  return walk(t, "") as Dict;
}
