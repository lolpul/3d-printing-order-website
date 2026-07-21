import Link from "next/link";

export function Breadcrumbs({ items }: { items: Array<{ label: string; href: string }> }) {
  return (
    <nav aria-label="Хлебные крошки" className="text-sm text-neutral-500">
      <ol className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <li key={item.href} className="flex gap-2">
            {index > 0 ? <span>/</span> : null}
            <Link href={item.href} className="hover:text-[var(--accent-dark)]">
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
