import type { MetadataRoute } from "next";
import { getSettings } from "@/lib/settings";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSettings();
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/admin/"] }
    ],
    sitemap: `${settings.siteUrl}/sitemap.xml`,
    host: settings.siteUrl
  };
}
