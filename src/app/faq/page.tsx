import { JsonLd } from "@/components/json-ld";
import { faqItems } from "@/content/site";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/settings";

export async function generateMetadata() {
  const settings = await getSettings();
  return pageMetadata(settings, {
    title: "FAQ по 3D-печати",
    description: "Ответы на вопросы о файлах, материалах, сроках, стоимости и изготовлении деталей по фотографии.",
    path: "/faq"
  });
}

export default function FaqPage() {
  return (
    <main className="section">
      <div className="container">
        <h1 className="text-4xl font-black">Частые вопросы</h1>
        <div className="mt-8 grid gap-4">
          {faqItems.map((item) => (
            <details className="card p-6" key={item.question}>
              <summary className="cursor-pointer text-lg font-black">{item.question}</summary>
              <p className="mt-3 max-w-3xl leading-7 text-neutral-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
      <JsonLd data={faqJsonLd(faqItems)} />
    </main>
  );
}
