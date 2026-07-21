import Link from "next/link";
import { AdminShell } from "@/components/admin-shell";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminPortfolioPage() {
  await requireAdmin();
  const items = await prisma.portfolioItem.findMany({
    include: { category: true, material: true, images: true },
    orderBy: { updatedAt: "desc" }
  });
  return (
    <AdminShell>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">Работы</h1>
          <p className="mt-2 text-neutral-600">Создание, черновики, публикация и избранные работы.</p>
        </div>
        <Link className="btn btn-primary" href="/admin/portfolio/new">Новая работа</Link>
      </div>
      <div className="mt-6 grid gap-3">
        {items.length ? items.map((item) => (
          <article className="card grid gap-4 p-5 md:grid-cols-[1fr_auto]" key={item.id}>
            <div>
              <h2 className="text-xl font-black">{item.title}</h2>
              <p className="mt-1 text-sm text-neutral-600">{item.category.name} · {item.material.name} · {item.status === "PUBLISHED" ? "опубликовано" : "черновик"}</p>
              <p className="mt-2 text-sm text-neutral-600">{item.shortDescription}</p>
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end">
              {item.status === "PUBLISHED" ? <Link className="btn btn-outline" href={`/portfolio/${item.slug}`} target="_blank">Открыть</Link> : null}
              <Link className="btn btn-dark" href={`/admin/portfolio/${item.id}`}>Редактировать</Link>
            </div>
          </article>
        )) : <div className="card p-6 text-neutral-600">Работ пока нет. Создайте первый черновик.</div>}
      </div>
    </AdminShell>
  );
}
