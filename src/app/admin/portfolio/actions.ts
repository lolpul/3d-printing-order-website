"use server";

import { PortfolioStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin, verifyCsrf } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { portfolioInputSchema } from "@/lib/validation";
import { slugify } from "@/lib/slug";
import { removeStoredImage, storePortfolioImage } from "@/lib/storage";

async function uniqueItemSlug(baseInput: string, ignoreId?: string) {
  const base = slugify(baseInput);
  let candidate = base;
  let index = 2;
  while (index <= 101) {
    const item = await prisma.portfolioItem.findUnique({ where: { slug: candidate } });
    if (!item || item.id === ignoreId) return candidate;
    candidate = `${base}-${index}`;
    index += 1;
  }
  throw new Error("Не удалось подобрать свободный slug. Укажите slug вручную.");
}

function formBool(formData: FormData, name: string) {
  return formData.get(name) === "on" || formData.get(name) === "true";
}

function parsePortfolioForm(formData: FormData) {
  return portfolioInputSchema.parse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    shortDescription: formData.get("shortDescription"),
    description: formData.get("description"),
    clientTask: formData.get("clientTask"),
    result: formData.get("result"),
    categoryId: formData.get("categoryId"),
    materialId: formData.get("materialId"),
    color: formData.get("color"),
    dimensions: formData.get("dimensions"),
    quantity: formData.get("quantity"),
    productionTime: formData.get("productionTime"),
    status: formData.get("status") || "DRAFT",
    featured: formBool(formData, "featured"),
    featuredOrder: formData.get("featuredOrder") || 0,
    seoTitle: formData.get("seoTitle"),
    seoDescription: formData.get("seoDescription")
  });
}

function revalidatePortfolio(slug?: string) {
  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/portfolio/${slug}`);
}

export async function createPortfolioAction(formData: FormData) {
  await requireAdmin();
  await verifyCsrf(formData);
  const input = parsePortfolioForm(formData);
  const slug = await uniqueItemSlug(input.slug || input.title);
  const item = await prisma.portfolioItem.create({
    data: {
      ...input,
      slug,
      status: input.status as PortfolioStatus,
      publishedAt: input.status === "PUBLISHED" ? new Date() : null
    }
  });
  revalidatePortfolio(item.slug);
  redirect(`/admin/portfolio/${item.id}?saved=created`);
}

export async function updatePortfolioAction(id: string, formData: FormData) {
  await requireAdmin();
  await verifyCsrf(formData);
  const input = parsePortfolioForm(formData);
  const existing = await prisma.portfolioItem.findUnique({ where: { id } });
  if (!existing) throw new Error("Работа не найдена");
  const slug = await uniqueItemSlug(input.slug || input.title, id);
  const item = await prisma.portfolioItem.update({
    where: { id },
    data: {
      ...input,
      slug,
      status: input.status as PortfolioStatus,
      publishedAt:
        input.status === "PUBLISHED" ? existing.publishedAt ?? new Date() : null
    }
  });
  revalidatePortfolio(existing.slug);
  revalidatePortfolio(item.slug);
  redirect(`/admin/portfolio/${item.id}?saved=updated`);
}

export async function deletePortfolioAction(id: string, formData: FormData) {
  await requireAdmin();
  await verifyCsrf(formData);
  const item = await prisma.portfolioItem.findUnique({ where: { id }, include: { images: true } });
  if (!item) throw new Error("Работа не найдена");
  await prisma.portfolioItem.delete({ where: { id } });
  for (const image of item.images) {
    await removeStoredImage([image.originalPath, image.largePath, image.mediumPath, image.thumbPath, image.webpPath]);
  }
  revalidatePortfolio(item.slug);
  redirect("/admin/portfolio?deleted=1");
}

export async function uploadPortfolioImagesAction(id: string, formData: FormData) {
  await requireAdmin();
  await verifyCsrf(formData);
  const item = await prisma.portfolioItem.findUnique({ where: { id }, include: { images: true } });
  if (!item) throw new Error("Работа не найдена");
  const files = formData.getAll("images").filter((entry): entry is File => entry instanceof File && entry.size > 0);
  const maxOrder = item.images.reduce((max, image) => Math.max(max, image.sortOrder), 0);
  let order = maxOrder + 1;
  let shouldAssignCover = !item.images.some((image) => image.isCover);
  for (const file of files) {
    const stored = await storePortfolioImage(file);
    const isCover = shouldAssignCover;
    await prisma.portfolioImage.create({
      data: {
        portfolioItemId: id,
        ...stored,
        alt: "",
        sortOrder: order,
        isCover
      }
    });
    shouldAssignCover = false;
    order += 1;
  }
  revalidatePortfolio(item.slug);
  redirect(`/admin/portfolio/${id}?saved=images`);
}

export async function updateImageMetaAction(id: string, formData: FormData) {
  await requireAdmin();
  await verifyCsrf(formData);
  const item = await prisma.portfolioItem.findUnique({ where: { id }, include: { images: true } });
  if (!item) throw new Error("Работа не найдена");
  const coverId = String(formData.get("coverId") ?? "");
  for (const image of item.images) {
    await prisma.portfolioImage.update({
      where: { id: image.id },
      data: {
        alt: String(formData.get(`alt_${image.id}`) ?? ""),
        sortOrder: Number(formData.get(`order_${image.id}`) ?? image.sortOrder),
        isCover: image.id === coverId
      }
    });
  }
  revalidatePortfolio(item.slug);
  redirect(`/admin/portfolio/${id}?saved=image-meta`);
}

export async function deleteImageAction(id: string, imageId: string, formData: FormData) {
  await requireAdmin();
  await verifyCsrf(formData);
  const image = await prisma.portfolioImage.findUnique({ where: { id: imageId }, include: { portfolioItem: true } });
  if (!image || image.portfolioItemId !== id) throw new Error("Изображение не найдено");
  await prisma.portfolioImage.delete({ where: { id: imageId } });
  await removeStoredImage([image.originalPath, image.largePath, image.mediumPath, image.thumbPath, image.webpPath]);
  revalidatePortfolio(image.portfolioItem.slug);
  redirect(`/admin/portfolio/${id}?saved=image-deleted`);
}
