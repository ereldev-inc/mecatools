export type DotResult =
  | { ok: true; week: number; year: number; preTwoThousand: boolean; date: Date }
  | { ok: false; reason: "incomplete" | "week" | "future" };

const DAY = 24 * 60 * 60 * 1000;

/**
 * Decodes the date part of a tire DOT code: the last 4 digits are WWYY.
 * Older tires (before 2000) only have 3 digits, WWY, for the 1990s.
 * Accepts the whole code ("DOT 4B3X 5BZ 2319") or just the digits.
 */
export function decodeDot(input: string, now = new Date()): DotResult {
  const cleaned = input.replace(/[^0-9a-z]/gi, "");
  const four = cleaned.match(/(\d{4})$/);
  const three = cleaned.match(/^(?:dot)?(\d{3})$/i);

  let week: number;
  let year: number;
  let preTwoThousand = false;
  if (four) {
    week = Number(four[1].slice(0, 2));
    year = 2000 + Number(four[1].slice(2));
  } else if (three) {
    week = Number(three[1].slice(0, 2));
    year = 1990 + Number(three[1].slice(2));
    preTwoThousand = true;
  } else {
    return { ok: false, reason: "incomplete" };
  }

  if (week < 1 || week > 53) return { ok: false, reason: "week" };

  // Middle of the manufacturing week (week 1 starts on 1 January).
  const date = new Date(Date.UTC(year, 0, 1) + ((week - 1) * 7 + 3) * DAY);
  if (date.getTime() > now.getTime() + 7 * DAY) return { ok: false, reason: "future" };
  return { ok: true, week, year, preTwoThousand, date };
}

/** Full months elapsed between `date` and `now`. */
export function ageInMonths(date: Date, now = new Date()): number {
  const months =
    (now.getUTCFullYear() - date.getUTCFullYear()) * 12 + (now.getUTCMonth() - date.getUTCMonth());
  return Math.max(0, months - (now.getUTCDate() < date.getUTCDate() ? 1 : 0));
}
