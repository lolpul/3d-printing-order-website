import "server-only";
import { compare } from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { env, hasValue } from "@/lib/env";

const sessionCookie = "admin_session";
const csrfCookie = "admin_csrf";
const maxAgeSeconds = 60 * 60 * 8;
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

function secret() {
  if (!hasValue(env.AUTH_SECRET)) {
    throw new Error("AUTH_SECRET is required for admin authentication");
  }
  return env.AUTH_SECRET;
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const aa = Buffer.from(a);
  const bb = Buffer.from(b);
  return aa.length === bb.length && timingSafeEqual(aa, bb);
}

export function createSessionValue(email: string, now = Date.now()) {
  const payload = Buffer.from(JSON.stringify({ email, exp: now + maxAgeSeconds * 1000 })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifySessionValue(value: string | undefined) {
  if (!value?.includes(".")) return null;
  const [payload, signature] = value.split(".");
  if (!payload || !signature || !safeEqual(sign(payload), signature)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      email: string;
      exp: number;
    };
    if (!data.email || Date.now() > data.exp) return null;
    return data.email;
  } catch {
    return null;
  }
}

export async function getAdminEmailFromSession() {
  const jar = await cookies();
  return verifySessionValue(jar.get(sessionCookie)?.value);
}

export async function requireAdmin() {
  const email = await getAdminEmailFromSession();
  if (!email) redirect("/admin");
  return email;
}

export async function setAdminSession(email: string) {
  const jar = await cookies();
  jar.set(sessionCookie, createSessionValue(email), {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    maxAge: maxAgeSeconds,
    path: "/admin"
  });
}

export async function clearAdminSession() {
  const jar = await cookies();
  jar.set(sessionCookie, "", { maxAge: 0, path: "/admin" });
  jar.set(csrfCookie, "", { maxAge: 0, path: "/admin" });
}

export async function verifyPassword(email: string, password: string, ip = "local") {
  if (!hasValue(env.ADMIN_EMAIL) || !hasValue(env.ADMIN_PASSWORD_HASH)) {
    return { ok: false, message: "Администратор ещё не настроен. Заполните ADMIN_EMAIL и ADMIN_PASSWORD_HASH." };
  }
  const attempt = loginAttempts.get(ip);
  if (attempt && attempt.resetAt > Date.now() && attempt.count >= 8) {
    return { ok: false, message: "Слишком много попыток. Попробуйте позже." };
  }

  const okEmail = email.trim().toLowerCase() === env.ADMIN_EMAIL.toLowerCase();
  const okPassword = okEmail ? await compare(password, env.ADMIN_PASSWORD_HASH) : false;
  if (!okEmail || !okPassword) {
    const current = loginAttempts.get(ip);
    loginAttempts.set(ip, {
      count: (current?.count ?? 0) + 1,
      resetAt: Date.now() + 15 * 60 * 1000
    });
    return { ok: false, message: "Неверный логин или пароль." };
  }
  loginAttempts.delete(ip);
  return { ok: true, message: "OK" };
}

export async function csrfToken() {
  const jar = await cookies();
  const existing = jar.get(csrfCookie)?.value;
  if (existing && existing.includes(".") && safeEqual(sign(existing.split(".")[0]), existing.split(".")[1])) {
    return existing;
  }
  const nonce = randomBytes(24).toString("base64url");
  const value = `${nonce}.${sign(nonce)}`;
  jar.set(csrfCookie, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    maxAge: maxAgeSeconds,
    path: "/admin"
  });
  return value;
}

export async function verifyCsrf(formData: FormData) {
  const jar = await cookies();
  const token = String(formData.get("csrf") ?? "");
  const cookie = jar.get(csrfCookie)?.value;
  if (!token || !cookie || !safeEqual(token, cookie)) {
    throw new Error("CSRF token mismatch");
  }
}
