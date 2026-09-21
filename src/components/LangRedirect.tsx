"use client";

import { useEffect } from "react";
import {
  defaultLocale,
  hasLocale,
  localeStorageKey,
  type Locale,
} from "@/i18n/config";

function detectLocale(): Locale {
  try {
    const saved = localStorage.getItem(localeStorageKey);
    if (saved && hasLocale(saved)) return saved;
  } catch {}
  for (const lang of navigator.languages ?? [navigator.language]) {
    const base = lang.toLowerCase().split("-")[0];
    if (hasLocale(base)) return base;
  }
  return defaultLocale;
}

/** Sends visitors to their language; the page itself stays crawlable. */
export function LangRedirect() {
  useEffect(() => {
    window.location.replace(`/${detectLocale()}/`);
  }, []);
  return null;
}
