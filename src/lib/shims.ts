export type ShimResult = {
  /** Shim to fit, in mm (the current one when the clearance is already in range). */
  newShim: number;
  /** Difference with the current shim (positive = thicker). */
  delta: number;
  /** Clearance range expected once the new shim is fitted. */
  resultingMin: number;
  resultingMax: number;
  /** True when the measured range is already fully within the standard range. */
  keep: boolean;
  /** True when the resulting range is still not within the standard range. */
  outOfReach: boolean;
};

const round = (n: number) => Math.round(n * 1000) / 1000;

/**
 * The clearance is measured as a range [clearanceMin, clearanceMax] (feeler gauges).
 * A thicker shim reduces the clearance: resulting = clearance - (newShim - shim).
 * The new shim brings the middle of the measured range as close as possible to the
 * middle of the standard range, snapped to available sizes (`step`, 0 = exact),
 * preferring sizes whose resulting range fits entirely in the standard range.
 */
export function computeShim(
  clearanceMin: number,
  clearanceMax: number,
  shim: number,
  min: number,
  max: number,
  step: number,
): ShimResult {
  const fits = (lo: number, hi: number) => lo >= min && hi <= max;

  if (fits(clearanceMin, clearanceMax)) {
    return {
      newShim: shim,
      delta: 0,
      resultingMin: clearanceMin,
      resultingMax: clearanceMax,
      keep: true,
      outOfReach: false,
    };
  }

  const measuredMiddle = (clearanceMin + clearanceMax) / 2;
  const targetMiddle = (min + max) / 2;
  const ideal = shim + measuredMiddle - targetMiddle;
  const nearest = step > 0 ? Math.round(ideal / step) * step : ideal;
  const candidates = (step > 0 ? [nearest, nearest - step, nearest + step] : [nearest])
    .map(round)
    .filter((c) => c > 0);

  const scored = (candidates.length ? candidates : [round(nearest)]).map((c) => {
    const lo = round(clearanceMin - (c - shim));
    const hi = round(clearanceMax - (c - shim));
    return { c, lo, hi, inside: fits(lo, hi), distance: Math.abs((lo + hi) / 2 - targetMiddle) };
  });
  scored.sort((a, b) => Number(b.inside) - Number(a.inside) || a.distance - b.distance);
  const best = scored[0];

  return {
    newShim: best.c,
    delta: round(best.c - shim),
    resultingMin: best.lo,
    resultingMax: best.hi,
    keep: false,
    outOfReach: !best.inside,
  };
}
