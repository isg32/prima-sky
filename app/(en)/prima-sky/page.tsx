import Site from "@/components/Site";
import { buildMetadata } from "@/lib/meta";
import { en } from "@/lib/i18n/en";

export const metadata = buildMetadata(en, "sky");

export default function Page() {
  return <Site t={en} />;
}
