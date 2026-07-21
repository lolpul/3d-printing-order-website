"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/admin/actions";

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(loginAction, { message: "" });
  return (
    <main className="section">
      <div className="container max-w-md">
        <h1 className="text-4xl font-black">Вход в админ-панель</h1>
        <p className="mt-3 leading-7 text-neutral-600">
          Используйте email и пароль администратора из переменных окружения.
        </p>
        <form action={action} className="card mt-6 grid gap-4 p-6">
          <label className="grid gap-2 text-sm font-semibold">
            Email
            <input className="rounded-md border border-[var(--line)] p-3" name="email" type="email" autoComplete="username" required />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Пароль
            <input className="rounded-md border border-[var(--line)] p-3" name="password" type="password" autoComplete="current-password" required />
          </label>
          {state.message ? <p className="rounded-md bg-red-50 p-3 text-sm font-semibold text-red-700">{state.message}</p> : null}
          <button className="btn btn-primary" type="submit" disabled={pending}>
            {pending ? "Проверяем..." : "Войти"}
          </button>
        </form>
      </div>
    </main>
  );
}
