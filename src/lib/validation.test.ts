import { describe, expect, it } from "vitest";
import { imageMetaSchema, portfolioInputSchema, settingsInputSchema } from "@/lib/validation";

const basePortfolio = {
  title: "Корпус электроники",
  slug: "korpus-elektroniki",
  shortDescription: "Короткое описание работы для карточки портфолио.",
  description: "Подробное описание задачи, результата, материала и особенностей изготовления.",
  categoryId: "category-id",
  materialId: "material-id"
};

describe("portfolioInputSchema", () => {
  it("accepts draft and published states", () => {
    expect(portfolioInputSchema.parse({ ...basePortfolio, status: "DRAFT" }).status).toBe("DRAFT");
    expect(portfolioInputSchema.parse({ ...basePortfolio, status: "PUBLISHED" }).status).toBe("PUBLISHED");
  });

  it("rejects unsafe slugs", () => {
    expect(() => portfolioInputSchema.parse({ ...basePortfolio, slug: "../secret" })).toThrow();
  });
});

describe("settingsInputSchema", () => {
  it("accepts local workshop settings", () => {
    const parsed = settingsInputSchema.parse({
      siteName: "3D Печать Воронеж",
      heroTitle: "3D-печать на заказ в Воронеже",
      city: "Воронеж",
      region: "Воронежская область",
      contactEmail: "hello@example.local",
      telegramUrl: "",
      avitoUrl: "",
      phoneNumber: "",
      deliveryText: "Самовывоз или отправка по России по согласованию.",
      defaultSeoTitle: "3D-печать на заказ в Воронеже",
      defaultSeoDescription: "Изготовление пластиковых деталей и прототипов на 3D-принтере в Воронеже."
    });
    expect(parsed.city).toBe("Воронеж");
  });
});

describe("imageMetaSchema", () => {
  it("normalizes image order", () => {
    expect(imageMetaSchema.parse({ sortOrder: "5", isCover: "true" }).sortOrder).toBe(5);
  });
});
