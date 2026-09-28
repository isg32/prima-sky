import Lotus from "./Lotus";

/** The Prima wordmark: lotus + PRIMA in the brochure's blue gradient (or white on dark). */
export default function PrimaMark({ tone = "brand", className = "" }: { tone?: "brand" | "white"; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Lotus tone={tone} className="h-[1.6em] w-auto" />
      <span
        className={`text-[1.35em] leading-none font-semibold tracking-[0.18em] ${tone === "white" ? "text-white" : "text-grad"}`}
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        PRIMA
      </span>
    </span>
  );
}
