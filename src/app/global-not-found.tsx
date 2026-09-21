import type { Metadata } from "next";
import Link from "next/link";
import { geistSans } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = { title: "404 – MecaTools" };

// Static hosting serves one 404 page for both languages.
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-3xl font-bold">404</h1>
        <p className="text-muted">Page not found · Page introuvable</p>
        <p className="flex gap-4 font-medium text-accent">
          <Link href="/en/">English</Link>
          <Link href="/fr/">Français</Link>
        </p>
      </body>
    </html>
  );
}
