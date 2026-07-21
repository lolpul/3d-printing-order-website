import { z } from "zod";

export const portfolioStatusSchema = z.enum(["DRAFT", "PUBLISHED"]);

export const portfolioInputSchema = z.object({
  title: z.string().trim().min(3, "Укажите название").max(120),
  slug: z
    .string()
    .trim()
    .max(100)
    .regex(/^[a-z0-9-]*$/, "Slug должен содержать только латиницу, цифры и дефисы")
    .optional()
    .or(z.literal("")),
  shortDescription: z.string().trim().min(20).max(260),
  description: z.string().trim().min(40).max(5000),
  clientTask: z.string().trim().max(1600).optional().or(z.literal("")),
  result: z.string().trim().max(1600).optional().or(z.literal("")),
  categoryId: z.string().min(1),
  materialId: z.string().min(1),
  color: z.string().trim().max(80).optional().or(z.literal("")),
  dimensions: z.string().trim().max(120).optional().or(z.literal("")),
  quantity: z.string().trim().max(80).optional().or(z.literal("")),
  productionTime: z.string().trim().max(120).optional().or(z.literal("")),
  status: portfolioStatusSchema.default("DRAFT"),
  featured: z.coerce.boolean().default(false),
  featuredOrder: z.coerce.number().int().min(0).max(9999).default(0),
  seoTitle: z.string().trim().max(70).optional().or(z.literal("")),
  seoDescription: z.string().trim().max(170).optional().or(z.literal(""))
});

export const settingsInputSchema = z.object({
  siteName: z.string().trim().min(2).max(80),
  heroTitle: z.string().trim().min(5).max(120),
  city: z.string().trim().min(2).max(80),
  region: z.string().trim().min(2).max(120),
  contactEmail: z.string().trim().email().optional().or(z.literal("")),
  telegramUrl: z.string().trim().url().optional().or(z.literal("")),
  avitoUrl: z.string().trim().url().optional().or(z.literal("")),
  phoneNumber: z.string().trim().max(40).optional().or(z.literal("")),
  deliveryText: z.string().trim().min(10).max(400),
  defaultSeoTitle: z.string().trim().min(10).max(70),
  defaultSeoDescription: z.string().trim().min(30).max(170)
});

export const imageMetaSchema = z.object({
  alt: z.string().trim().max(180).optional().or(z.literal("")),
  sortOrder: z.coerce.number().int().min(0).max(9999).default(0),
  isCover: z.coerce.boolean().default(false)
});

export type PortfolioInput = z.infer<typeof portfolioInputSchema>;
export type SettingsInput = z.infer<typeof settingsInputSchema>;
