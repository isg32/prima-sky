// Language-neutral project facts. Everything here comes from the Prima Sky brochure;
// copy that needs translating lives in lib/i18n.

// Empty env vars ("") must fall through too, and a bare host needs a protocol.
function siteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    "prima-sky.vercel.app";
  const url = /^https?:\/\//.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(url).origin;
  } catch {
    return "https://prima-sky.vercel.app";
  }
}

export const SITE_URL = siteUrl();

export const contact = {
  phoneDisplay: "78028 00918",
  phoneIntl: "+917802800918",
  whatsapp: "917802800918",
  email: "shreebalajilotusbuildcon@gmail.com",
  // Google Maps listing for "Prima Sky" (pin at 23.0868226, 72.4860787)
  mapsUrl: "https://maps.app.goo.gl/2G9nDrp3PEX1HuyU6",
  geo: { lat: 23.0868226, lng: 72.4860787 },
  // TODO: replace with the Gujarat RERA registration number once issued.
  rera: null as string | null,
};

export const brochureUrl = "/prima-sky-brochure.pdf";
export const brochureDownloadAs = "Prima-Sky-Brochure.pdf";

// Prima Residency (Ognaj) — renders, the architect's plan set and its sheets.
export const residency = {
  hero: "/prima-residency/residency-corner.jpg",
  images: [
    "/prima-residency/residency-corner.jpg",
    "/prima-residency/residency-front.jpg",
    "/prima-residency/residency-street.jpg",
    "/prima-residency/residency-aerial.jpg",
  ],
  // in the order of t.residency.plans.sheets; client's name covered in the title block
  sheets: [
    "/prima-residency/plans/typical-floor.jpg",
    "/prima-residency/plans/duplex-lower.jpg",
    "/prima-residency/plans/duplex-upper.jpg",
    "/prima-residency/plans/hollow-plinth.jpg",
  ],
  plans: "/prima-residency/residency-plans.pdf",
  plansDownloadAs: "Prima-Residency-Floor-Plans.pdf",
};

// ---------------------------------------------------------------------------
// Unit plans — geometry traced from the brochure plans (brochure px space).
// ---------------------------------------------------------------------------

export type RoomKind =
  | "bedroom"
  | "toilet"
  | "kitchen"
  | "store"
  | "dining"
  | "drawing"
  | "balcony"
  | "washyard"
  | "vestibule";

export type Rect = [x: number, y: number, w: number, h: number];

export type Room = { id: string; kind: RoomKind; n?: number; dim?: string; r: Rect };

export type UnitPlan = {
  type: 1 | 2 | 3 | 4;
  block: "A" | "B";
  units: string[]; // e.g. "101–1101"
  viewBox: [number, number];
  rooms: Room[];
  hall: Rect[]; // circulation floor, drawn beneath the rooms
  planters: Rect[];
  puja: Rect;
  entry: { x: number; y: number; dir: "left" | "right" | "down" };
  original: string;
};

export const plans: UnitPlan[] = [
  {
    type: 1,
    block: "A",
    units: ["102–1102"],
    viewBox: [920, 1000],
    hall: [
      [385, 355, 320, 205],
      [640, 430, 265, 135],
    ],
    rooms: [
      { id: "b1", kind: "bedroom", n: 1, dim: `10'0" × 15'0"`, r: [390, 560, 250, 375] },
      { id: "b2", kind: "bedroom", n: 2, dim: `13'0" × 10'0"`, r: [65, 190, 320, 245] },
      { id: "b3", kind: "bedroom", n: 3, dim: `10'0" × 10'0"`, r: [140, 440, 245, 245] },
      { id: "dr", kind: "drawing", dim: `10'6" × 16'0"`, r: [640, 435, 260, 395] },
      { id: "d", kind: "dining", dim: `8'0" × 12'10"`, r: [390, 360, 250, 195] },
      { id: "k", kind: "kitchen", dim: `8'0" × 11'7"`, r: [545, 80, 160, 280] },
      { id: "st", kind: "store", r: [505, 200, 40, 160] },
      { id: "t1", kind: "toilet", n: 1, dim: `6'6" × 4'3"`, r: [65, 80, 165, 103] },
      { id: "t2", kind: "toilet", n: 2, dim: `4'6" × 6'0"`, r: [390, 200, 110, 155] },
      { id: "t3", kind: "toilet", n: 3, dim: `4'6" × 7'0"`, r: [270, 695, 115, 170] },
      { id: "bal", kind: "balcony", dim: `10'6" × 4'0"`, r: [645, 830, 255, 105] },
      { id: "wy", kind: "washyard", dim: `6'0" × 5'0"`, r: [352, 80, 148, 115] },
    ],
    planters: [
      [10, 75, 50, 110],
      [10, 190, 50, 250],
      [85, 440, 50, 250],
      [298, 25, 407, 50],
      [298, 75, 52, 105],
      [270, 870, 115, 45],
      [390, 940, 515, 45],
    ],
    puja: [705, 435, 95, 28],
    entry: { x: 905, y: 478, dir: "left" },
    original: "/plans/type-1.jpg",
  },
  {
    type: 2,
    block: "A",
    units: ["101–1101"],
    viewBox: [910, 1010],
    hall: [
      [265, 360, 325, 85],
      [330, 440, 260, 130],
    ],
    rooms: [
      { id: "b1", kind: "bedroom", n: 1, dim: `10'0" × 15'0"`, r: [335, 570, 250, 375] },
      { id: "b2", kind: "bedroom", n: 2, dim: `10'0" × 13'0"`, r: [595, 450, 245, 320] },
      { id: "b3", kind: "bedroom", n: 3, dim: `10'0" × 10'0"`, r: [595, 195, 245, 245] },
      { id: "dr", kind: "drawing", dim: `10'6" × 16'0"`, r: [65, 440, 265, 405] },
      { id: "d", kind: "dining", dim: `8'0" × 12'10"`, r: [330, 400, 255, 165] },
      { id: "k", kind: "kitchen", dim: `8'0" × 11'7"`, r: [265, 80, 165, 285] },
      { id: "st", kind: "store", r: [430, 205, 35, 160] },
      { id: "t1", kind: "toilet", n: 1, dim: `4'6" × 6'0"`, r: [470, 210, 115, 155] },
      { id: "t2", kind: "toilet", n: 2, dim: `4'10" × 6'8"`, r: [590, 780, 122, 165] },
      { id: "t3", kind: "toilet", n: 3, dim: `4'10" × 6'8"`, r: [720, 780, 120, 165] },
      { id: "bal", kind: "balcony", dim: `10'6" × 4'0"`, r: [65, 850, 265, 95] },
      { id: "wy", kind: "washyard", dim: `5'0" × 6'0"`, r: [470, 80, 155, 115] },
    ],
    planters: [
      [258, 25, 422, 50],
      [630, 75, 50, 110],
      [850, 195, 47, 245],
      [850, 450, 47, 330],
      [65, 950, 775, 50],
    ],
    puja: [165, 440, 100, 30],
    entry: { x: 60, y: 488, dir: "right" },
    original: "/plans/type-2.jpg",
  },
  {
    type: 3,
    block: "B",
    units: ["101–1001", "102–1002"],
    viewBox: [920, 1060],
    hall: [[350, 360, 555, 230]],
    rooms: [
      { id: "b1", kind: "bedroom", n: 1, dim: `10'0" × 15'0"`, r: [350, 590, 270, 410] },
      { id: "b2", kind: "bedroom", n: 2, dim: `10'0" × 13'0"`, r: [70, 458, 270, 350] },
      { id: "b3", kind: "bedroom", n: 3, dim: `10'0" × 10'0"`, r: [70, 180, 270, 270] },
      { id: "dr", kind: "drawing", dim: `10'6" × 17'0"`, r: [625, 365, 280, 465] },
      { id: "d", kind: "dining", dim: `8'0" × 10'0"`, r: [350, 420, 275, 165] },
      { id: "k", kind: "kitchen", dim: `8'0" × 11'7"`, r: [518, 55, 177, 305] },
      { id: "st", kind: "store", r: [478, 190, 40, 175] },
      { id: "t1", kind: "toilet", n: 1, dim: `4'6" × 6'0"`, r: [350, 195, 120, 165] },
      { id: "t2", kind: "toilet", n: 2, dim: `4'10" × 6'8"`, r: [70, 815, 130, 185] },
      { id: "t3", kind: "toilet", n: 3, dim: `4'10" × 6'8"`, r: [208, 815, 132, 185] },
      { id: "bal", kind: "balcony", dim: `10'6" × 4'0"`, r: [625, 835, 280, 110] },
      { id: "wy", kind: "washyard", dim: `6'0" × 5'0"`, r: [305, 55, 165, 135] },
    ],
    planters: [
      [248, 55, 50, 120],
      [10, 180, 52, 635],
      [625, 950, 280, 50],
      [62, 1005, 558, 45],
    ],
    puja: [695, 370, 105, 32],
    entry: { x: 860, y: 358, dir: "down" },
    original: "/plans/type-3.jpg",
  },
  {
    type: 4,
    block: "B",
    units: ["103–1003", "104–1004"],
    viewBox: [890, 1070],
    hall: [[300, 520, 265, 215]],
    rooms: [
      { id: "b1", kind: "bedroom", n: 1, dim: `10'0" × 15'0"`, r: [310, 150, 245, 370] },
      { id: "b2", kind: "bedroom", n: 2, dim: `10'0" × 13'0"`, r: [565, 325, 255, 325] },
      { id: "b3", kind: "bedroom", n: 3, dim: `10'0" × 10'0"`, r: [565, 655, 255, 255] },
      { id: "dr", kind: "drawing", dim: `10'6" × 16'0"`, r: [40, 325, 260, 410] },
      { id: "d", kind: "dining", dim: `8'0" × 10'0"`, r: [300, 525, 260, 210] },
      { id: "k", kind: "kitchen", dim: `8'0" × 11'7"`, r: [240, 735, 160, 325] },
      { id: "st", kind: "store", r: [400, 735, 40, 165] },
      { id: "t1", kind: "toilet", n: 1, dim: `4'10" × 6'8"`, r: [560, 150, 130, 170] },
      { id: "t2", kind: "toilet", n: 2, dim: `4'10" × 6'8"`, r: [695, 150, 125, 170] },
      { id: "t3", kind: "toilet", n: 3, dim: `4'6" × 6'0"`, r: [445, 735, 115, 160] },
      { id: "bal", kind: "balcony", dim: `8'0" × 4'0"`, r: [100, 220, 200, 100] },
      { id: "wy", kind: "washyard", dim: `6'0" × 5'0"`, r: [440, 900, 160, 160] },
      { id: "v", kind: "vestibule", dim: `3'7" × 5'0"`, r: [135, 735, 100, 125] },
    ],
    planters: [
      [90, 165, 210, 50],
      [40, 275, 50, 45],
      [305, 90, 520, 50],
      [825, 325, 50, 590],
      [605, 915, 45, 145],
    ],
    puja: [40, 630, 25, 100],
    entry: { x: 128, y: 815, dir: "right" },
    original: "/plans/type-4.jpg",
  },
];

// ---------------------------------------------------------------------------
// Shops — sizes as printed on the ground-floor plan, in frontage order.
// ---------------------------------------------------------------------------

export type Shop = { no: string; w: string; d: string };

export const shops: Shop[] = [
  { no: "01", w: `28'0"`, d: `14'6"` },
  { no: "02", w: `29'10"`, d: `21'10"` },
  { no: "03", w: `15'9"`, d: `8'2"` },
  { no: "04", w: `10'6"`, d: `23'4"` },
  { no: "05", w: `10'0"`, d: `23'8"` },
  { no: "06", w: `10'0"`, d: `24'0"` },
  { no: "07", w: `9'7"`, d: `24'5"` },
  { no: "08", w: `9'7"`, d: `24'9"` },
  { no: "09", w: `9'7"`, d: `25'1"` },
  { no: "10", w: `10'0"`, d: `25'5"` },
  { no: "11", w: `10'0"`, d: `25'10"` },
  { no: "12", w: `10'6"`, d: `26'2"` },
  { no: "12-A", w: `10'6"`, d: `26'7"` },
  { no: "14", w: `10'0"`, d: `38'1"` },
  { no: "15", w: `10'0"`, d: `27'3"` },
];

/** Parses 10'6" → 10.5 (feet). */
export function feet(v: string): number {
  const m = v.match(/(\d+)'(\d+)"/);
  return m ? Number(m[1]) + Number(m[2]) / 12 : 0;
}

export function shopArea(s: Shop): number {
  return Math.round(feet(s.w) * feet(s.d));
}

// ---------------------------------------------------------------------------
// Ground-floor site plan hotspots, in % of public/plans/ground-floor.jpg.
// Keys match the numbered legend (1–14).
// ---------------------------------------------------------------------------

const gf = (x: number, y: number): [number, number] => [
  +(((x / 2000 - 0.03) / 0.96) * 100).toFixed(2),
  +(((y / 1482 - 0.02) / 0.93) * 100).toFixed(2),
];

export const sitePlanSpots: Record<number, [number, number][]> = {
  1: [gf(452, 698), gf(1670, 1008)],
  2: [gf(387, 637), gf(1715, 1095)],
  3: [gf(452, 640)],
  4: [gf(508, 637)],
  5: [gf(693, 1082), gf(1407, 1108)],
  6: [gf(463, 950), gf(1296, 1037)],
  7: [gf(1110, 1094)],
  8: [gf(1083, 803), gf(1381, 488)],
  9: [gf(800, 790), gf(1284, 810)],
  10: [gf(1383, 229)],
  11: [gf(1195, 591)],
  12: [gf(1640, 284)],
  13: [gf(1152, 233)],
  14: [gf(875, 803), gf(1540, 616)],
};

export const renders = {
  frontDay: "/renders/front-day.jpg",
  frontElevation: "/renders/front-elevation.jpg",
  dusk: "/renders/dusk.jpg",
  cornerDay: "/renders/corner-day.jpg",
  gardenWalk: "/renders/garden-walk.jpg",
  eventLawn: "/renders/event-lawn.jpg",
  aerialCorner: "/renders/aerial-corner.jpg",
  aerialRear: "/renders/aerial-rear.jpg",
  lobby: "/renders/lobby.jpg",
  sketch: "/renders/sketch.jpg",
} as const;
