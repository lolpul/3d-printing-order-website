import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactButtons } from "@/components/contact-buttons";
import { JsonLd } from "@/components/json-ld";
import { PortfolioCard } from "@/components/portfolio-card";
import { faqItems, servicePages } from "@/content/site";
import { getFeaturedPortfolio } from "@/lib/portfolio";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/settings";

const serviceBySlug = Object.fromEntries(
  Object.entries(servicePages).map(([path, value]) => [path.replace("/", ""), value])
);

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }) {
  const [{ service }, settings] = await Promise.all([params, getSettings()]);
  const page = serviceBySlug[service];
  if (!page) return {};
  return pageMetadata(settings, { title: page.title, description: page.description, path: `/${service}` });
}

export function generateStaticParams() {
  return Object.keys(serviceBySlug).map((service) => ({ service }));
}

export default async function ServiceLandingPage({ params }: { params: Promise<{ service: string }> }) {
  const [{ service }, settings, examples] = await Promise.all([
    params,
    getSettings(),
    getFeaturedPortfolio(3)
  ]);
  const page = serviceBySlug[service];
  if (!page) notFound();
  return (
    <main className="section">
      <div className="container">
        <h1 className="max-w-4xl text-4xl font-black">{page.h1}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">{page.lead}</p>
        <div className="mt-8"><ContactButtons settings={settings} compact /></div>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <section className="card p-6">
            <h2 className="text-2xl font-black">Этапы работы</h2>
            <ol className="mt-5 grid gap-3">
              {page.steps.map((step, index) => (
                <li className="flex gap-3" key={step}>
                  <span className="font-black text-[var(--accent-dark)]">{index + 1}.</span>
                  <span className="leading-7 text-neutral-700">{step}</span>
                </li>
              ))}
            </ol>
          </section>
          <section className="card p-6">
            <h2 className="text-2xl font-black">Что отправить для оценки</h2>
            <ul className="mt-5 grid gap-3">
              {page.requirements.map((item) => (
                <li className="leading-7 text-neutral-700" key={item}>• {item}</li>
              ))}
            </ul>
          </section>
        </div>
        {examples.length ? (
          <section className="mt-12">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-3xl font-black">Подходящие примеры</h2>
              <Link className="font-bold text-[var(--accent-dark)]" href="/portfolio">Все работы</Link>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {examples.map((item) => <PortfolioCard key={item.id} item={item} />)}
            </div>
          </section>
        ) : null}
        <section className="mt-12">
          <h2 className="text-3xl font-black">Вопросы по услуге</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {faqItems.slice(0, 4).map((item) => (
              <details className="card p-5" key={item.question}>
                <summary className="cursor-pointer font-black">{item.question}</summary>
                <p className="mt-3 leading-7 text-neutral-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
      <JsonLd data={faqJsonLd(faqItems.slice(0, 4))} />
    </main>
  );
}
