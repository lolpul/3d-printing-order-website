import { materialCopy } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/settings";

export async function generateMetadata() {
  const settings = await getSettings();
  return pageMetadata(settings, {
    title: "Материалы для 3D-печати",
    description: "PLA, PETG и TPU для прототипов, корпусов, креплений, гибких деталей и декоративных изделий.",
    path: "/materials"
  });
}

export default function MaterialsPage() {
  return (
    <main className="section">
      <div className="container">
        <h1 className="text-4xl font-black">Материалы для 3D-печати</h1>
        <p className="mt-4 max-w-3xl leading-7 text-neutral-600">
          Материал выбирается под задачу: внешний вид, прочность, гибкость, условия эксплуатации и
          требования к посадке детали.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {materialCopy.map((material) => (
            <article className="card p-6" key={material.name}>
              <h2 className="text-3xl font-black">{material.name}</h2>
              <p className="mt-4 leading-7 text-neutral-600">{material.text}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-neutral-600">
          Доступные цвета, наличие материала и применимость к конкретной детали лучше уточнять перед заказом.
        </p>
      </div>
    </main>
  );
}
