import Site from "@/components/Site";
import { buildMetadata } from "@/lib/meta";
import { gu } from "@/lib/i18n/gu";

export const metadata = buildMetadata(gu, "home");

export default function Page() {
  return <Site t={gu} />;
}
