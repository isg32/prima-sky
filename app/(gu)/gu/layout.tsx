import "../../globals.css";
import { fontVars } from "@/lib/fonts";
import { buildMetadata, viewport as sharedViewport } from "@/lib/meta";
import { gu } from "@/lib/i18n/gu";

export const metadata = buildMetadata(gu);
export const viewport = sharedViewport;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={gu.htmlLang} className={fontVars}>
      <body>{children}</body>
    </html>
  );
}
