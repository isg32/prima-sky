import type { SVGProps } from "react";

// Line icons drawn on a 32px grid, echoing the brochure's thin blue pictograms.
const paths: Record<string, React.ReactNode> = {
  // highlights
  pin: (
    <>
      <path d="M16 29s-9-8.2-9-15a9 9 0 0 1 18 0c0 6.8-9 15-9 15Z" />
      <circle cx="16" cy="14" r="3.4" />
      <circle cx="16" cy="14" r="6.2" opacity=".45" />
    </>
  ),
  plan: (
    <>
      <rect x="4" y="5" width="20" height="20" />
      <path d="M4 14h8v-9M12 19h12M17 19v6M17 10h7" />
      <path d="m27 6 2 2-7 7-2.6.6.6-2.6Z" />
    </>
  ),
  sofa: (
    <>
      <path d="M8 17v-4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
      <path d="M6 17a2 2 0 0 1 4 0v2h12v-2a2 2 0 0 1 4 0v6H6Z" />
      <path d="M8 23v3M24 23v3M3 9c0-2 1-3 2-3" />
      <path d="M4 6v8" />
    </>
  ),
  family: (
    <>
      <circle cx="10" cy="8" r="3.2" />
      <circle cx="22" cy="8" r="3.2" />
      <circle cx="16" cy="16" r="2.6" />
      <path d="M4 28v-9a6 6 0 0 1 9-5M28 28v-9a6 6 0 0 0-9-5M11.5 28v-4.5a4.5 4.5 0 0 1 9 0V28" />
    </>
  ),
  towers: (
    <>
      <path d="M5 28V10h8v18M13 28V4h10v24M23 28V13h5v15M2 28h28" />
      <path d="M16 8h1.5M19 8h1.5M16 12h1.5M19 12h1.5M16 16h1.5M19 16h1.5M16 20h1.5M19 20h1.5M8 14h2M8 18h2M8 22h2" />
    </>
  ),
  car: (
    <>
      <path d="M4 21v-4l2.5-5.5A2 2 0 0 1 8.3 10h11.4a2 2 0 0 1 1.8 1.2L24 17v4Z" />
      <circle cx="9" cy="22" r="2.4" />
      <circle cx="20" cy="22" r="2.4" />
      <path d="M4 17h20M28 28V4M26 6h4" />
    </>
  ),
  // amenities
  play: (
    <>
      <path d="M4 28V8h10v20M4 8l5-4 5 4M14 14l12 12M4 14h10M9 14v14" />
      <path d="M22 28h6" />
    </>
  ),
  lift: (
    <>
      <rect x="6" y="3" width="20" height="26" rx="1" />
      <path d="M16 3v26M11 12l-2.5 3h5ZM21 18l2.5-3h-5Z" />
    </>
  ),
  equipment: (
    <>
      <path d="M4 28V14l12-9 12 9v14Z" />
      <path d="M10 28v-8h5v8M18 20h5v4h-5ZM13 14h6" />
    </>
  ),
  meter: (
    <>
      <rect x="7" y="3" width="18" height="24" rx="2" />
      <rect x="10" y="7" width="12" height="6" />
      <path d="M12 10h1.5M15 10h1.5M18 10h1.5M11 29v-2M21 29v-2M14 18h4M14 22h4" />
    </>
  ),
  fire: (
    <>
      <path d="M12 12h8v16h-8Z" />
      <path d="M14 12V8h4v4M16 8V5M16 5h6l2 3" />
      <path d="M12 17h8" />
    </>
  ),
  dropoff: (
    <>
      <path d="M16 20s-6-5.2-6-9.5a6 6 0 0 1 12 0C22 14.8 16 20 16 20Z" />
      <circle cx="16" cy="10.5" r="2" />
      <path d="M4 28l4-7h16l4 7Z" />
    </>
  ),
  cctv: (
    <>
      <path d="m5 9 18 6-2.5 5L4 13Z" />
      <path d="m23 15 4-2M12 17l-1.5 5H6M6 18v8" />
      <circle cx="11" cy="12" r="1" />
    </>
  ),
  guard: (
    <>
      <circle cx="16" cy="11" r="4.2" />
      <path d="M10 7.5h12l-1-3h-10ZM7 28v-4a9 9 0 0 1 18 0v4M16 19v5M13.5 22h5" />
    </>
  ),
  yoga: (
    <>
      <circle cx="16" cy="6" r="2.6" />
      <path d="M16 9v8M8 13l8 3 8-3M9 24c2-3 4-4 7-4s5 1 7 4M5 27h22" />
    </>
  ),
  gym: (
    <>
      <path d="M8 26V6M24 26V6M5 10h6M21 10h6M8 16h16M10 22h12" />
      <rect x="12" y="20" width="8" height="6" />
    </>
  ),
  water: (
    <>
      <path d="M4 15 16 5l12 10M7 13v14h18V13" />
      <path d="M16 13s-4 4.4-4 7a4 4 0 0 0 8 0c0-2.6-4-7-4-7Z" />
    </>
  ),
  hall: (
    <>
      <path d="M4 7h24M6 7v4M26 7v4M9 11h14v7H9ZM5 26l4-8M27 26l-4-8M12 26v-4h8v4" />
      <circle cx="16" cy="14.5" r="1.4" />
    </>
  ),
  gas: (
    <>
      <circle cx="16" cy="12" r="6" />
      <path d="M16 12l3-3M16 18v7M11 28h10M22 6l2-2M10 6 8 4" />
    </>
  ),
  seat: (
    <>
      <path d="M5 18h22M7 18v8M25 18v8M8 18v-5a8 8 0 0 1 16 0v5" />
      <circle cx="16" cy="7" r="2.4" />
    </>
  ),
  foyer: (
    <>
      <path d="M4 28V4h24v24M4 28h24M4 4l7 5v19M28 4l-7 5v19M11 9h10" />
    </>
  ),
  // specifications
  structure: (
    <>
      <path d="M6 28V12M26 28V12M6 12h20M6 20h20M6 12l8 8M26 12l-8 8M3 28h26M10 12V6l6-3 6 3v6" />
    </>
  ),
  plaster: (
    <>
      <path d="M6 26 22 10l4 4-16 16H6Z" />
      <path d="M18 14l4 4M4 6h10M4 10h6" />
    </>
  ),
  wall: (
    <>
      <path d="M4 6h24v20H4ZM4 12h24M4 19h24M12 6v6M20 12v7M10 19v7M22 19v7" />
    </>
  ),
  floor: (
    <>
      <path d="M6 6h20v20H6ZM6 16h20M16 6v20M11 6v10M21 16v10" />
    </>
  ),
  kitchen: (
    <>
      <path d="M4 18h24v10H4ZM4 22h24M10 18v-6h12v6M13 12V8M19 12V8M8 25h3M21 25h3" />
      <circle cx="13" cy="6" r="1" />
      <circle cx="19" cy="6" r="1" />
    </>
  ),
  plumbing: (
    <>
      <path d="M6 10h8a4 4 0 0 1 4 4v4a4 4 0 0 0 4 4h4M6 6v8M26 18v8" />
      <path d="M14 6h4v4" />
      <circle cx="16" cy="14" r="1.2" />
    </>
  ),
  toilet: (
    <>
      <path d="M8 4h8v10H8ZM6 14h20a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8ZM12 22l-1 6h10l-1-6" />
      <path d="M23 5l1.5 1.5M26 8h2M24 3v-2" />
    </>
  ),
  door: (
    <>
      <path d="M5 28V4h12v24M3 28h16M13 16h1.5" />
      <path d="M20 8h9v9h-9ZM24.5 8v9M20 12.5h9" />
    </>
  ),
  electric: (
    <>
      <rect x="5" y="5" width="22" height="22" rx="2" />
      <rect x="9" y="9" width="6" height="14" rx="1" />
      <rect x="17" y="9" width="6" height="14" rx="1" />
      <path d="M12 12v3M20 17v3" />
    </>
  ),
  terrace: (
    <>
      <path d="m6 20 8-8 8 8-8 8Z" />
      <path d="M10 20h8M14 16v8" />
      <path d="M20 6a6 6 0 0 1 6 6M20 3a9 9 0 0 1 9 9" />
    </>
  ),
  // ui
  whatsapp: (
    <path
      fill="currentColor"
      stroke="none"
      d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Zm0 23.7a10.7 10.7 0 0 1-5.5-1.5l-.4-.2-4 1 1-3.9-.2-.4A10.7 10.7 0 1 1 16 26.7Zm6-8c-.3-.2-1.9-1-2.2-1s-.5-.2-.8.2-.8 1-1 1.2-.4.2-.7 0a8.8 8.8 0 0 1-4.3-3.8c-.3-.6.3-.5.9-1.6.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.8-.5h-.6a1.3 1.3 0 0 0-.9.4 3.9 3.9 0 0 0-1.2 2.9 6.8 6.8 0 0 0 1.4 3.6 15.4 15.4 0 0 0 5.9 5.2c2.8 1 2.8.7 3.3.6a3.5 3.5 0 0 0 2.3-1.6 2.9 2.9 0 0 0 .2-1.6c-.1-.2-.3-.3-.7-.5Z"
    />
  ),
  phone: <path d="M8 4h5l2 6-3 2a15 15 0 0 0 8 8l2-3 6 2v5a2 2 0 0 1-2 2A22 22 0 0 1 6 6a2 2 0 0 1 2-2Z" />,
  mail: (
    <>
      <rect x="4" y="7" width="24" height="18" rx="2" />
      <path d="m5 9 11 8 11-8" />
    </>
  ),
  arrow: <path d="M6 16h20M18 8l8 8-8 8" />,
  arrowUpRight: <path d="M9 23 23 9M11 9h12v12" />,
  download: <path d="M16 4v17M9 14l7 7 7-7M5 27h22" />,
  close: <path d="m8 8 16 16M24 8 8 24" />,
  chevL: <path d="m20 6-10 10 10 10" />,
  chevR: <path d="m12 6 10 10-10 10" />,
  expand: <path d="M5 12V5h7M27 12V5h-7M5 20v7h7M27 20v7h-7" />,
  map: (
    <>
      <path d="M4 8l8-3 8 3 8-3v19l-8 3-8-3-8 3Z" />
      <path d="M12 5v19M20 8v19" />
    </>
  ),
};

export type IconName = keyof typeof paths;

export default function Icon({
  name,
  size = 28,
  strokeWidth = 1.4,
  ...rest
}: { name: string; size?: number; strokeWidth?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {paths[name] ?? null}
    </svg>
  );
}
