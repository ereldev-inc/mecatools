import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";

export type ToolId = keyof Dictionary["tools"];
export type IconName = "gauge" | "ruler";

export type Tool = {
  id: ToolId;
  icon: IconName;
  /** Localized URL slugs (keyword-rich for SEO). */
  slugs: Record<Locale, string>;
};

// Add a tool: one entry here + its texts in every dictionary.
export const tools: Tool[] = [
  {
    id: "compressionTest",
    icon: "gauge",
    slugs: { en: "compression-test", fr: "releve-compression" },
  },
  {
    id: "valveShims",
    icon: "ruler",
    slugs: { en: "valve-shims", fr: "calcul-pastilles-soupapes" },
  },
];

export const findToolBySlug = (locale: Locale, slug: string) =>
  tools.find((tool) => tool.slugs[locale] === slug);

export const homePath = (locale: Locale) => `/${locale}/`;
export const toolPath = (locale: Locale, tool: Tool) =>
  `/${locale}/${tool.slugs[locale]}/`;
