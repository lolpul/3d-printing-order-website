import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactButtons } from "@/components/contact-buttons";
import { JsonLd } from "@/components/json-ld";
import { PlaceholderImage } from "@/components/placeholder-image";
import { PortfolioCard } from "@/components/portfolio-card";
import { getPortfolioItem, getRelatedPortfolio, imageAlt } from "@/lib/portfolio";
import { breadcrumbsJsonLd, pageMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/settings";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const [{ slug }, settings] = await Promise.all([params, getSettings()]);
  const item = await getPortfolioItem(slug);
  if (!item) return {};
  return pageMetadata(settings, {
    title: item.seoTitle || item.title,
    description: item.seoDescription || item.shortDescription,
    path: `/portfolio/${item.slug}`
  });
}

export default async function PortfolioItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const [{ slug }, settings] = await Promise.all([params, getSettings()]);
  const item = await getPortfolioItem(slug);
  if (!item) notFound();
  const related = await getRelatedPortfolio(item);
  const cover = item.images.find((image) => image.isCover) ?? item.images[0];
  const specs = [
    ["Категория", item.category.name],
    ["Материал", item.material.name],
    ["Цвет", item.color],
    ["Размеры", item.dimensions],
    ["Количество", item.quantity],
    ["Ориентировочный срок", item.productionTime]
  ].filter(([, value]) => value);
  return (
    <main className="section">
      <div className="container">
        <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Портфолио", href: "/portfolio" }, { label: item.title, href: `/portfolio/${item.slug}` }]} />
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[var(--line)] bg-white">
              {cover ? (
                <a href={cover.largePath} target="_blank" rel="noreferrer">
                  <Image src={cover.largePath} alt={imageAlt(item, cover.alt, 0)} fill priority sizes="(max-width: 1024px) 100vw, 58vw" className="object-contain" />
                </a>
              ) : (
                <PlaceholderImage title={item.title} className="h-full w-full" />
              )}
            </div>
            {item.images.length > 1 ? (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {item.images.map((image, index) => (
                  <a key={image.id} href={image.largePath} target="_blank" rel="noreferrer" className="relative aspect-square overflow-hidden rounded-md border border-[var(--line)] bg-white">
                    <Image src={image.thumbPath} alt={imageAlt(item, image.alt, index)} fill sizes="25vw" className="object-cover" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>
          <div>
            <h1 className="text-4xl font-black">{item.title}</h1>
            <p className="mt-4 text-lg leading-8 text-neutral-600">{item.shortDescription}</p>
            {specs.length ? (
              <dl className="card mt-6 grid gap-3 p-5">
                {specs.map(([label, value]) => (
                  <div className="grid gap-1 sm:grid-cols-[180px_1fr]" key={label}>
                    <dt className="text-sm font-bold text-neutral-500">{label}</dt>
                    <dd className="font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            <p className="mt-5 text-sm leading-6 text-neutral-500">
              Окончательная цена зависит от модели, размеров, материала, заполнения и количества.
            </p>
            <div className="mt-6">
              <ContactButtons settings={settings} compact />
            </div>
          </div>
        </div>
        <div className="prose-safe mt-12 grid gap-8 lg:grid-cols-3">
          <section className="card p-6">
            <h2 className="text-2xl font-black">Задача клиента</h2>
            <p className="mt-3 leading-7 text-neutral-600">{item.clientTask || "Задача уточняется при оценке исходных материалов."}</p>
          </section>
          <section className="card p-6">
            <h2 className="text-2xl font-black">Что сделано</h2>
            <p className="mt-3 leading-7 text-neutral-600">{item.description}</p>
          </section>
          <section className="card p-6">
            <h2 className="text-2xl font-black">Результат</h2>
            <p className="mt-3 leading-7 text-neutral-600">{item.result || "Результат зависит от исходной модели и требований к детали."}</p>
          </section>
        </div>
        {related.length ? (
          <section className="mt-12">
            <h2 className="text-3xl font-black">Похожие работы</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {related.map((candidate) => <PortfolioCard key={candidate.id} item={candidate} />)}
            </div>
          </section>
        ) : null}
      </div>
      <JsonLd data={breadcrumbsJsonLd(settings, [{ name: "Главная", path: "/" }, { name: "Портфолио", path: "/portfolio" }, { name: item.title, path: `/portfolio/${item.slug}` }])} />
    </main>
  );
}
