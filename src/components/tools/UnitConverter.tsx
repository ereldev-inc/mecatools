"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import type { ConverterUnit } from "@/lib/converters";

const parse = (value: string) => {
  const n = parseFloat(value.replace(",", "."));
  return Number.isFinite(n) ? n : null;
};

const format = (n: number) => String(Number(n.toPrecision(6)));

export function UnitConverter({
  units,
  defaultUnit,
  labels,
}: {
  units: ConverterUnit[];
  defaultUnit: string;
  labels: Dictionary["converter"];
}) {
  // The last edited field is the source of truth; the others are derived.
  const [source, setSource] = useState({ unit: defaultUnit, value: "" });

  const base = (() => {
    const n = parse(source.value);
    const unit = units.find((u) => u.id === source.unit);
    return n === null || !unit ? null : n * unit.factor;
  })();

  const displayed = (unit: ConverterUnit) => {
    if (unit.id === source.unit) return source.value;
    return base === null ? "" : format(base / unit.factor);
  };

  return (
    <section className="rounded-xl border border-border bg-surface p-5">
      <p className="text-sm text-muted">{labels.swapHint}</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {units.map((unit) => (
          <div key={unit.id}>
            <label htmlFor={`conv-${unit.id}`} className="mb-1 block text-sm font-medium text-muted">
              {labels.valueLabel} ({unit.symbol})
            </label>
            <div className="flex items-center gap-2">
              <input
                id={`conv-${unit.id}`}
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={displayed(unit)}
                onChange={(e) => setSource({ unit: unit.id, value: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-lg"
              />
              <span className="w-16 shrink-0 font-semibold text-accent">{unit.symbol}</span>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setSource({ unit: defaultUnit, value: "" })}
        className="mt-4 text-sm font-medium text-accent underline-offset-2 hover:underline"
      >
        {labels.clear}
      </button>
    </section>
  );
}
