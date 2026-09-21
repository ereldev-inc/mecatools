"use client";

import { useState } from "react";
import type { CylinderStatus } from "./EngineDiagram";
import { ValveDiagram, type CylinderValves } from "./ValveDiagram";
import {
  EngineConfigPanel,
  EngineGrid,
  SpecPanel,
  card,
  inputTone,
  key,
  statusOf,
  useEngineConfig,
  useSpec,
  valveTypes,
  type ValveLabels,
} from "./valve-common";

export function ValveClearanceTool({ labels }: { labels: ValveLabels }) {
  const engine = useEngineConfig();
  const specState = useSpec();
  const { spec } = specState;
  const [readings, setReadings] = useState<Record<string, string>>({});

  const cylinders: CylinderValves[] = Array.from({ length: engine.count }, (_, c) => {
    const build = (type: "intake" | "exhaust") =>
      Array.from({ length: engine.counts[type] }, (_, v) => {
        const value = readings[key(c, type, v)] ?? "";
        return { value, status: statusOf(value, spec[type]) };
      });
    return { intake: build("intake"), exhaust: build("exhaust") };
  });

  const all = cylinders.flatMap((c) => [...c.intake, ...c.exhaust]);
  const measured = all.filter((v) => v.status !== "empty").length;
  const okCount = all.filter((v) => v.status === "ok").length;
  const complete = measured === all.length;

  const statusLabel: Record<CylinderStatus, string> = {
    ok: labels.ok,
    low: labels.low,
    high: labels.high,
    empty: "",
  };

  const cylinderCard = (c: number) => (
    <div key={c} className="rounded-lg border border-border bg-background p-3">
      <h3 className="mb-2 font-semibold">
        {labels.cylinder} {c + 1}
      </h3>
      {valveTypes.map((type) => (
        <div key={type} className="mt-2">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">
            {type === "intake" ? labels.intake : labels.exhaust}
          </p>
          <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${engine.counts[type]}, minmax(0, 1fr))` }}>
            {cylinders[c][type].map((reading, v) => {
              const short = type === "intake" ? labels.intakeShort : labels.exhaustShort;
              const id = `vc-${key(c, type, v)}`;
              return (
                <div key={id}>
                  <label htmlFor={id} className="sr-only">
                    {labels.cylinder} {c + 1} {short}
                    {v + 1}
                  </label>
                  <input
                    id={id}
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.01"
                    placeholder={`${short}${v + 1}`}
                    value={reading.value}
                    onChange={(e) => setReadings({ ...readings, [key(c, type, v)]: e.target.value })}
                    aria-invalid={reading.status === "low" || reading.status === "high"}
                    title={statusLabel[reading.status] || undefined}
                    className={`w-full min-w-0 rounded-lg border px-2 py-2 text-center text-base font-semibold ${inputTone[reading.status]}`}
                  />
                  <p className={`mt-0.5 h-4 text-center text-[11px] font-semibold ${reading.status === "ok" ? "text-ok" : "text-bad"}`}>
                    {reading.status === "empty" ? "" : `${reading.status === "ok" ? "✓" : "✕"} ${statusLabel[reading.status]}`}
                  </p>
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
      <section className={card} aria-label={labels.diagram}>
        <ValveDiagram
          cylinders={cylinders}
          vee={engine.vee}
          label={`${labels.diagram}: ${engine.count}, ${engine.vee ? labels.vee : labels.inline}`}
          intakeShort={labels.intakeShort}
          exhaustShort={labels.exhaustShort}
        />
      </section>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="grid gap-6">
          <EngineConfigPanel labels={labels} engine={engine} />
          <SpecPanel labels={labels} state={specState} />
        </div>

        <section className={card} aria-labelledby="vc-readings">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="vc-readings" className="text-lg font-semibold">
              {labels.readingsTitle}
            </h2>
            <button
              type="button"
              onClick={() => setReadings({})}
              className="text-sm font-medium text-accent underline-offset-2 hover:underline"
            >
              {labels.reset}
            </button>
          </div>

          <EngineGrid labels={labels} engine={engine} renderCylinder={cylinderCard} />

          {measured > 0 && (
            <div aria-live="polite" className="mt-6 rounded-lg bg-surface-hover p-4">
              <p className="font-semibold">
                {labels.summary.replace("{ok}", String(okCount)).replace("{total}", String(all.length))}
              </p>
              {complete && (
                <p className={`mt-1 ${okCount === all.length ? "text-ok" : "text-bad"}`}>
                  {okCount === all.length ? labels.allOk : labels.someBad}
                </p>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
