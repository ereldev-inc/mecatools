export type Pos = { x: number; y: number };

const SIN45 = Math.SQRT1_2;

/**
 * Cylinder centers for an inline or 90° V layout (crankshaft at the origin for V).
 * V cylinders alternate between banks: 1 left, 2 right, 3 left, ...
 */
export function cylinderLayout(
  count: number,
  vee: boolean,
  spacing: number,
  offset: number,
): Pos[] {
  if (!vee) {
    return Array.from({ length: count }, (_, i) => ({ x: i * spacing, y: 0 }));
  }
  return Array.from({ length: count }, (_, i) => {
    const side = i % 2 === 0 ? -1 : 1;
    const d = offset + Math.floor(i / 2) * spacing;
    return { x: side * SIN45 * d, y: -SIN45 * d };
  });
}
