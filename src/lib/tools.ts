import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";

export type ToolId = keyof Dictionary["tools"];
export type IconName = "gauge" | "ruler" | "swap" | "wrench" | "disc" | "clock";
export type ToolGroup = "converters" | "workshop";

export type Tool = {
  id: ToolId;
  icon: IconName;
  group: ToolGroup;
  /** Localized URL slugs (keyword-rich for SEO). */
  slugs: Record<Locale, string>;
};

// Add a tool: one entry here + its texts in every dictionary.
export const tools: Tool[] = [
  {
    id: "torqueConverter",
    icon: "wrench",
    group: "converters",
    slugs: { en: "torque-converter", fr: "convertisseur-couple-serrage" },
  },
  {
    id: "compressionConverter",
    icon: "swap",
    group: "converters",
    slugs: { en: "compression-converter", fr: "convertisseur-compression" },
  },
  {
    id: "compressionTest",
    icon: "gauge",
    group: "workshop",
    slugs: { en: "compression-test", fr: "releve-compression" },
  },
  {
    id: "tireAge",
    icon: "clock",
    group: "workshop",
    slugs: { en: "tire-age", fr: "age-pneu-dot" },
  },
  {
    id: "valveClearance",
    icon: "ruler",
    group: "workshop",
    slugs: { en: "valve-clearance", fr: "jeu-aux-soupapes" },
  },
  {
    id: "valveShims",
    icon: "disc",
    group: "workshop",
    slugs: { en: "valve-shim-calculator", fr: "calcul-pastilles-soupapes" },
  },
];

export const findToolBySlug = (locale: Locale, slug: string) =>
  tools.find((tool) => tool.slugs[locale] === slug);

export const homePath = (locale: Locale) => `/${locale}/`;
export const toolPath = (locale: Locale, tool: Tool) =>
  `/${locale}/${tool.slugs[locale]}/`;
