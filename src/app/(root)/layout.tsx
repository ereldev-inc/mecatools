import type { Metadata } from "next";
import { Analytics } from "@/components/Analytics";
import { siteUrl } from "@/lib/seo";
import { geistSans } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
};

// Root layout for `/` only (the localized pages have their own, see [locale]).
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
