import Giving from "@/components/home/Giving";
import { buildMetadata } from "@/lib/meta";
import { en } from "@/lib/i18n/en";

export const metadata = buildMetadata(en, "giving");

export default function Page() {
  return <Giving t={en} />;
}
