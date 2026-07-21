import { env, hasValue } from "@/lib/env";
import { prisma } from "@/lib/prisma";

export type SiteSettingsView = {
  siteName: string;
  heroTitle: string;
  city: string;
  region: string;
  contactEmail: string;
  telegramUrl: string;
  avitoUrl: string;
  phoneNumber: string;
  deliveryText: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  siteUrl: string;
};

export const defaultSettings: SiteSettingsView = {
  siteName: env.SITE_NAME,
  heroTitle: "3D-печать на заказ в Воронеже",
  city: env.SITE_CITY,
  region: env.SITE_REGION,
  contactEmail: env.CONTACT_EMAIL || "",
  telegramUrl: env.TELEGRAM_URL || "",
  avitoUrl: env.AVITO_URL || "",
  phoneNumber: env.PHONE_NUMBER || "",
  deliveryText: env.DELIVERY_TEXT,
  defaultSeoTitle: "3D-печать на заказ в Воронеже",
  defaultSeoDescription:
    "Изготовление пластиковых деталей, корпусов, креплений и прототипов на 3D-принтере в Воронеже с отправкой по России.",
  siteUrl: env.SITE_URL.replace(/\/$/, "")
};

export async function getSettings(): Promise<SiteSettingsView> {
  if (env.SKIP_DB) {
    return defaultSettings;
  }

  try {
    const db = await prisma.siteSettings.findUnique({ where: { id: "site" } });
    if (!db) {
      return defaultSettings;
    }
    return {
      siteName: db.siteName || defaultSettings.siteName,
      heroTitle: db.heroTitle || defaultSettings.heroTitle,
      city: db.city || defaultSettings.city,
      region: db.region || defaultSettings.region,
      contactEmail: db.contactEmail ?? defaultSettings.contactEmail,
      telegramUrl: db.telegramUrl ?? defaultSettings.telegramUrl,
      avitoUrl: db.avitoUrl ?? defaultSettings.avitoUrl,
      phoneNumber: db.phoneNumber ?? defaultSettings.phoneNumber,
      deliveryText: db.deliveryText || defaultSettings.deliveryText,
      defaultSeoTitle: db.defaultSeoTitle || defaultSettings.defaultSeoTitle,
      defaultSeoDescription: db.defaultSeoDescription || defaultSettings.defaultSeoDescription,
      siteUrl: defaultSettings.siteUrl
    };
  } catch {
    return defaultSettings;
  }
}

export function mailtoHref(email: string): string {
  return `mailto:${email}?subject=${encodeURIComponent("Заказ на 3D-печать")}`;
}

export function contactLinks(settings: SiteSettingsView) {
  return {
    telegram: hasValue(settings.telegramUrl) ? settings.telegramUrl : "",
    email: hasValue(settings.contactEmail) ? mailtoHref(settings.contactEmail) : "",
    avito: hasValue(settings.avitoUrl) ? settings.avitoUrl : ""
  };
}
