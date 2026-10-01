import Site from "@/components/Site";
import { buildMetadata } from "@/lib/meta";
import { en } from "@/lib/i18n/en";
import { forProject } from "@/lib/i18n/project";

const t = forProject(en, "residency");

export const metadata = buildMetadata(t, "residency");

export default function Page() {
  return <Site t={t} project="residency" />;
}
