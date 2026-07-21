import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(3000),
  SITE_NAME: z.string().default("3D Печать Воронеж"),
  SITE_URL: z.string().url().default("http://localhost:3000"),
  SITE_CITY: z.string().default("Воронеж"),
  SITE_REGION: z.string().default("Воронежская область"),
  CONTACT_EMAIL: z.string().email().optional().or(z.literal("")),
  TELEGRAM_URL: z.string().url().optional().or(z.literal("")),
  AVITO_URL: z.string().url().optional().or(z.literal("")),
  PHONE_NUMBER: z.string().optional().or(z.literal("")),
  DELIVERY_TEXT: z
    .string()
    .default("Самовывоз в Воронеже или отправка по России по согласованию."),
  DATABASE_URL: z.string().optional(),
  SKIP_DB: z.enum(["0", "1", "true", "false"]).default("0").transform((value) => value === "1" || value === "true"),
  ADMIN_EMAIL: z.string().email().optional().or(z.literal("")),
  ADMIN_PASSWORD_HASH: z.string().optional().or(z.literal("")),
  AUTH_SECRET: z.string().min(32).optional().or(z.literal("")),
  UPLOAD_DIR: z.string().default("./uploads"),
  MAX_UPLOAD_SIZE_MB: z.coerce.number().min(1).max(50).default(15),
  GOOGLE_SITE_VERIFICATION: z.string().optional().or(z.literal("")),
  YANDEX_SITE_VERIFICATION: z.string().optional().or(z.literal("")),
  GOOGLE_ANALYTICS_ID: z.string().optional().or(z.literal("")),
  YANDEX_METRIKA_ID: z.string().optional().or(z.literal(""))
});

export const env = envSchema.parse(process.env);

export function hasValue(value: string | undefined | null): value is string {
  return typeof value === "string" && value.trim().length > 0;
}
