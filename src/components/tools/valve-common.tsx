"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import type { CylinderStatus } from "./EngineDiagram";

export type ValveLabels = Dictionary["valves"];
export type ValveType = "intake" | "exhaust";
export type Range = { min: string; max: string };

/** Exhaust first: matches an engine seen from the riding direction. */
export const valveTypes = ["exhaust", "intake"] as const;

export const CYLINDER_COUNTS = [1, 2, 3, 4, 5, 6];
export const VALVE_COUNTS = [1, 2, 3];

export const parse = (value: string) => {
  const n = parseFloat(value.replace(",", "."));
  return Number.isFinite(n) && n >= 0 ? n : null;
};

export const statusOf = (value: string, range: Range): CylinderStatus => {
  const n = parse(value);
  const min = parse(range.min);
  const max = parse(range.max);
  if (n === null || min === null || max === null || min >= max) return "empty";
  if (n < min) return "low";
  if (n > max) return "high";
  return "ok";
};

export const key = (cyl: number, type: ValveType, valve: number) => `${cyl}-${type}-${valve}`;

export const fieldClass = "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-lg";
export const segClass =
  "flex-1 rounded-lg border border-border px-4 py-2.5 font-medium enabled:hover:bg-surface-hover aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-accent-fg disabled:opacity-40";
export const inputTone: Record<CylinderStatus, string> = {
  ok: "border-ok bg-ok-soft text-ok",
  low: "border-bad bg-bad-soft text-bad",
  high: "border-bad bg-bad-soft text-bad",
  empty: "border-border bg-background",
};
export const card = "rounded-xl border border-border bg-surface p-5";

export function useEngineConfig() {
  const [count, setCount] = useState(4);
  const [wantsVee, setWantsVee] = useState(false);
  const [intakeCount, setIntakeCount] = useState(2);
  const [exhaustCount, setExhaustCount] = useState(2);
  const canVee = count >= 2 && count % 2 === 0;
  return {
    count,
    setCount,
    setWantsVee,
    canVee,
    vee: wantsVee && canVee,
    intakeCount,
    setIntakeCount,
    exhaustCount,
    setExhaustCount,
    counts: { intake: intakeCount, exhaust: exhaustCount } as Record<ValveType, number>,
  };
}
export type EngineConfig = ReturnType<typeof useEngineConfig>;

export function useSpec() {
  const [spec, setSpec] = useState<Record<ValveType, Range>>({
    intake: { min: "", max: "" },
    exhaust: { min: "", max: "" },
  });
  const setField = (type: ValveType, field: keyof Range, value: string) =>
    setSpec((s) => ({ ...s, [type]: { ...s[type], [field]: value } }));
  const invalid = (type: ValveType) => {
    const min = parse(spec[type].min);
    const max = parse(spec[type].max);
    return min !== null && max !== null && min >= max;
  };
  const ready = valveTypes.every((t) => {
    const min = parse(spec[t].min);
    const max = parse(spec[t].max);
    return min !== null && max !== null && min < max;
  });
  return { spec, setField, invalid, ready };
}
export type SpecState = ReturnType<typeof useSpec>;

export function CountSelect({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  options: number[];
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-muted">
        {label}
      </label>
      <select id={id} value={value} onChange={(e) => onChange(Number(e.target.value))} className={fieldClass}>
        {options.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </div>
  );
}

export function EngineConfigPanel({ labels, engine }: { labels: ValveLabels; engine: EngineConfig }) {
  return (
    <section className={card} aria-labelledby="vc-engine">
      <h2 id="vc-engine" className="text-lg font-semibold">
        {labels.engineTitle}
      </h2>
      <div className="mt-4 grid gap-4">
        <CountSelect id="vc-count" label={labels.cylinders} value={engine.count} options={CYLINDER_COUNTS} onChange={engine.setCount} />
        <div role="group" aria-label={labels.architecture}>
          <span className="mb-1 block text-sm font-medium text-muted">{labels.architecture}</span>
          <div className="flex gap-2">
            <button type="button" aria-pressed={!engine.vee} onClick={() => engine.setWantsVee(false)} className={segClass}>
              {labels.inline}
            </button>
            <button type="button" aria-pressed={engine.vee} disabled={!engine.canVee} onClick={() => engine.setWantsVee(true)} className={segClass}>
              {labels.vee}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <CountSelect id="vc-exhaust" label={labels.exhaustValves} value={engine.exhaustCount} options={VALVE_COUNTS} onChange={engine.setExhaustCount} />
          <CountSelect id="vc-intake" label={labels.intakeValves} value={engine.intakeCount} options={VALVE_COUNTS} onChange={engine.setIntakeCount} />
        </div>
      </div>
    </section>
  );
}

export function SpecPanel({ labels, state }: { labels: ValveLabels; state: SpecState }) {
  const { spec, setField, invalid, ready } = state;
  return (
    <section className={card} aria-labelledby="vc-spec">
      <h2 id="vc-spec" className="text-lg font-semibold">
        {labels.specTitle}
      </h2>
      <div className="mt-4 grid gap-4">
        {valveTypes.map((type) => (
          <fieldset key={type}>
            <legend className="mb-1 text-sm font-medium text-muted">
              {type === "intake" ? labels.intake : labels.exhaust}
            </legend>
            <div className="grid grid-cols-2 gap-4">
              {(["min", "max"] as const).map((field) => (
                <div key={field}>
                  <label htmlFor={`vc-${type}-${field}`} className="sr-only">
                    {type === "intake" ? labels.intake : labels.exhaust} {labels[field]}
                  </label>
                  <input
                    id={`vc-${type}-${field}`}
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.01"
                    placeholder={labels[field]}
                    value={spec[type][field]}
                    onChange={(e) => setField(type, field, e.target.value)}
                    className={fieldClass}
                  />
                </div>
              ))}
            </div>
            {invalid(type) && (
              <p role="alert" className="mt-2 text-sm text-bad">
                {labels.specInvalid}
              </p>
            )}
          </fieldset>
        ))}
      </div>
      {!ready && !invalid("intake") && !invalid("exhaust") && (
        <p className="mt-3 text-sm text-muted">{labels.specHint}</p>
      )}
    </section>
  );
}

/** Cylinder cards laid out like the engine: one grid inline, two banks for a V. */
export function EngineGrid({
  labels,
  engine,
  renderCylinder,
  columns = "sm:grid-cols-2",
}: {
  labels: ValveLabels;
  engine: EngineConfig;
  renderCylinder: (c: number) => React.ReactNode;
  columns?: string;
}) {
  const ids = Array.from({ length: engine.count }, (_, c) => c);
  if (!engine.vee) {
    return <div className={`mt-4 grid gap-3 ${columns}`}>{ids.map(renderCylinder)}</div>;
  }
  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2">
      {[
        { title: labels.bankLeft, ids: ids.filter((c) => c % 2 === 0) },
        { title: labels.bankRight, ids: ids.filter((c) => c % 2 === 1) },
      ].map((bank) => (
        <div key={bank.title}>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted">{bank.title}</h3>
          <div className="grid gap-3">{bank.ids.map(renderCylinder)}</div>
        </div>
      ))}
    </div>
  );
}
