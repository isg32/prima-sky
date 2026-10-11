import type { Dict } from "./en";
import type { ProjectKey } from "../routes";

export const projectNames: Record<ProjectKey, { en: string; gu: string }> = {
  sky: { en: "Prima Sky", gu: "પ્રાઇમા સ્કાય" },
  residency: { en: "Prima Residency", gu: "પ્રાઇમા રેસિડેન્સી" },
};

export const projectName = (t: Dict, p: ProjectKey) => projectNames[p][t.locale === "gu" ? "gu" : "en"];
