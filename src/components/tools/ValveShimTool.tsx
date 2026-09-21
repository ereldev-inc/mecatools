"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import type { CylinderStatus } from "./EngineDiagram";
import { computeShim, type ShimResult } from "@/lib/shims";
import { ValveDiagram, type CylinderValves } from "./ValveDiagram";
import {
  EngineConfigPanel,
  EngineGrid,
  SpecPanel,
  card,
  fieldClass,
  inputTone,
  key,
  parse,
  useEngineConfig,
  useSpec,
  valveTypes,
  type ValveLabels,
  type ValveType,
} from "./valve-common";

type Labels = Dictionary["shims"];

const STEPS = ["0.025", "0.05", "0"];
const fmt = (n: number) => String(Math.round(n * 1000) / 1000);
const range = (r: ShimResult) =>
  r.resultingMin === r.resultingMax ? fmt(r.resultingMin) : `${fmt(r.resultingMin)}–${fmt(r.resultingMax)}`;
const signed = (n: number) => `${n > 0 ? "+" : ""}${fmt(n)}`;

export function ValveShimTool({ labels, valveLabels }: { labels: Labels; valveLabels: ValveLabels }) {
  const engine = useEngineConfig();
  const specState = useSpec();
  const { spec } = specState;
  const [clearances, setClearances] = useState<Record<string, string>>({});
  const [clearancesMax, setClearancesMax] = useState<Record<string, string>>({});
  const [shims, setShims] = useState<Record<string, string>>({});
  const [step, setStep] = useState("0.05");

  // Measured clearance is a range; a single value counts as an exact measurement.
  const measuredRange = (k: string): [number, number] | null => {
    const a = parse(clearances[k] ?? "");
    const b = parse(clearancesMax[k] ?? "");
    if (a === null && b === null) return null;
    const lo = a ?? (b as number);
    const hi = b ?? lo;
    return [Math.min(lo, hi), Math.max(lo, hi)];
  };

  const statusFor = (k: string, type: ValveType): CylinderStatus => {
    const range = measuredRange(k);
    const min = parse(spec[type].min);
    const max = parse(spec[type].max);
    if (!range || min === null || max === null || min >= max) return "empty";
    if (range[0] < min) return "low";
    if (range[1] > max) return "high";
    return "ok";
  };

  const compute = (c: number, type: ValveType, v: number): ShimResult | null => {
    const k = key(c, type, v);
    const range = measuredRange(k);
    const shim = parse(shims[k] ?? "");
    const min = parse(spec[type].min);
    const max = parse(spec[type].max);
    if (!range || shim === null || shim <= 0 || min === null || max === null || min >= max) return null;
    return computeShim(range[0], range[1], shim, min, max, Number(step));
  };

  const cylinders: CylinderValves[] = Array.from({ length: engine.count }, (_, c) => {
    const build = (type: ValveType) =>
      Array.from({ length: engine.counts[type] }, (_, v) => {
        const k = key(c, type, v);
        const result = compute(c, type, v);
        return {
          status: statusFor(k, type),
          value: result ? fmt(result.newShim) : "",
        };
      });
    return { intake: build("intake"), exhaust: build("exhaust") };
  });

  // Every computed valve, to summarise and build the shopping list.
  const results = Array.from({ length: engine.count }, (_, c) =>
    valveTypes.flatMap((type) =>
      Array.from({ length: engine.counts[type] }, (_, v) => compute(c, type, v)),
    ),
  )
    .flat()
    .filter((r): r is ShimResult => r !== null);

  const toChange = results.filter((r) => !r.keep);
  const order = new Map<number, number>();
  toChange.forEach((r) => order.set(r.newShim, (order.get(r.newShim) ?? 0) + 1));
  const total = cylinders.reduce((n, c) => n + c.intake.length + c.exhaust.length, 0);

  const cylinderCard = (c: number) => (
    <div key={c} className="rounded-lg border border-border bg-background p-3">
      <h3 className="mb-2 font-semibold">
        {valveLabels.cylinder} {c + 1}
      </h3>
      {valveTypes.map((type) => (
        <div key={type} className="mt-3">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">
            {type === "intake" ? valveLabels.intake : valveLabels.exhaust}
          </p>
          <div className="grid gap-3">
            {cylinders[c][type].map((reading, v) => {
              const k = key(c, type, v);
              const short = type === "intake" ? valveLabels.intakeShort : valveLabels.exhaustShort;
              const result = compute(c, type, v);
              return (
                <div key={k} className="grid grid-cols-[2.75rem_repeat(3,minmax(0,1fr))] items-center gap-2">
                  <span className="text-sm font-semibold text-muted">
                    {short}
                    {v + 1}
                  </span>
                  {(["", "2"] as const).map((suffix) => {
                    const isMax = suffix === "2";
                    const caption = isMax ? labels.clearanceMax : labels.clearanceMin;
                    return (
                      <div key={suffix}>
                        <label htmlFor={`vs-c${suffix}-${k}`} className="sr-only">
                          {valveLabels.cylinder} {c + 1} {short}
                          {v + 1} {caption}
                        </label>
                        <input
                          id={`vs-c${suffix}-${k}`}
                          type="number"
                          inputMode="decimal"
                          min="0"
                          step="0.01"
                          placeholder={caption}
                          value={(isMax ? clearancesMax : clearances)[k] ?? ""}
                          onChange={(e) =>
                            isMax
                              ? setClearancesMax({ ...clearancesMax, [k]: e.target.value })
                              : setClearances({ ...clearances, [k]: e.target.value })
                          }
                          className={`w-full min-w-0 rounded-lg border px-2 py-2 text-center font-semibold ${inputTone[reading.status]}`}
                        />
                      </div>
                    );
                  })}
                  <div>
                    <label htmlFor={`vs-s-${k}`} className="sr-only">
                      {valveLabels.cylinder} {c + 1} {short}
                      {v + 1} {labels.shim}
                    </label>
                    <input
                      id={`vs-s-${k}`}
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="0.001"
                      placeholder={labels.shim}
                      value={shims[k] ?? ""}
                      onChange={(e) => setShims({ ...shims, [k]: e.target.value })}
                      className="w-full min-w-0 rounded-lg border border-border bg-background px-2 py-2 text-center font-semibold"
                    />
                  </div>
                  {result && (
                    <p
                      className={`col-span-4 text-sm font-semibold ${result.keep ? "text-ok" : "text-bad"}`}
                      aria-live="polite"
                    >
                      {result.keep
                        ? `✓ ${labels.keep}`
                        : `✕ ${labels.fit.replace("{shim}", fmt(result.newShim))} (${signed(result.delta)}) ${labels.resulting.replace("{value}", range(result))}`}
                      {result.outOfReach && <span className="block text-bad">{labels.outOfReach}</span>}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="grid gap-6">
      <section className={card} aria-label={valveLabels.diagram}>
        <ValveDiagram
          cylinders={cylinders}
          vee={engine.vee}
          label={`${valveLabels.diagram}: ${engine.count}, ${engine.vee ? valveLabels.vee : valveLabels.inline}`}
          intakeShort={valveLabels.intakeShort}
          exhaustShort={valveLabels.exhaustShort}
        />
        <p className="mt-3 text-center text-sm text-muted">{labels.legend}</p>
      </section>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="grid gap-6">
          <EngineConfigPanel labels={valveLabels} engine={engine} />
          <SpecPanel labels={valveLabels} state={specState} />
          <section className={card} aria-labelledby="vs-step">
            <h2 id="vs-step" className="text-lg font-semibold">
              {labels.stepTitle}
            </h2>
            <label htmlFor="vs-step-select" className="sr-only">
              {labels.stepTitle}
            </label>
            <select id="vs-step-select" value={step} onChange={(e) => setStep(e.target.value)} className={`${fieldClass} mt-4`}>
              {STEPS.map((s) => (
                <option key={s} value={s}>
                  {s === "0" ? labels.stepExact : `${s} mm`}
                </option>
              ))}
            </select>
            <p className="mt-2 text-sm text-muted">{labels.stepHint}</p>
          </section>
        </div>

        <section className={card} aria-labelledby="vs-readings">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="vs-readings" className="text-lg font-semibold">
              {labels.readingsTitle}
            </h2>
            <button
              type="button"
              onClick={() => {
                setClearances({});
                setClearancesMax({});
                setShims({});
              }}
              className="text-sm font-medium text-accent underline-offset-2 hover:underline"
            >
              {valveLabels.reset}
            </button>
          </div>

          <p className="mt-2 text-sm text-muted">{labels.rangeHint}</p>

          <EngineGrid labels={valveLabels} engine={engine} renderCylinder={cylinderCard} columns="" />

          {results.length > 0 && (
            <div aria-live="polite" className="mt-6 rounded-lg bg-surface-hover p-4">
              <p className="font-semibold">
                {toChange.length === 0
                  ? labels.nothing
                  : labels.summary.replace("{n}", String(toChange.length)).replace("{total}", String(total))}
              </p>
              {order.size > 0 && (
                <>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-muted">{labels.orderTitle}</p>
                  <ul className="mt-1 grid gap-1">
                    {[...order.entries()]
                      .sort((a, b) => a[0] - b[0])
                      .map(([shim, n]) => (
                        <li key={shim} className="font-semibold">
                          {labels.orderLine.replace("{shim}", fmt(shim)).replace("{count}", String(n))}
                        </li>
                      ))}
                  </ul>
                </>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
