import { cylinderLayout } from "@/lib/engine-layout";
import type { CylinderStatus } from "./EngineDiagram";

export type ValveReading = { status: CylinderStatus; value: string };
export type CylinderValves = { intake: ValveReading[]; exhaust: ValveReading[] };

const PITCH = 36;
const VALVE_R = 16;
const BOX_H = 112;
const GAP = 12;
const SIN45 = Math.SQRT1_2;

const fill = { ok: "var(--ok-soft)", low: "var(--bad-soft)", high: "var(--bad-soft)", empty: "var(--surface-hover)" };
const stroke = { ok: "var(--ok)", low: "var(--bad)", high: "var(--bad)", empty: "var(--border)" };

function cylinderStatus(c: CylinderValves): CylinderStatus {
  const all = [...c.intake, ...c.exhaust];
  const bad = all.find((v) => v.status === "low" || v.status === "high");
  if (bad) return bad.status;
  return all.every((v) => v.status === "ok") ? "ok" : "empty";
}

export function ValveDiagram({
  cylinders,
  vee,
  label,
  intakeShort,
  exhaustShort,
}: {
  cylinders: CylinderValves[];
  vee: boolean;
  label: string;
  intakeShort: string;
  exhaustShort: string;
}) {
  const count = cylinders.length;
  const maxValves = Math.max(...cylinders.flatMap((c) => [c.intake.length, c.exhaust.length]));
  const boxW = maxValves * PITCH + 16;

  const spacing = vee ? (Math.min(boxW, BOX_H) + GAP) / SIN45 : boxW + GAP;
  const offset = vee ? (boxW + GAP) / (2 * SIN45) : 0;
  const pos = cylinderLayout(count, vee, spacing, offset);

  const minX = Math.min(...pos.map((p) => p.x)) - boxW / 2 - 4;
  const maxX = Math.max(...pos.map((p) => p.x)) + boxW / 2 + 4;
  const minY = Math.min(...pos.map((p) => p.y)) - BOX_H / 2 - 4;
  const maxY = Math.max(...pos.map((p) => p.y)) + BOX_H / 2 + 4 + (vee ? 30 : 0);
  const width = maxX - minX;

  const row = (valves: ValveReading[], cy: number, tag: string, cx: number) =>
    valves.map((v, j) => {
      const x = cx + (j - (valves.length - 1) / 2) * PITCH;
      return (
        <g key={`${tag}${j}`}>
          <circle cx={x} cy={cy} r={VALVE_R} fill={fill[v.status]} stroke={stroke[v.status]} strokeWidth={2.5} />
          <text x={x} y={cy - 4} textAnchor="middle" fontSize={8} fill="var(--muted)">
            {tag}
            {j + 1}
          </text>
          <text
            x={x}
            y={cy + 9}
            textAnchor="middle"
            fontSize={11}
            fontWeight={700}
            fill={v.status === "empty" ? "var(--foreground)" : stroke[v.status]}
          >
            {v.value || "–"}
          </text>
        </g>
      );
    });

  return (
    <svg
      viewBox={`${minX} ${minY} ${width} ${maxY - minY}`}
      role="img"
      aria-label={label}
      className="mx-auto h-auto w-full"
      style={{ maxWidth: Math.min(width * 1.4, 720) }}
    >
      {vee && <circle cx={0} cy={0} r={12} fill="var(--surface-hover)" stroke="var(--border)" strokeWidth={2} />}
      {pos.map((p, i) => {
        const status = cylinderStatus(cylinders[i]);
        return (
          <g key={i}>
            <rect
              x={p.x - boxW / 2}
              y={p.y - BOX_H / 2}
              width={boxW}
              height={BOX_H}
              rx={12}
              fill="var(--surface)"
              stroke={stroke[status]}
              strokeWidth={3}
            />
            <text x={p.x} y={p.y - BOX_H / 2 + 17} textAnchor="middle" fontSize={13} fontWeight={700} fill="var(--foreground)">
              {i + 1}
            </text>
            {row(cylinders[i].exhaust, p.y - 10, exhaustShort, p.x)}
            {row(cylinders[i].intake, p.y + 32, intakeShort, p.x)}
          </g>
        );
      })}
    </svg>
  );
}
