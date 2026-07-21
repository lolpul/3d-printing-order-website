import Image from "next/image";
import Link from "next/link";
import type { PortfolioItemWithRelations } from "@/lib/portfolio";
import { imageAlt } from "@/lib/portfolio";
import { PlaceholderImage } from "@/components/placeholder-image";

export function PortfolioCard({ item }: { item: PortfolioItemWithRelations }) {
  const cover = item.images.find((image) => image.isCover) ?? item.images[0];
  return (
    <article className="card grid min-h-[460px] overflow-hidden">
      <Link href={`/portfolio/${item.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
          {cover ? (
            <Image
              src={cover.mediumPath}
              alt={imageAlt(item, cover.alt, 0)}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          ) : (
            <PlaceholderImage title={item.title} className="h-full w-full" />
          )}
        </div>
      </Link>
      <div className="grid content-between gap-4 p-5">
        <div>
          <div className="flex flex-wrap gap-2 text-xs font-bold uppercase text-[var(--accent-dark)]">
            <span>{item.category.name}</span>
            <span>·</span>
            <span>{item.material.name}</span>
          </div>
          <h3 className="mt-3 text-xl font-black leading-tight">
            <Link href={`/portfolio/${item.slug}`}>{item.title}</Link>
          </h3>
          <p className="mt-3 text-sm leading-6 text-neutral-600">{item.shortDescription}</p>
        </div>
        <Link className="font-bold text-[var(--accent-dark)]" href={`/portfolio/${item.slug}`}>
          Подробнее
        </Link>
      </div>
    </article>
  );
}
