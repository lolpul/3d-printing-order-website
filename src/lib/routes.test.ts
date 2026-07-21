import { describe, expect, it } from "vitest";
import { adminRoutes, publicRoutes } from "@/lib/routes";

describe("routes", () => {
  it("contains required public pages", () => {
    expect(publicRoutes).toEqual(
      expect.arrayContaining([
        "/",
        "/portfolio",
        "/services",
        "/3d-pechat-po-stl",
        "/izgotovlenie-po-obrazcu",
        "/3d-modelirovanie",
        "/melkoseriynaya-pechat",
        "/materials",
        "/faq",
        "/contacts",
        "/privacy"
      ])
    );
  });

  it("keeps admin routes separate from public sitemap routes", () => {
    expect(publicRoutes.some((route) => route.startsWith("/admin"))).toBe(false);
    expect(adminRoutes).toContain("/admin/settings");
  });
});
