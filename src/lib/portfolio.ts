import type { Prisma } from "@prisma/client";
import { env } from "@/lib/env";
import { fallbackCategories, fallbackMaterials, fallbackPortfolio } from "@/lib/fallback-data";
import { prisma } from "@/lib/prisma";

export type PortfolioItemWithRelations = Prisma.PortfolioItemGetPayload<{
  include: { category: true; material: true; images: { orderBy: { sortOrder: "asc" } } };
}>;

const include = {
  category: true,
  material: true,
  images: { orderBy: { sortOrder: "asc" as const } }
};

export async function getFeaturedPortfolio(limit = 6): Promise<PortfolioItemWithRelations[]> {
  if (env.SKIP_DB) {
    return fallbackPortfolio.slice(0, limit) as PortfolioItemWithRelations[];
  }

  try {
    return await prisma.portfolioItem.findMany({
      where: { status: "PUBLISHED", featured: true },
      include,
      orderBy: [{ featuredOrder: "asc" }, { publishedAt: "desc" }],
      take: limit
    });
  } catch {
    return fallbackPortfolio.slice(0, limit) as PortfolioItemWithRelations[];
  }
}

export async function getPortfolioList(params: {
  category?: string;
  material?: string;
  page?: number;
  pageSize?: number;
}) {
  const page = Math.max(params.page ?? 1, 1);
  const pageSize = Math.min(params.pageSize ?? 9, 24);
  if (env.SKIP_DB) {
    const filtered = fallbackPortfolio.filter((item) => {
      return (
        (!params.category || item.category.slug === params.category) &&
        (!params.material || item.material.slug === params.material)
      );
    });
    return {
      items: filtered.slice((page - 1) * pageSize, page * pageSize) as PortfolioItemWithRelations[],
      total: filtered.length,
      page,
      pageSize,
      categories: fallbackCategories,
      materials: fallbackMaterials
    };
  }

  try {
    const where: Prisma.PortfolioItemWhereInput = {
      status: "PUBLISHED",
      ...(params.category ? { category: { slug: params.category } } : {}),
      ...(params.material ? { material: { slug: params.material } } : {})
    };
    const [items, total, categories, materials] = await Promise.all([
      prisma.portfolioItem.findMany({
        where,
        include,
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
        skip: (page - 1) * pageSize,
        take: pageSize
      }),
      prisma.portfolioItem.count({ where }),
      prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.material.findMany({ orderBy: { sortOrder: "asc" } })
    ]);
    return { items, total, page, pageSize, categories, materials };
  } catch {
    const filtered = fallbackPortfolio.filter((item) => {
      return (
        (!params.category || item.category.slug === params.category) &&
        (!params.material || item.material.slug === params.material)
      );
    });
    return {
      items: filtered.slice((page - 1) * pageSize, page * pageSize) as PortfolioItemWithRelations[],
      total: filtered.length,
      page,
      pageSize,
      categories: fallbackCategories,
      materials: fallbackMaterials
    };
  }
}

export async function getPortfolioItem(slug: string): Promise<PortfolioItemWithRelations | null> {
  if (env.SKIP_DB) {
    return (fallbackPortfolio.find((item) => item.slug === slug) as PortfolioItemWithRelations) ?? null;
  }

  try {
    return await prisma.portfolioItem.findFirst({
      where: { slug, status: "PUBLISHED" },
      include
    });
  } catch {
    return (fallbackPortfolio.find((item) => item.slug === slug) as PortfolioItemWithRelations) ?? null;
  }
}

export async function getRelatedPortfolio(item: PortfolioItemWithRelations, limit = 3) {
  if (env.SKIP_DB) {
    return fallbackPortfolio
      .filter((candidate) => candidate.id !== item.id)
      .slice(0, limit) as PortfolioItemWithRelations[];
  }

  try {
    return await prisma.portfolioItem.findMany({
      where: {
        status: "PUBLISHED",
        id: { not: item.id },
        OR: [{ categoryId: item.categoryId }, { materialId: item.materialId }]
      },
      include,
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
      take: limit
    });
  } catch {
    return fallbackPortfolio
      .filter((candidate) => candidate.id !== item.id)
      .slice(0, limit) as PortfolioItemWithRelations[];
  }
}

export async function getAdminCollections() {
  if (env.SKIP_DB) {
    return { categories: fallbackCategories, materials: fallbackMaterials };
  }

  try {
    const [categories, materials] = await Promise.all([
      prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.material.findMany({ orderBy: { sortOrder: "asc" } })
    ]);
    return { categories, materials };
  } catch {
    return { categories: fallbackCategories, materials: fallbackMaterials };
  }
}

export function imageAlt(item: Pick<PortfolioItemWithRelations, "title">, alt: string | null | undefined, index: number) {
  return alt?.trim() || `${item.title}: фотография ${index + 1}`;
}
