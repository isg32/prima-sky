import Giving from "@/components/home/Giving";
import { buildMetadata } from "@/lib/meta";
import { gu } from "@/lib/i18n/gu";

export const metadata = buildMetadata(gu, "giving");

export default function Page() {
  return <Giving t={gu} />;
}
