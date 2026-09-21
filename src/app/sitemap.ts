import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { absoluteUrl } from "@/lib/seo";
import { homePath, toolPath, tools } from "@/lib/tools";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (paths: Record<string, string>, self: string) => ({
    url: absoluteUrl(self),
    alternates: {
      languages: Object.fromEntries(
        Object.entries(paths).map(([l, p]) => [l, absoluteUrl(p)]),
      ),
    },
  });

  const homes = Object.fromEntries(locales.map((l) => [l, homePath(l)]));
  return [
    ...locales.map((l) => entry(homes, homePath(l))),
    ...tools.flatMap((tool) => {
      const paths = Object.fromEntries(locales.map((l) => [l, toolPath(l, tool)]));
      return locales.map((l) => entry(paths, toolPath(l, tool)));
    }),
  ];
}
