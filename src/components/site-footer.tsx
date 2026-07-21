import Link from "next/link";
import type { SiteSettingsView } from "@/lib/settings";

export function SiteFooter({ settings }: { settings: SiteSettingsView }) {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--graphite)] py-10 text-white">
      <div className="container grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="text-xl font-black">{settings.siteName}</div>
          <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-300">
            3D-печать пластиковых деталей, прототипов, креплений и корпусов в Воронеже.
            Стоимость и сроки рассчитываются индивидуально после просмотра исходных данных.
          </p>
        </div>
        <div className="grid gap-2 text-sm text-neutral-300">
          <Link href="/services">Услуги</Link>
          <Link href="/portfolio">Портфолио</Link>
          <Link href="/materials">Материалы</Link>
          <Link href="/privacy">Политика обработки данных</Link>
        </div>
        <div className="text-sm text-neutral-300">
          <p>{settings.city}, {settings.region}</p>
          <p className="mt-2">{settings.deliveryText}</p>
        </div>
      </div>
    </footer>
  );
}
