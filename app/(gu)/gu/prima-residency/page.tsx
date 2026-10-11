import Residency from "@/components/Residency";
import { buildMetadata } from "@/lib/meta";
import { gu } from "@/lib/i18n/gu";

export const metadata = buildMetadata(gu, "residency");

export default function Page() {
  return <Residency t={gu} />;
}
