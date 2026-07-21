import { describe, expect, it } from "vitest";
import { absoluteUrl, breadcrumbsJsonLd, faqJsonLd, localBusinessJsonLd, pageMetadata } from "@/lib/seo";
import type { SiteSettingsView } from "@/lib/settings";

const settings: SiteSettingsView = {
  siteName: "3D Печать Воронеж",
  heroTitle: "3D-печать на заказ",
  city: "Воронеж",
  region: "Воронежская область",
  contactEmail: "hello@example.local",
  telegramUrl: "",
  avitoUrl: "",
  phoneNumber: "",
  deliveryText: "Самовывоз или доставка.",
  defaultSeoTitle: "3D-печать",
  defaultSeoDescription: "Описание",
  siteUrl: "https://example.com"
};

describe("seo helpers", () => {
  it("builds absolute canonical URLs", () => {
    expect(absoluteUrl(settings, "portfolio")).toBe("https://example.com/portfolio");
  });

  it("marks admin pages as noindex when requested", () => {
    const metadata = pageMetadata(settings, {
      title: "Админка",
      description: "Вход",
      path: "/admin",
      noIndex: true
    });
    expect(metadata.robots).toEqual({ index: false, follow: false });
  });

  it("does not invent ratings or reviews in LocalBusiness JSON-LD", () => {
    const json = localBusinessJsonLd(settings);
    expect(json).not.toHaveProperty("aggregateRating");
    expect(json).not.toHaveProperty("review");
  });

  it("creates breadcrumb and FAQ JSON-LD", () => {
    expect(breadcrumbsJsonLd(settings, [{ name: "Портфолио", path: "/portfolio" }])["@type"]).toBe("BreadcrumbList");
    expect(faqJsonLd([{ question: "Можно?", answer: "Да." }]).mainEntity).toHaveLength(1);
  });
});
