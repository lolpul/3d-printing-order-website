import Link from "next/link";
import { ArrowRight, Box, CheckCircle2, Ruler, Truck } from "lucide-react";
import { ContactButtons } from "@/components/contact-buttons";
import { JsonLd } from "@/components/json-ld";
import { PortfolioCard } from "@/components/portfolio-card";
import { faqItems, materialCopy, productionDirections, serviceTeasers } from "@/content/site";
import { getFeaturedPortfolio } from "@/lib/portfolio";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/settings";

export async function generateMetadata() {
  const settings = await getSettings();
  return pageMetadata(settings, {
    title: "3D-печать на заказ в Воронеже",
    description:
      "Печать пластиковых деталей, корпусов, креплений, прототипов и небольших партий в Воронеже. Работаем по STL, чертежу, фотографии или образцу.",
    path: "/"
  });
}

export default async function HomePage() {
  const [settings, featured] = await Promise.all([getSettings(), getFeaturedPortfolio(6)]);
  const advantages = [
    ["Работа по STL", Box],
    ["Помощь с моделью", Ruler],
    ["Единичные детали и партии", CheckCircle2],
    ["Отправка по России", Truck]
  ];
  return (
    <main>
      <section className="border-b border-[var(--line)] bg-white">
        <div className="container grid min-h-[calc(100svh-64px)] content-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase text-[var(--accent-dark)]">
              Воронеж и Воронежская область
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.04] text-[var(--graphite)] sm:text-6xl">
              3D-печать на заказ в Воронеже
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
              Изготавливаем пластиковые детали, крепления, корпуса, прототипы и декоративные
              изделия по готовой 3D-модели, чертежу, фотографии или образцу.
            </p>
            <div className="mt-8">
              <ContactButtons settings={settings} />
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {advantages.map(([label, Icon]) => (
                <div key={label as string} className="flex items-center gap-3 text-sm font-semibold text-neutral-700">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-emerald-50 text-[var(--accent-dark)]">
                    <Icon size={18} aria-hidden />
                  </span>
                  {label as string}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            <div className="card overflow-hidden">
              <div className="grid aspect-[4/3] place-items-center bg-[var(--graphite)] p-8 text-white">
                <div className="max-w-sm">
                  <div className="text-sm font-bold uppercase text-emerald-300">Инженерная мастерская</div>
                  <div className="mt-5 text-3xl font-black">Детали, которые можно подержать в руках</div>
                  <p className="mt-4 text-neutral-300">
                    Сайт готов к публикации реальных работ через админ-панель: добавьте фотографии,
                    материал, описание задачи и результат.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm text-neutral-500">
              Максимальная рабочая область одной детали — до 256 × 256 × 256 мм. Крупные модели
              можно разделить на несколько частей.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-black">Примеры работ</h2>
              <p className="mt-3 max-w-2xl text-neutral-600">
                Здесь показываются опубликованные работы, отмеченные как избранные в административной панели.
              </p>
            </div>
            <Link className="btn btn-outline" href="/portfolio" data-analytics="portfolio">
              Всё портфолио <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
          {featured.length ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((item) => <PortfolioCard key={item.id} item={item} />)}
            </div>
          ) : (
            <div className="card mt-8 p-8 text-neutral-600">Пока нет опубликованных работ.</div>
          )}
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <h2 className="text-3xl font-black">Что можно изготовить</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {productionDirections.map((item) => (
              <div className="card p-5" key={item}>
                <h3 className="font-black">{item}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  Возможность изготовления, срок и материал уточняются после просмотра исходных данных.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black">Как проходит заказ</h2>
            <div className="mt-8 grid gap-4">
              {[
                "Клиент отправляет модель, чертёж, фотографию или описание.",
                "Оцениваем возможность изготовления, материал, срок и стоимость.",
                "После согласования изделие печатается.",
                "Клиент получает заказ в Воронеже или доставкой по России."
              ].map((step, index) => (
                <div className="flex gap-4" key={step}>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-[var(--graphite)] font-black text-white">
                    {index + 1}
                  </span>
                  <p className="pt-1 leading-7 text-neutral-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black">Материалы</h2>
            <div className="mt-8 grid gap-4">
              {materialCopy.map((material) => (
                <div className="card p-5" key={material.name}>
                  <h3 className="text-xl font-black">{material.name}</h3>
                  <p className="mt-2 text-neutral-600">{material.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-neutral-500">
              Доступные цвета и материалы лучше уточнять перед заказом.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-black">Услуги</h2>
            <p className="mt-3 text-neutral-600">
              От печати по готовой модели до простого моделирования и небольших партий.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {serviceTeasers.map((service) => (
              <Link className="card p-5 hover:border-emerald-300" key={service.href} href={service.href}>
                <h3 className="font-black">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{service.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="text-3xl font-black">Частые вопросы</h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {faqItems.slice(0, 6).map((item) => (
              <details className="card p-5" key={item.question}>
                <summary className="cursor-pointer font-black">{item.question}</summary>
                <p className="mt-3 leading-7 text-neutral-600">{item.answer}</p>
              </details>
            ))}
          </div>
          <Link className="btn btn-outline mt-6" href="/faq">
            Все вопросы
          </Link>
        </div>
      </section>

      <section className="section bg-[var(--graphite)] text-white">
        <div className="container">
          <h2 className="max-w-3xl text-3xl font-black">Есть модель или фотография нужной детали?</h2>
          <p className="mt-4 max-w-3xl text-neutral-300">
            Отправьте материалы удобным способом. Для предварительной оценки желательно указать
            размеры, количество, назначение детали и желаемый материал.
          </p>
          <div className="mt-8">
            <ContactButtons settings={settings} />
          </div>
        </div>
      </section>
      <JsonLd data={faqJsonLd(faqItems.slice(0, 6))} />
    </main>
  );
}
