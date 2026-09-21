import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tools.example.com"
).replace(/\/$/, "");

export const absoluteUrl = (path: string) => `${siteUrl}${path}`;

/** canonical + hreflang alternates (incl. x-default -> English) for one page. */
export function buildAlternates(
  paths: Record<Locale, string>,
  current: Locale,
): NonNullable<Metadata["alternates"]> {
  return {
    canonical: paths[current],
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, paths[l]])),
      "x-default": paths.en,
    },
  };
}

/** Serialize JSON-LD safely for inlining in a <script> tag. */
export const jsonLd = (data: object) =>
  JSON.stringify(data).replace(/</g, "\\u003c");
