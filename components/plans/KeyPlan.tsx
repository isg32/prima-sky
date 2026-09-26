import type { UnitPlan } from "@/lib/project";

type Cell = { type: number; label: string; r: [number, number, number, number] };

const CELLS: Cell[] = [
  { type: 1, label: "102–1102", r: [12, 112, 86, 74] },
  { type: 2, label: "101–1101", r: [132, 112, 86, 74] },
  { type: 4, label: "103–1003", r: [250, 14, 66, 78] },
  { type: 4, label: "104–1004", r: [322, 14, 66, 78] },
  { type: 3, label: "102–1002", r: [250, 132, 66, 78] },
  { type: 3, label: "101–1001", r: [322, 132, 66, 78] },
];

/** Schematic of the typical floor showing where the selected unit type sits. */
export default function KeyPlan({ plan, foyer, lift }: { plan: UnitPlan; foyer: string; lift: string }) {
  return (
    <svg viewBox="0 0 400 224" className="h-auto w-full" role="img" aria-label={`${plan.units.join(", ")}`}>
      <text x="115" y="206" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="2" fill="var(--color-slate)">
        BLOCK A
      </text>
      <text x="319" y="222" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="2" fill="var(--color-slate)">
        BLOCK B
      </text>
      {/* cores */}
      <rect x="98" y="122" width="34" height="54" fill="#E6EEF3" stroke="#9AA9B4" />
      <text x="115" y="152" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--color-ember)">
        A
      </text>
      <rect x="298" y="92" width="48" height="40" fill="#E6EEF3" stroke="#9AA9B4" />
      <text x="322" y="116" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--color-ember)">
        B
      </text>
      <title>{`${foyer} A / B · ${lift}`}</title>
      {CELLS.map((c) => {
        const on = c.type === plan.type;
        const [x, y, w, h] = c.r;
        return (
          <g key={c.label}>
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              fill={on ? "var(--color-blue)" : "#fff"}
              stroke={on ? "var(--color-blue-deep)" : "#9AA9B4"}
              strokeWidth="1.5"
              style={{ transition: "fill .5s var(--ease-out-expo)" }}
            />
            <text x={x + w / 2} y={y + h / 2 - 5} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={on ? "#fff" : "#33373B"} className="mono">
              {c.label}
            </text>
            <text x={x + w / 2} y={y + h / 2 + 11} textAnchor="middle" fontSize="10" fontWeight="600" fill={on ? "#D6EEFA" : "var(--color-ember)"}>
              TYPE-{c.type}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
