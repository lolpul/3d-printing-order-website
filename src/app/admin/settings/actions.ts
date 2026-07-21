"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin, verifyCsrf } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { settingsInputSchema } from "@/lib/validation";

export async function updateSettingsAction(formData: FormData) {
  await requireAdmin();
  await verifyCsrf(formData);
  const input = settingsInputSchema.parse({
    siteName: formData.get("siteName"),
    heroTitle: formData.get("heroTitle"),
    city: formData.get("city"),
    region: formData.get("region"),
    contactEmail: formData.get("contactEmail"),
    telegramUrl: formData.get("telegramUrl"),
    avitoUrl: formData.get("avitoUrl"),
    phoneNumber: formData.get("phoneNumber"),
    deliveryText: formData.get("deliveryText"),
    defaultSeoTitle: formData.get("defaultSeoTitle"),
    defaultSeoDescription: formData.get("defaultSeoDescription")
  });
  await prisma.siteSettings.upsert({
    where: { id: "site" },
    create: { id: "site", ...input },
    update: input
  });
  revalidatePath("/", "layout");
  redirect("/admin/settings?saved=1");
}
