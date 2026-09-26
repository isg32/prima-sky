import "../globals.css";
import { fontVars } from "@/lib/fonts";
import { buildMetadata, viewport as sharedViewport } from "@/lib/meta";
import { en } from "@/lib/i18n/en";

export const metadata = buildMetadata(en);
export const viewport = sharedViewport;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={en.htmlLang} className={fontVars}>
      <body>{children}</body>
    </html>
  );
}
