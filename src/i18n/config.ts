export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const localeStorageKey = "mecatools-locale";

export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
};

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);
