import { JetBrains_Mono, Montserrat, Noto_Sans_Gujarati } from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const gujarati = Noto_Sans_Gujarati({
  subsets: ["gujarati"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-gujarati",
  display: "swap",
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-jb",
  display: "swap",
});

export const fontVars = `${montserrat.variable} ${gujarati.variable} ${mono.variable}`;
