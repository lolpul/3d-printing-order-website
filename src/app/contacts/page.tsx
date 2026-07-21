import { ContactButtons } from "@/components/contact-buttons";
import { pageMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/settings";

export async function generateMetadata() {
  const settings = await getSettings();
  return pageMetadata(settings, {
    title: "Контакты мастерской 3D-печати",
    description: "Связь через Telegram, почту или Авито. Мастерская работает в Воронеже по предварительному согласованию.",
    path: "/contacts"
  });
}

export default async function ContactsPage() {
  const settings = await getSettings();
  return (
    <main className="section">
      <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h1 className="text-4xl font-black">Контакты</h1>
          <p className="mt-4 leading-7 text-neutral-600">
            Для оценки отправьте модель, размеры, фотографии или описание задачи. Мастерская работает
            по предварительному согласованию, точный домашний адрес на сайте не публикуется.
          </p>
          <div className="mt-6"><ContactButtons settings={settings} /></div>
        </div>
        <div className="card grid gap-4 p-6">
          <div>
            <div className="text-sm font-bold text-neutral-500">Город</div>
            <div className="mt-1 font-semibold">{settings.city}, {settings.region}</div>
          </div>
          {settings.phoneNumber ? (
            <div>
              <div className="text-sm font-bold text-neutral-500">Телефон</div>
              <a className="mt-1 block font-semibold" href={`tel:${settings.phoneNumber}`}>{settings.phoneNumber}</a>
            </div>
          ) : null}
          <div>
            <div className="text-sm font-bold text-neutral-500">Доставка</div>
            <p className="mt-1 leading-7">{settings.deliveryText}</p>
          </div>
          <div>
            <div className="text-sm font-bold text-neutral-500">Время ответа</div>
            <p className="mt-1 leading-7">Обычно сообщения обрабатываются в течение рабочего дня, когда мастерская на связи.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
