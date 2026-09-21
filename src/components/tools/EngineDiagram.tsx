import { cylinderLayout } from "@/lib/engine-layout";

export type CylinderStatus = "ok" | "low" | "high" | "empty";

const R = 30;
const SPACING = 72;
const PAD = R + 6;
function layout(count: number, vee: boolean) {
  const offset = count / 2 === 1 ? 70 : 60;
  return cylinderLayout(count, vee, SPACING, offset);
}

export function EngineDiagram({
  count,
  vee,
  statuses,
  values,
  label,
}: {
  count: number;
  vee: boolean;
  statuses: CylinderStatus[];
  values: string[];
  label: string;
}) {
  const pos = layout(count, vee);
  const xs = pos.map((p) => p.x);
  const ys = pos.map((p) => p.y);
  const minX = Math.min(...xs) - PAD;
  const maxX = Math.max(...xs) + PAD;
  const minY = Math.min(...ys) - PAD;
  const maxY = Math.max(...ys) + PAD + (vee ? 26 : 0);

  const fill = { ok: "var(--ok-soft)", low: "var(--bad-soft)", high: "var(--bad-soft)", empty: "var(--surface-hover)" };
  const stroke = { ok: "var(--ok)", low: "var(--bad)", high: "var(--bad)", empty: "var(--border)" };

  return (
    <svg
      viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`}
      role="img"
      aria-label={label}
      className="mx-auto h-auto w-full"
      style={{ maxWidth: Math.min((maxX - minX) * 1.5, 480) }}
    >
      {vee && (
        // crankshaft
        <circle cx={0} cy={0} r={12} fill="var(--surface-hover)" stroke="var(--border)" strokeWidth={2} />
      )}
      {pos.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={R} fill={fill[statuses[i]]} stroke={stroke[statuses[i]]} strokeWidth={3} />
          <text x={p.x} y={p.y - 8} textAnchor="middle" fontSize={12} fill="var(--muted)">
            {i + 1}
          </text>
          <text x={p.x} y={p.y + 10} textAnchor="middle" fontSize={16} fontWeight={700} fill={statuses[i] === "empty" ? "var(--foreground)" : stroke[statuses[i]]}>
            {values[i] || "–"}
          </text>
        </g>
      ))}
    </svg>
  );
}
