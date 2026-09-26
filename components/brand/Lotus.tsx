import { useId, type SVGProps } from "react";

export const LOTUS_PATHS = [
  "M4 29 H16.5 C17.5 49 30 63 47.5 65 V76 C23 75 4.5 55 4 29Z",
  "M96 29 H83.5 C82.5 49 70 63 52.5 65 V76 C77 75 95.5 55 96 29Z",
  "M20 29.5 C34 29.5 46.5 40 47.5 62 C31 60.5 20.5 47 20 29.5Z",
  "M80 29.5 C66 29.5 53.5 40 52.5 62 C69 60.5 79.5 47 80 29.5Z",
  "M39.5 25.5 C39 22 39.6 19 41 16.5 C45 17.6 48 19.6 50 22.3 C52 19.6 55 17.6 59 16.5 C60.4 19 61 22 60.5 25.5 C55.5 29 52 35 50 43 C48 35 44.5 29 39.5 25.5Z",
  "M28 11 C32.5 11 36 12 39 13.8 C37.2 16.8 36.4 20.5 36.6 25 C33.5 23.6 30.4 23 27 23.2 C26.8 18.5 27.1 14.5 28 11Z",
  "M72 11 C67.5 11 64 12 61 13.8 C62.8 16.8 63.6 20.5 63.4 25 C66.5 23.6 69.6 23 73 23.2 C73.2 18.5 72.9 14.5 72 11Z",
  "M50 4 C54 7 57.5 10.5 59.5 14 C55.5 15 52.5 17 50 19.5 C47.5 17 44.5 15 40.5 14 C42.5 10.5 46 7 50 4Z",
];

/** The Prima Sky lotus. `tone="white"` for use on blue; paths carry pathLength=1 for draw-on. */
export default function Lotus({
  tone = "brand",
  ...rest
}: { tone?: "brand" | "white" } & SVGProps<SVGSVGElement>) {
  const id = useId();
  const fill = tone === "white" ? "#fff" : `url(#${id})`;
  return (
    <svg viewBox="0 0 100 80" aria-hidden="true" {...rest}>
      {tone === "brand" && (
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1FA3E0" />
            <stop offset="1" stopColor="#0057A8" />
          </linearGradient>
        </defs>
      )}
      <g fill={fill} stroke={tone === "white" ? "#fff" : "#0077C8"} strokeWidth="0">
        {LOTUS_PATHS.map((d, i) => (
          <path key={i} d={d} pathLength={1} data-petal={i} />
        ))}
      </g>
    </svg>
  );
}

/** Brochure-style section marker: white lotus on a blue gradient tab. */
export function LotusTab({ className = "" }: { className?: string }) {
  return (
    <span
      className={`grad-bg inline-flex h-16 w-14 items-end justify-center pb-3 ${className}`}
      aria-hidden="true"
    >
      <Lotus tone="white" className="w-9" />
    </span>
  );
}
