import Home from "@/components/home/Home";
import { buildMetadata } from "@/lib/meta";
import { en } from "@/lib/i18n/en";

export const metadata = buildMetadata(en, "home");

export default function Page() {
  return <Home t={en} />;
}
