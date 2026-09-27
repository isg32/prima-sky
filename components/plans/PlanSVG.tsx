"use client";

import { useId, useRef } from "react";
import type { Room, RoomKind, UnitPlan } from "@/lib/project";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

const FILL: Record<RoomKind, string> = {
  bedroom: "#ECE6DA",
  drawing: "#E3DFD5",
  dining: "#E3DFD5",
  kitchen: "#E3DFD5",
  vestibule: "#E3DFD5",
  store: "#F5F3EF",
  toilet: "#BFD3DB",
  washyard: "#D2C9C6",
  balcony: "#D2C9C6",
};

export function roomName(room: Room, names: Record<RoomKind, string>) {
  return `${names[room.kind]}${room.n ? ` ${room.n}` : ""}`;
}

export default function PlanSVG({
  plan,
  names,
  puja,
  entry,
  active,
  onActive,
}: {
  plan: UnitPlan;
  names: Record<RoomKind, string>;
  puja: string;
  entry: string;
  active: string | null;
  onActive: (id: string | null) => void;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const seen = useRef(false);
  const uid = useId().replace(/:/g, "");
  const [W, H] = plan.viewBox;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
        tl.from("[data-planter]", { scaleY: 0, transformOrigin: "50% 100%", duration: 0.8, stagger: 0.04 })
          .from("[data-floor]", { autoAlpha: 0, duration: 0.6 }, 0)
          .fromTo("[data-wall]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4, stagger: 0.035, ease: "power2.inOut" }, 0.05)
          .from("[data-fill]", { autoAlpha: 0, duration: 0.8, stagger: 0.035 }, 0.5)
          .from("[data-label]", { autoAlpha: 0, y: 10, duration: 0.8, stagger: 0.03 }, 0.8)
          .from("[data-entry]", { autoAlpha: 0, scale: 0.3, transformOrigin: "center", duration: 0.8, ease: "back.out(2.5)" }, 1.1);

        if (seen.current) tl.play();
        else {
          seen.current = true;
          ScrollTrigger.create({ trigger: ref.current, start: "top 75%", once: true, onEnter: () => tl.play() });
        }
      });
    },
    { scope: ref, dependencies: [plan.type], revertOnUpdate: true },
  );

  const arrow = (() => {
    const { x, y, dir } = plan.entry;
    const rot = dir === "left" ? 180 : dir === "down" ? 90 : 0;
    return (
      <g data-entry transform={`translate(${x} ${y}) rotate(${rot})`} aria-label={entry}>
        <path d="M-34 -16 L0 0 L-34 16 L-26 0 Z" fill="var(--color-ember)" />
        <path d="M-46 -16 L-12 0 L-46 16" fill="none" stroke="var(--color-ember)" strokeWidth="3" />
      </g>
    );
  })();

  return (
    <svg
      ref={ref}
      viewBox={(() => {
        // grow the frame so the entry arrow (drawn outside the wall) is never clipped
        const { x, y, dir } = plan.entry;
        const minX = Math.min(-10, dir === "right" ? x - 50 : -10);
        const maxX = Math.max(W + 10, dir === "left" ? x + 50 : 0);
        const minY = Math.min(-10, dir === "down" ? y - 50 : -10);
        return `${minX} ${minY} ${maxX - minX} ${H + 10 - minY}`;
      })()}
      className="h-auto w-full select-none"
      role="img"
      aria-label={`${plan.block}-${plan.type}`}
      onMouseLeave={() => onActive(null)}
    >
      <defs>
        <pattern id={`wood-${uid}`} width="9" height="9" patternUnits="userSpaceOnUse">
          <rect width="9" height="9" fill={FILL.bedroom} />
          <path d="M0 0V9" stroke="#D9D0BF" strokeWidth="1.2" />
        </pattern>
      </defs>

      {plan.planters.map((r, i) => (
        <rect key={i} data-planter x={r[0]} y={r[1]} width={r[2]} height={r[3]} fill="var(--color-planter)" />
      ))}
      {plan.hall.map((r, i) => (
        <rect key={i} data-floor x={r[0]} y={r[1]} width={r[2]} height={r[3]} fill={FILL.drawing} />
      ))}

      {plan.rooms.map((room) => {
        const [x, y, w, h] = room.r;
        const on = active === room.id;
        return (
          <g
            key={room.id}
            tabIndex={0}
            role="button"
            aria-label={`${roomName(room, names)}${room.dim ? ` ${room.dim}` : ""}`}
            onMouseEnter={() => onActive(room.id)}
            onFocus={() => onActive(room.id)}
            onBlur={() => onActive(null)}
            onClick={() => onActive(on ? null : room.id)}
            className="cursor-pointer outline-none"
          >
            <rect
              data-fill
              x={x}
              y={y}
              width={w}
              height={h}
              fill={room.kind === "bedroom" ? `url(#wood-${uid})` : FILL[room.kind]}
            />
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              fill="var(--color-sky)"
              style={{ opacity: on ? 0.28 : 0, transition: "opacity .45s var(--ease-out-expo)" }}
            />
            <rect
              data-wall
              x={x}
              y={y}
              width={w}
              height={h}
              pathLength={1}
              strokeDasharray="1 1"
              fill="none"
              stroke={on ? "var(--color-blue)" : "#4A4D51"}
              strokeWidth={on ? 9 : 7}
              style={{ transition: "stroke .45s, stroke-width .45s" }}
            />
            <Label room={room} names={names} on={on} />
          </g>
        );
      })}

      <g data-label>
        <rect x={plan.puja[0]} y={plan.puja[1]} width={plan.puja[2]} height={plan.puja[3]} fill="#fff" stroke="#4A4D51" strokeWidth="2" />
        <text
          x={plan.puja[0] + plan.puja[2] / 2}
          y={plan.puja[1] + plan.puja[3] / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="14"
          fontWeight="600"
          fill="#4A4D51"
          transform={plan.puja[3] > plan.puja[2] ? `rotate(-90 ${plan.puja[0] + plan.puja[2] / 2} ${plan.puja[1] + plan.puja[3] / 2})` : undefined}
          className="uppercase"
        >
          {puja}
        </text>
      </g>
      {arrow}
    </svg>
  );
}

function Label({ room, names, on }: { room: Room; names: Record<RoomKind, string>; on: boolean }) {
  const [x, y, w, h] = room.r;
  const cx = x + w / 2;
  const cy = y + h / 2;
  const narrow = w < 60;
  const small = w < 150;
  const name = roomName(room, names);
  const color = on ? "var(--color-blue-deep)" : "#33373B";
  // shrink long names (and Gujarati) to fit the room width
  const nameSize = Math.min(small ? 17 : 22, (w - 18) / (name.length * 0.72));
  const dimSize = Math.min(small ? 14.5 : 18, (w - 14) / ((room.dim?.length ?? 1) * 0.62));

  if (narrow) {
    return (
      <text
        data-label
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="15"
        fontWeight="600"
        letterSpacing="2"
        fill={color}
        transform={`rotate(-90 ${cx} ${cy})`}
        className="uppercase"
      >
        {name}
      </text>
    );
  }
  return (
    <g data-label pointerEvents="none">
      <text x={cx} y={room.dim ? cy - 12 : cy} textAnchor="middle" dominantBaseline="central" fontSize={nameSize} fontWeight="600" letterSpacing="1" fill={color} className="uppercase">
        {name}
      </text>
      {room.dim && (
        <text x={cx} y={cy + 16} textAnchor="middle" dominantBaseline="central" fontSize={dimSize} fill={color} className="mono">
          {room.dim}
        </text>
      )}
    </g>
  );
}
