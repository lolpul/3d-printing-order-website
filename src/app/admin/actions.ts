"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { clearAdminSession, setAdminSession, verifyCsrf, verifyPassword } from "@/lib/auth";

export async function loginAction(_prevState: { message: string }, formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const result = await verifyPassword(email, password, ip);
  if (!result.ok) return { message: result.message };
  await setAdminSession(email);
  redirect("/admin/portfolio");
}

export async function logoutAction(formData: FormData) {
  await verifyCsrf(formData);
  await clearAdminSession();
  redirect("/admin");
}

export async function revalidatePublicPortfolio() {
  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath("/sitemap.xml");
}
