"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { ageInMonths, decodeDot } from "@/lib/dot";

type Labels = Dictionary["tire"];
type Level = "good" | "check" | "replace";

const card = "rounded-xl border border-border bg-surface p-5";
const tone: Record<Level, string> = {
  good: "border-ok bg-ok-soft text-ok",
  check: "border-accent bg-accent-soft text-accent",
  replace: "border-bad bg-bad-soft text-bad",
};

function levelFor(months: number): Level {
  if (months < 60) return "good";
  if (months < 120) return "check";
  return "replace";
}

function CodeIllustration({ labels }: { labels: Labels }) {
  return (
    <svg viewBox="0 0 360 120" role="img" aria-label={labels.illustration} className="mx-auto h-auto w-full max-w-md">
      <rect x="4" y="20" width="352" height="52" rx="26" fill="var(--surface-hover)" stroke="var(--border)" strokeWidth="2" />
      <text x="24" y="53" fontSize="20" fontFamily="monospace" fill="var(--muted)">
        DOT 4B3X 5BZ
      </text>
      <rect x="236" y="30" width="96" height="32" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="2.5" />
      <text x="284" y="54" fontSize="22" fontWeight="700" fontFamily="monospace" textAnchor="middle" fill="var(--accent)">
        2319
      </text>
      <path d="M260 66v18M308 66v18" stroke="var(--accent)" strokeWidth="2" />
      <text x="260" y="102" fontSize="13" textAnchor="middle" fill="var(--foreground)">
        {labels.weekPart}
      </text>
      <text x="308" y="116" fontSize="13" textAnchor="middle" fill="var(--foreground)">
        {labels.yearPart}
      </text>
    </svg>
  );
}

function TireResult({ code, locale, labels }: { code: string; locale: Locale; labels: Labels }) {
  if (!code.trim()) return null;
  const now = new Date();
  const result = decodeDot(code, now);

  if (!result.ok) {
    const message =
      result.reason === "incomplete" ? labels.incomplete : result.reason === "week" ? labels.invalidWeek : labels.future;
    return (
      <p role="status" className="mt-3 text-sm text-muted">
        {message}
      </p>
    );
  }

  const months = ageInMonths(result.date, now);
  const level = result.preTwoThousand ? "replace" : levelFor(months);
  const years = Math.floor(months / 12);
  const monthsLeft = months % 12;
  const monthYear = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" }).format(result.date);
  const year = result.preTwoThousand ? `199${result.year - 1990}` : String(result.year);

  return (
    <div role="status" className={`mt-3 rounded-lg border p-4 ${tone[level]}`}>
      <p className="text-lg font-bold">
        {labels.made.replace("{week}", String(result.week)).replace("{year}", year)}
      </p>
      {!result.preTwoThousand && <p className="text-sm">{labels.around.replace("{date}", monthYear)}</p>}
      <p className="mt-2 font-semibold">
        {labels.age.replace("{years}", String(years)).replace("{months}", String(monthsLeft))}
      </p>
      <p className="mt-1 text-sm font-semibold">
        {level === "good" ? "✓ " : "✕ "}
        {result.preTwoThousand ? labels.tooOld : labels[level]}
      </p>
    </div>
  );
}

export function TireAgeTool({ locale, labels }: { locale: Locale; labels: Labels }) {
  const [codes, setCodes] = useState({ front: "", rear: "" });

  return (
    <div className="grid gap-6">
      <section className={card} aria-label={labels.illustration}>
        <CodeIllustration labels={labels} />
        <p className="mt-2 text-center text-sm text-muted">{labels.hint}</p>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        {(["front", "rear"] as const).map((position) => (
          <section key={position} className={card} aria-labelledby={`tire-${position}`}>
            <h2 id={`tire-${position}`} className="text-lg font-semibold">
              {position === "front" ? labels.front : labels.rear}
            </h2>
            <label htmlFor={`tire-code-${position}`} className="mt-3 mb-1 block text-sm font-medium text-muted">
              {labels.codeLabel}
            </label>
            <input
              id={`tire-code-${position}`}
              type="text"
              inputMode="text"
              autoComplete="off"
              autoCapitalize="characters"
              maxLength={24}
              placeholder="DOT 4B3X 5BZ 2319"
              value={codes[position]}
              onChange={(e) => setCodes({ ...codes, [position]: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 font-mono text-lg uppercase"
            />
            <TireResult code={codes[position]} locale={locale} labels={labels} />
          </section>
        ))}
      </div>
    </div>
  );
}
