import type { Metadata } from "next";
import Link from "next/link";
import { LangRedirect } from "@/components/LangRedirect";
import { localeNames, locales } from "@/i18n/config";
import { en } from "@/i18n/dictionaries/en";
import { homePath } from "@/lib/tools";

export const metadata: Metadata = {
  title: { absolute: en.meta.homeTitle },
  description: en.meta.homeDescription,
  alternates: {
    canonical: "/",
    languages: { en: "/en/", fr: "/fr/", "x-default": "/" },
  },
};

export default function RootPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-6 p-6 text-center">
      <LangRedirect />
      <h1 className="text-4xl font-bold tracking-tight">
        <span className="text-accent">Meca</span>Tools
      </h1>
      <p className="text-lg text-muted">{en.meta.homeDescription}</p>
      <ul className="flex gap-3">
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              href={homePath(locale)}
              hrefLang={locale}
              lang={locale}
              className="rounded-lg border border-border bg-surface px-5 py-3 font-medium hover:border-accent"
            >
              {localeNames[locale]}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
