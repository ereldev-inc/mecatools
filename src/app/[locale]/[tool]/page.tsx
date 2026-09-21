import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { UnitConverter } from "@/components/tools/UnitConverter";
import { converters } from "@/lib/converters";
import { ValveShimTool } from "@/components/tools/ValveShimTool";
import { ValveClearanceTool } from "@/components/tools/ValveClearanceTool";
import { CompressionTool } from "@/components/tools/CompressionTool";
import { JsonLd } from "@/components/JsonLd";
import { hasLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { absoluteUrl, buildAlternates } from "@/lib/seo";
import { findToolBySlug, homePath, toolPath, tools } from "@/lib/tools";

type Props = { params: Promise<{ locale: string; tool: string }> };

export const dynamicParams = false;

export const generateStaticParams = () =>
  locales.flatMap((locale) =>
    tools.map((tool) => ({ locale, tool: tool.slugs[locale] })),
  );

const resolve = async (params: Props["params"]) => {
  const { locale, tool: slug } = await params;
  if (!hasLocale(locale)) return null;
  const tool = findToolBySlug(locale, slug);
  return tool ? { locale: locale as Locale, tool } : null;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = await resolve(params);
  if (!found) return {};
  const { locale, tool } = found;
  const text = getDictionary(locale).tools[tool.id];
  return {
    title: text.title,
    description: text.description,
    alternates: buildAlternates(
      { en: toolPath("en", tool), fr: toolPath("fr", tool) },
      locale,
    ),
    openGraph: {
      title: text.title,
      description: text.description,
      url: toolPath(locale, tool),
      locale,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const found = await resolve(params);
  if (!found) notFound();
  const { locale, tool } = found;
  const t = getDictionary(locale);
  const text = t.tools[tool.id];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              name: text.name,
              description: text.description,
              url: absoluteUrl(toolPath(locale, tool)),
              inLanguage: locale,
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Any",
              offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: t.meta.siteName,
                  item: absoluteUrl(homePath(locale)),
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: text.name,
                  item: absoluteUrl(toolPath(locale, tool)),
                },
              ],
            },
          ],
        }}
      />

      <nav aria-label={t.nav.breadcrumb} className="mb-4 text-sm text-muted">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href={homePath(locale)} className="underline-offset-2 hover:underline">
              {t.meta.siteName}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{text.name}</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{text.title}</h1>
      <p className="mt-3 max-w-3xl text-lg text-muted">{text.intro}</p>

      {tool.id === "torqueConverter" || tool.id === "compressionConverter" ? (
        <div className="mt-8 max-w-3xl">
          <UnitConverter
            {...converters[tool.id === "torqueConverter" ? "torque" : "compression"]}
            labels={t.converter}
          />
        </div>
      ) : tool.id === "compressionTest" ? (
        <div className="mt-8">
          <CompressionTool labels={t.compression} />
        </div>
      ) : tool.id === "valveClearance" ? (
        <div className="mt-8">
          <ValveClearanceTool labels={t.valves} />
        </div>
      ) : tool.id === "valveShims" ? (
        <div className="mt-8">
          <ValveShimTool labels={t.shims} valveLabels={t.valves} />
        </div>
      ) : (
        <section
          aria-labelledby="tool-soon"
          className="mt-8 rounded-xl border border-dashed border-border bg-surface p-8 text-center"
        >
          <h2 id="tool-soon" className="text-xl font-semibold">
            {t.tool.soon}
          </h2>
          <p className="mt-2 text-muted">{t.tool.soonBody}</p>
        </section>
      )}

      <article className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-semibold">{t.tool.about}</h2>
        {text.about.map((paragraph) => (
          <p key={paragraph} className="mt-3 leading-relaxed text-muted">
            {paragraph}
          </p>
        ))}
      </article>
    </>
  );
}
