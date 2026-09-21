import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Shell, type NavItem } from "@/components/Shell";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { geistSans } from "@/lib/fonts";
import { siteUrl } from "@/lib/seo";
import { homePath, toolPath, tools } from "@/lib/tools";
import "../globals.css";

// This is a root layout: <html lang> depends on the locale segment.
export const dynamicParams = false;

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "MecaTools",
  title: { template: "%s | MecaTools", default: "MecaTools" },
  openGraph: { type: "website", siteName: "MecaTools" },
  twitter: { card: "summary" },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = getDictionary(locale);

  const items: NavItem[] = tools.map((tool) => ({
    href: toolPath(locale, tool),
    title: t.tools[tool.id].name,
    icon: tool.icon,
  }));

  return (
    <html lang={locale} className={`${geistSans.variable} antialiased`}>
      <body>
        <Shell
          locale={locale}
          homeHref={homePath(locale)}
          items={items}
          labels={{
            siteName: t.meta.siteName,
            skipToContent: t.nav.skipToContent,
            tools: t.nav.tools,
            home: t.nav.home,
            openMenu: t.nav.openMenu,
            closeMenu: t.nav.closeMenu,
            language: t.nav.language,
          }}
        >
          <main id="content" className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 md:px-8 md:py-12">
            {children}
          </main>
          {/* Phase 2: ad slot / analytics consent banner go here */}
          <footer className="border-t border-border px-4 py-4 text-sm text-muted md:px-8">
            © {new Date().getFullYear()} {t.footer.rights}
          </footer>
        </Shell>
      </body>
    </html>
  );
}
