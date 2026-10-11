import Residency from "@/components/Residency";
import { buildMetadata } from "@/lib/meta";
import { en } from "@/lib/i18n/en";

export const metadata = buildMetadata(en, "residency");

export default function Page() {
  return <Residency t={en} />;
}
