export type CylinderStatus = "ok" | "low" | "high" | "empty";

const R = 30;
const SPACING = 72;
const PAD = R + 6;
const SIN45 = Math.SQRT1_2;

type Pos = { x: number; y: number };

/** Cylinder centers (before padding) for an inline or 90° V layout. */
function layout(count: number, vee: boolean): { pos: Pos[]; w: number; h: number } {
  if (!vee) {
    return {
      pos: Array.from({ length: count }, (_, i) => ({ x: i * SPACING, y: 0 })),
      w: (count - 1) * SPACING,
      h: 0,
    };
  }
  const perBank = count / 2;
  const offset = perBank === 1 ? 70 : 60;
  // Pivot at the crankshaft (origin); banks rise to the left and right.
  // Cylinders alternate between banks: 1 left, 2 right, 3 left, ...
  const pos = Array.from({ length: count }, (_, i) => {
    const side = i % 2 === 0 ? -1 : 1;
    const d = offset + Math.floor(i / 2) * SPACING;
    return { x: side * SIN45 * d, y: -SIN45 * d };
  });
  return { pos, w: 0, h: 0 };
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
  const { pos } = layout(count, vee);
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
