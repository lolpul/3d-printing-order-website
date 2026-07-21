import Link from "next/link";
import { ExternalLink, Mail, Send } from "lucide-react";
import { contactLinks, type SiteSettingsView } from "@/lib/settings";

export function ContactButtons({ settings, compact = false }: { settings: SiteSettingsView; compact?: boolean }) {
  const links = contactLinks(settings);
  const cls = compact ? "flex flex-wrap gap-2" : "flex flex-wrap gap-3";
  return (
    <div className={cls}>
      {links.telegram ? (
        <a className="btn btn-primary" href={links.telegram} target="_blank" rel="noreferrer" data-analytics="telegram">
          <Send size={18} aria-hidden /> Написать в Telegram
        </a>
      ) : null}
      {links.email ? (
        <a className="btn btn-outline" href={links.email} data-analytics="email">
          <Mail size={18} aria-hidden /> Написать на почту
        </a>
      ) : null}
      {links.avito ? (
        <a className="btn btn-dark" href={links.avito} target="_blank" rel="noreferrer" data-analytics="avito">
          <ExternalLink size={18} aria-hidden /> Посмотреть на Авито
        </a>
      ) : null}
      {!links.telegram && !links.email && !links.avito ? (
        <Link className="btn btn-primary" href="/contacts">
          Контакты для связи
        </Link>
      ) : null}
    </div>
  );
}
