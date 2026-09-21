"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  locales,
  localeNames,
  localeStorageKey,
  type Locale,
} from "@/i18n/config";
import { switchLocalePath } from "@/lib/locale-path";

export function LanguageSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className="flex gap-1">
      {locales.map((target) => (
        <Link
          key={target}
          href={switchLocalePath(pathname, target)}
          hrefLang={target}
          lang={target}
          aria-current={target === locale ? "true" : undefined}
          onClick={() => {
            try {
              localStorage.setItem(localeStorageKey, target);
            } catch {}
          }}
          className="rounded-md border border-border px-3 py-1.5 text-sm font-medium aria-[current=true]:border-accent aria-[current=true]:bg-accent aria-[current=true]:text-accent-fg hover:bg-surface-hover aria-[current=true]:hover:bg-accent"
        >
          {localeNames[target]}
        </Link>
      ))}
    </nav>
  );
}
