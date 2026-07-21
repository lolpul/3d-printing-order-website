import Link from "next/link";
import { serviceTeasers } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/settings";

export async function generateMetadata() {
  const settings = await getSettings();
  return pageMetadata(settings, {
    title: "Услуги 3D-печати",
    description: "Печать по STL, изготовление по образцу, моделирование, прототипы, корпуса, крепления и мелкие серии.",
    path: "/services"
  });
}

export default async function ServicesPage() {
  return (
    <main className="section">
      <div className="container">
        <h1 className="text-4xl font-black">Услуги 3D-печати</h1>
        <p className="mt-4 max-w-3xl leading-7 text-neutral-600">
          Помогаем с изготовлением пластиковых деталей по готовым файлам, чертежам, образцам и
          фотографиям. Возможность изготовления и точность оцениваются индивидуально.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {serviceTeasers.map((service) => (
            <Link className="card p-6 hover:border-emerald-300" href={service.href} key={service.href}>
              <h2 className="text-2xl font-black">{service.title}</h2>
              <p className="mt-3 leading-7 text-neutral-600">{service.text}</p>
            </Link>
          ))}
        </div>
        <section className="mt-12">
          <h2 className="text-3xl font-black">Что чаще всего заказывают</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "запасные пластиковые детали",
              "корпуса для электроники",
              "крепления, держатели и заглушки",
              "прототипы перед сборкой",
              "декоративные изделия",
              "небольшие партии одинаковых деталей"
            ].map((item) => (
              <div className="card p-4 font-semibold" key={item}>{item}</div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
