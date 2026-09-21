"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { EngineDiagram, type CylinderStatus } from "./EngineDiagram";

type Labels = Dictionary["compression"];
type Unit = "bar" | "psi";

const CYLINDER_COUNTS = [1, 2, 3, 4, 5, 6];
const BAR_TO_PSI = 14.5038;

const parse = (value: string) => {
  const n = parseFloat(value.replace(",", "."));
  return Number.isFinite(n) && n >= 0 ? n : null;
};

const convert = (value: string, from: Unit, to: Unit) => {
  const n = parse(value);
  if (n === null || from === to) return value;
  return to === "psi" ? String(Math.round(n * BAR_TO_PSI)) : String(Math.round((n / BAR_TO_PSI) * 10) / 10);
};

const statusStyle: Record<CylinderStatus, string> = {
  ok: "bg-ok-soft text-ok border-ok",
  low: "bg-bad-soft text-bad border-bad",
  high: "bg-bad-soft text-bad border-bad",
  empty: "bg-surface-hover text-muted border-border",
};

const fieldClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-lg";
const segClass =
  "flex-1 rounded-lg border border-border px-4 py-2.5 font-medium enabled:hover:bg-surface-hover aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-accent-fg disabled:opacity-40";

export function CompressionTool({ labels }: { labels: Labels }) {
  const [count, setCount] = useState(4);
  const [wantsVee, setWantsVee] = useState(false);
  const [unit, setUnit] = useState<Unit>("bar");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [readings, setReadings] = useState<string[]>([]);

  const canVee = count >= 2 && count % 2 === 0;
  const vee = wantsVee && canVee;

  const minN = parse(min);
  const maxN = parse(max);
  const specValid = minN !== null && maxN !== null && minN < maxN;
  const specInvalid = minN !== null && maxN !== null && minN >= maxN;

  const values = Array.from({ length: count }, (_, i) => readings[i] ?? "");
  const statuses: CylinderStatus[] = values.map((v) => {
    const n = parse(v);
    if (n === null) return "empty";
    if (!specValid) return "empty";
    if (n < minN) return "low";
    if (n > maxN) return "high";
    return "ok";
  });

  const checked = statuses.filter((s) => s !== "empty").length;
  const okCount = statuses.filter((s) => s === "ok").length;
  const complete = specValid && checked === count;

  const changeUnit = (next: Unit) => {
    if (next === unit) return;
    setMin(convert(min, unit, next));
    setMax(convert(max, unit, next));
    setReadings(values.map((v) => convert(v, unit, next)));
    setUnit(next);
  };

  const setReading = (i: number, value: string) => {
    const next = [...values];
    next[i] = value;
    setReadings(next);
  };

  const step = unit === "bar" ? "0.1" : "1";
  const statusLabel: Record<CylinderStatus, string> = {
    ok: labels.ok,
    low: labels.low,
    high: labels.high,
    empty: labels.empty,
  };

  return (
    <div className="grid gap-6">
      <section className="rounded-xl border border-border bg-surface p-5" aria-labelledby="ct-engine">
        <h2 id="ct-engine" className="text-lg font-semibold">{labels.layoutTitle}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="ct-count" className="mb-1 block text-sm font-medium text-muted">
              {labels.cylinders}
            </label>
            <select
              id="ct-count"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className={fieldClass}
            >
              {CYLINDER_COUNTS.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          <div role="group" aria-label={labels.architecture}>
            <span className="mb-1 block text-sm font-medium text-muted">{labels.architecture}</span>
            <div className="flex gap-2">
              <button type="button" aria-pressed={!vee} onClick={() => setWantsVee(false)} className={segClass}>
                {labels.inline}
              </button>
              <button type="button" aria-pressed={vee} disabled={!canVee} onClick={() => setWantsVee(true)} className={segClass}>
                {labels.vee}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-surface p-5" aria-labelledby="ct-spec">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="ct-spec" className="text-lg font-semibold">{labels.specTitle}</h2>
          <div role="group" aria-label={labels.unit} className="flex gap-2">
            {(["bar", "psi"] as const).map((u) => (
              <button key={u} type="button" aria-pressed={unit === u} onClick={() => changeUnit(u)} className={`${segClass} min-w-16 py-1.5`}>
                {u}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            { id: "ct-min", label: labels.min, value: min, set: setMin },
            { id: "ct-max", label: labels.max, value: max, set: setMax },
          ].map((f) => (
            <div key={f.id}>
              <label htmlFor={f.id} className="mb-1 block text-sm font-medium text-muted">{f.label} ({unit})</label>
              <input
                id={f.id}
                type="number"
                inputMode="decimal"
                min="0"
                step={step}
                value={f.value}
                onChange={(e) => f.set(e.target.value)}
                className={fieldClass}
              />
            </div>
          ))}
        </div>
        {!specValid && (
          <p className={`mt-3 text-sm ${specInvalid ? "text-bad" : "text-muted"}`} role={specInvalid ? "alert" : undefined}>
            {specInvalid ? labels.specInvalid : labels.specHint}
          </p>
        )}
      </section>

      <section className="rounded-xl border border-border bg-surface p-5" aria-labelledby="ct-readings">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="ct-readings" className="text-lg font-semibold">{labels.readingsTitle}</h2>
          <button
            type="button"
            onClick={() => setReadings([])}
            className="text-sm font-medium text-accent underline-offset-2 hover:underline"
          >
            {labels.reset}
          </button>
        </div>

        <div className="mt-4">
          <EngineDiagram
            count={count}
            vee={vee}
            statuses={statuses}
            values={values}
            label={`${labels.diagram}: ${count}, ${vee ? labels.vee : labels.inline}`}
          />
        </div>

        <ul className="mt-6 grid gap-3">
          {values.map((value, i) => (
            <li key={i} className="grid grid-cols-[1fr_auto] items-center gap-3 sm:grid-cols-[8rem_1fr_9rem]">
              <label htmlFor={`ct-cyl-${i}`} className="font-medium sm:col-auto">
                {labels.cylinder} {i + 1}
              </label>
              <span className="order-3 col-span-2 sm:order-none sm:col-span-1">
                <input
                  id={`ct-cyl-${i}`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step={step}
                  value={value}
                  placeholder={unit}
                  onChange={(e) => setReading(i, e.target.value)}
                  className={fieldClass}
                />
              </span>
              <span className={`rounded-full border px-3 py-1 text-center text-sm font-semibold ${statusStyle[statuses[i]]}`}>
                {statuses[i] === "ok" ? "✓ " : statuses[i] === "empty" ? "" : "✕ "}
                {statusLabel[statuses[i]]}
              </span>
            </li>
          ))}
        </ul>

        {checked > 0 && (
          <div aria-live="polite" className="mt-6 rounded-lg bg-surface-hover p-4">
            <p className="font-semibold">
              {labels.summary.replace("{ok}", String(okCount)).replace("{total}", String(count))}
            </p>
            {complete && (
              <p className={`mt-1 ${okCount === count ? "text-ok" : "text-bad"}`}>
                {okCount === count ? labels.allOk : labels.someBad}
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
