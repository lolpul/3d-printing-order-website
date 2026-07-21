import Link from "next/link";
import { Menu } from "lucide-react";
import type { SiteSettingsView } from "@/lib/settings";

const nav = [
  ["Портфолио", "/portfolio"],
  ["Услуги", "/services"],
  ["Материалы", "/materials"],
  ["FAQ", "/faq"],
  ["Контакты", "/contacts"]
];

export function SiteHeader({ settings }: { settings: SiteSettingsView }) {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-white/92 backdrop-blur">
      <div className="container flex min-h-16 items-center justify-between gap-4">
        <Link href="/" className="text-lg font-black tracking-normal text-[var(--graphite)]">
          {settings.siteName}
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-semibold text-neutral-700 md:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-[var(--accent-dark)]">
              {label}
            </Link>
          ))}
        </nav>
        <Link className="btn btn-primary hidden sm:inline-flex" href="/contacts">
          Связаться
        </Link>
        <details className="md:hidden">
          <summary className="btn btn-outline list-none" aria-label="Открыть меню">
            <Menu size={20} aria-hidden />
          </summary>
          <nav className="absolute left-0 right-0 top-16 border-b border-[var(--line)] bg-white p-4 shadow-sm">
            <div className="container grid gap-2">
              {nav.map(([label, href]) => (
                <Link key={href} href={href} className="rounded-md px-2 py-3 font-semibold">
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        </details>
      </div>
    </header>
  );
}
