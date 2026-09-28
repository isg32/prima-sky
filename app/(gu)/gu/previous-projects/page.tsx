import Previous from "@/components/home/Previous";
import { buildMetadata } from "@/lib/meta";
import { gu } from "@/lib/i18n/gu";

export const metadata = buildMetadata(gu, "previous");

export default function Page() {
  return <Previous t={gu} />;
}
