import Site from "@/components/Site";
import { buildMetadata } from "@/lib/meta";
import { gu } from "@/lib/i18n/gu";
import { forProject } from "@/lib/i18n/project";

const t = forProject(gu, "sky");

export const metadata = buildMetadata(t, "sky");

export default function Page() {
  return <Site t={t} project="sky" />;
}
