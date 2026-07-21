import { pageMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/settings";

export async function generateMetadata() {
  const settings = await getSettings();
  return pageMetadata(settings, {
    title: "Политика обработки персональных данных",
    description: "Как сайт мастерской 3D-печати обрабатывает контактные данные пользователей.",
    path: "/privacy"
  });
}

export default async function PrivacyPage() {
  const settings = await getSettings();
  return (
    <main className="section">
      <div className="container max-w-3xl">
        <h1 className="text-4xl font-black">Политика обработки персональных данных</h1>
        <div className="prose-safe mt-6 leading-8 text-neutral-700">
          <p>
            Сайт {settings.siteName} использует контактные данные только для ответа на обращение и
            предварительной оценки задачи по 3D-печати.
          </p>
          <p>
            Через сайт не принимаются платежи и не оформляются заказы в личном кабинете. При
            обращении через Telegram, почту или Авито обработка данных также регулируется правилами
            соответствующих сервисов.
          </p>
          <p>
            Не отправляйте через публичные каналы пароли, секретные ключи, закрытые чертежи и другую
            информацию, которую нельзя раскрывать третьим лицам.
          </p>
          <p>
            Для удаления или уточнения данных обратитесь тем же способом, которым вы связывались с
            мастерской.
          </p>
        </div>
      </div>
    </main>
  );
}
