import { describe, expect, it } from "vitest";
import { slugify, uniqueSlug } from "@/lib/slug";

describe("slugify", () => {
  it("transliterates russian text", () => {
    expect(slugify("Корпус для электроники")).toBe("korpus-dlya-elektroniki");
  });

  it("keeps latin, digits and hyphens", () => {
    expect(slugify("PETG holder v2")).toBe("petg-holder-v2");
  });

  it("uses fallback for empty values", () => {
    expect(slugify("   ")).toBe("rabota");
  });
});

describe("uniqueSlug", () => {
  it("increments existing slugs", async () => {
    const taken = new Set(["detal", "detal-2"]);
    await expect(uniqueSlug("Деталь", async (slug) => taken.has(slug))).resolves.toBe("detal-3");
  });
});
