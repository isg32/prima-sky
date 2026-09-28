import Previous from "@/components/home/Previous";
import { buildMetadata } from "@/lib/meta";
import { en } from "@/lib/i18n/en";

export const metadata = buildMetadata(en, "previous");

export default function Page() {
  return <Previous t={en} />;
}
