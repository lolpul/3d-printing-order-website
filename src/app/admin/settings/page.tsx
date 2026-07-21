import { updateSettingsAction } from "@/app/admin/settings/actions";
import { AdminShell } from "@/components/admin-shell";
import { csrfToken, requireAdmin } from "@/lib/auth";
import { defaultSettings, getSettings } from "@/lib/settings";

export default async function AdminSettingsPage() {
  await requireAdmin();
  const [settings, csrf] = await Promise.all([getSettings(), csrfToken()]);
  return (
    <AdminShell>
      <h1 className="text-3xl font-black">Настройки сайта</h1>
      <form action={updateSettingsAction} className="card mt-6 grid gap-5 p-6">
        <input type="hidden" name="csrf" value={csrf} />
        {[
          ["siteName", "Название сайта", settings.siteName],
          ["heroTitle", "Основной заголовок", settings.heroTitle],
          ["city", "Город", settings.city],
          ["region", "Регион", settings.region],
          ["contactEmail", "Email", settings.contactEmail],
          ["telegramUrl", "Telegram URL", settings.telegramUrl],
          ["avitoUrl", "Авито URL", settings.avitoUrl],
          ["phoneNumber", "Телефон", settings.phoneNumber],
          ["defaultSeoTitle", "SEO title по умолчанию", settings.defaultSeoTitle],
          ["defaultSeoDescription", "SEO description по умолчанию", settings.defaultSeoDescription]
        ].map(([name, label, value]) => (
          <label className="grid gap-2 text-sm font-semibold" key={name}>
            {label}
            <input name={name} defaultValue={value} className="rounded-md border border-[var(--line)] p-3" />
          </label>
        ))}
        <label className="grid gap-2 text-sm font-semibold">
          Текст доставки
          <textarea name="deliveryText" defaultValue={settings.deliveryText || defaultSettings.deliveryText} className="min-h-24 rounded-md border border-[var(--line)] p-3" />
        </label>
        <button className="btn btn-primary w-fit" type="submit">Сохранить настройки</button>
      </form>
    </AdminShell>
  );
}
