"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { IconName } from "@/lib/tools";
import { Icon } from "./Icon";
import { LanguageSwitcher } from "./LanguageSwitcher";

export type ShellLabels = {
  siteName: string;
  skipToContent: string;
  tools: string;
  home: string;
  openMenu: string;
  closeMenu: string;
  language: string;
};

export type NavItem = {
  href: string;
  title: string;
  icon: IconName;
  group: string;
};

export function Shell({
  locale,
  labels,
  homeHref,
  items,
  children,
}: {
  locale: Locale;
  labels: ShellLabels;
  homeHref: string;
  items: NavItem[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const linkClass =
    "flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium hover:bg-surface-hover aria-[current=page]:bg-accent-soft aria-[current=page]:text-accent";

  return (
    <div className="min-h-screen md:flex">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg"
      >
        {labels.skipToContent}
      </a>

      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-surface px-4 py-3 md:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={labels.openMenu}
          aria-expanded={open}
          aria-controls="sidebar"
          className="-ml-2 rounded-md p-2 hover:bg-surface-hover"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link href={homeHref} className="text-lg font-bold">
          {labels.siteName}
        </Link>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col gap-6 overflow-y-auto border-r border-border bg-surface p-4 transition-transform md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0 md:translate-x-0 ${
          open ? "translate-x-0" : "max-md:invisible max-md:-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link href={homeHref} className="text-xl font-bold tracking-tight">
            <span className="text-accent">Meca</span>Tools
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={labels.closeMenu}
            className="rounded-md p-2 hover:bg-surface-hover md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav
          aria-label={labels.tools}
          className="flex flex-1 flex-col gap-1"
          onClick={() => setOpen(false)}
        >
          <Link
            href={homeHref}
            aria-current={pathname === homeHref ? "page" : undefined}
            className={linkClass}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10" />
            </svg>
            {labels.home}
          </Link>
          {items.map((item, i) => (
            <div key={item.href} className="flex flex-col gap-1">
              {item.group !== items[i - 1]?.group && (
                <p className="mt-4 px-3 text-xs font-semibold uppercase tracking-wider text-muted">
                  {item.group}
                </p>
              )}
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={linkClass}
              >
                <Icon name={item.icon} />
                {item.title}
              </Link>
            </div>
          ))}
        </nav>

        <LanguageSwitcher locale={locale} label={labels.language} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
