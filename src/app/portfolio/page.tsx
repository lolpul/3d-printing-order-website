import Link from "next/link";
import { PortfolioCard } from "@/components/portfolio-card";
import { getPortfolioList } from "@/lib/portfolio";
import { pageMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/settings";

export async function generateMetadata() {
  const settings = await getSettings();
  return pageMetadata(settings, {
    title: "Портфолио 3D-печати",
    description: "Примеры изготовленных пластиковых деталей, креплений, корпусов и прототипов.",
    path: "/portfolio"
  });
}

export default async function PortfolioPage({
  searchParams
}: {
  searchParams: Promise<{ category?: string; material?: string; page?: string }>;
}) {
  const params = await searchParams;
  const data = await getPortfolioList({
    category: params.category,
    material: params.material,
    page: Number(params.page ?? 1) || 1
  });
  const pages = Math.max(Math.ceil(data.total / data.pageSize), 1);
  const makeHref = (next: Record<string, string | undefined>) => {
    const sp = new URLSearchParams();
    if (next.category) sp.set("category", next.category);
    if (next.material) sp.set("material", next.material);
    if (next.page && next.page !== "1") sp.set("page", next.page);
    const qs = sp.toString();
    return `/portfolio${qs ? `?${qs}` : ""}`;
  };
  return (
    <main className="section">
      <div className="container">
        <h1 className="text-4xl font-black">Портфолио 3D-печати</h1>
        <p className="mt-4 max-w-3xl leading-7 text-neutral-600">
          Здесь собраны опубликованные работы мастерской. Фильтры сохраняются в адресе страницы и
          работают без обязательного клиентского JavaScript.
        </p>
        <form className="card mt-8 grid gap-4 p-4 md:grid-cols-[1fr_1fr_auto]" action="/portfolio">
          <label className="grid gap-2 text-sm font-semibold">
            Категория
            <select name="category" defaultValue={params.category ?? ""} className="rounded-md border border-[var(--line)] p-3">
              <option value="">Все категории</option>
              {data.categories.map((category) => (
                <option key={category.id} value={category.slug}>{category.name}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Материал
            <select name="material" defaultValue={params.material ?? ""} className="rounded-md border border-[var(--line)] p-3">
              <option value="">Все материалы</option>
              {data.materials.map((material) => (
                <option key={material.id} value={material.slug}>{material.name}</option>
              ))}
            </select>
          </label>
          <button className="btn btn-primary self-end" type="submit">Показать</button>
        </form>
        {data.items.length ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {data.items.map((item) => <PortfolioCard key={item.id} item={item} />)}
          </div>
        ) : params.category || params.material ? (
          <div className="card mt-8 p-8 text-neutral-600">По выбранным фильтрам пока нет работ.</div>
        ) : (
          <div className="card mt-8 p-8 text-neutral-600">Пока нет опубликованных работ.</div>
        )}
        {pages > 1 ? (
          <div className="mt-8 flex flex-wrap gap-2">
            {Array.from({ length: pages }).map((_, index) => (
              <Link
                key={index}
                className={`btn ${data.page === index + 1 ? "btn-dark" : "btn-outline"}`}
                href={makeHref({ category: params.category, material: params.material, page: String(index + 1) })}
              >
                {index + 1}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </main>
  );
}
