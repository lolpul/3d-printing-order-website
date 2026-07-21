import type { MetadataRoute } from "next";
import { publicRoutes } from "@/lib/routes";
import { getPortfolioList } from "@/lib/portfolio";
import { getSettings } from "@/lib/settings";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSettings();
  const portfolio = await getPortfolioList({ pageSize: 100 });
  const now = new Date();
  return [
    ...publicRoutes.map((path) => ({
      url: `${settings.siteUrl}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.7
    })),
    ...portfolio.items.map((item) => ({
      url: `${settings.siteUrl}/portfolio/${item.slug}`,
      lastModified: item.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6
    }))
  ];
}
