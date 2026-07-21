import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section">
      <div className="container max-w-2xl">
        <p className="text-sm font-bold uppercase text-[var(--accent-dark)]">404</p>
        <h1 className="mt-3 text-4xl font-black">Страница не найдена</h1>
        <p className="mt-4 leading-7 text-neutral-600">
          Возможно, адрес изменился или работа ещё не опубликована.
        </p>
        <Link className="btn btn-primary mt-6" href="/">На главную</Link>
      </div>
    </main>
  );
}
