import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { absoluteUrl, buildAlternates } from "@/lib/seo";
import { homePath, toolPath, tools } from "@/lib/tools";

type Props = { params: Promise<{ locale: string }> };

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    title: { absolute: t.meta.homeTitle },
    description: t.meta.homeDescription,
    alternates: buildAlternates(
      { en: homePath("en"), fr: homePath("fr") },
      locale,
    ),
    openGraph: {
      title: t.meta.homeTitle,
      description: t.meta.homeDescription,
      url: homePath(locale),
      locale,
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: t.meta.siteName,
          url: absoluteUrl(homePath(locale)),
          inLanguage: locale,
          description: t.meta.homeDescription,
        }}
      />
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t.home.h1}</h1>
      <p className="mt-3 text-lg text-muted">{t.home.intro}</p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => {
          const text = t.tools[tool.id];
          return (
            <li key={tool.id}>
              <Link
                href={toolPath(locale, tool)}
                className="flex h-full flex-col gap-3 rounded-xl border border-border bg-surface p-5 hover:border-accent"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon name={tool.icon} className="h-6 w-6" />
                </span>
                <h2 className="text-xl font-semibold">{text.name}</h2>
                <p className="flex-1 text-muted">{text.description}</p>
                <span className="font-medium text-accent">{t.home.openTool} →</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
