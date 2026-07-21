import Link from "next/link";
import type { ReactNode } from "react";
import { logoutAction } from "@/app/admin/actions";
import { csrfToken } from "@/lib/auth";

export async function AdminShell({ children }: { children: ReactNode }) {
  const csrf = await csrfToken();
  return (
    <main className="min-h-screen bg-neutral-100">
      <div className="border-b border-[var(--line)] bg-white">
        <div className="container flex min-h-16 flex-wrap items-center justify-between gap-4">
          <Link className="font-black" href="/admin/portfolio">Админ-панель</Link>
          <nav className="flex flex-wrap items-center gap-3 text-sm font-semibold">
            <Link href="/admin/portfolio">Работы</Link>
            <Link href="/admin/settings">Настройки</Link>
            <Link href="/" target="_blank">Сайт</Link>
            <form action={logoutAction}>
              <input type="hidden" name="csrf" value={csrf} />
              <button className="btn btn-outline" type="submit">Выйти</button>
            </form>
          </nav>
        </div>
      </div>
      <div className="container py-8">{children}</div>
    </main>
  );
}
