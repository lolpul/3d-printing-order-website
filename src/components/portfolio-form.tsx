import type { Category, Material, PortfolioImage, PortfolioItem } from "@prisma/client";
import Image from "next/image";
import { csrfToken } from "@/lib/auth";

export async function PortfolioForm({
  item,
  categories,
  materials,
  action
}: {
  item?: PortfolioItem;
  categories: Category[];
  materials: Material[];
  action: (formData: FormData) => Promise<void>;
}) {
  const csrf = await csrfToken();
  return (
    <form action={action} className="card grid gap-5 p-6">
      <input type="hidden" name="csrf" value={csrf} />
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">
          Название
          <input name="title" defaultValue={item?.title} className="rounded-md border border-[var(--line)] p-3" required />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Slug
          <input name="slug" defaultValue={item?.slug} className="rounded-md border border-[var(--line)] p-3" placeholder="сгенерируется автоматически" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Категория
          <select name="categoryId" defaultValue={item?.categoryId} className="rounded-md border border-[var(--line)] p-3" required>
            {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Материал
          <select name="materialId" defaultValue={item?.materialId} className="rounded-md border border-[var(--line)] p-3" required>
            {materials.map((material) => <option key={material.id} value={material.id}>{material.name}</option>)}
          </select>
        </label>
      </div>
      <label className="grid gap-2 text-sm font-semibold">
        Короткое описание
        <textarea name="shortDescription" defaultValue={item?.shortDescription} className="min-h-24 rounded-md border border-[var(--line)] p-3" required />
      </label>
      <label className="grid gap-2 text-sm font-semibold">
        Полное описание
        <textarea name="description" defaultValue={item?.description} className="min-h-36 rounded-md border border-[var(--line)] p-3" required />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">
          Задача клиента
          <textarea name="clientTask" defaultValue={item?.clientTask ?? ""} className="min-h-28 rounded-md border border-[var(--line)] p-3" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Результат
          <textarea name="result" defaultValue={item?.result ?? ""} className="min-h-28 rounded-md border border-[var(--line)] p-3" />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <label className="grid gap-2 text-sm font-semibold">
          Цвет
          <input name="color" defaultValue={item?.color ?? ""} className="rounded-md border border-[var(--line)] p-3" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Размеры
          <input name="dimensions" defaultValue={item?.dimensions ?? ""} className="rounded-md border border-[var(--line)] p-3" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Количество
          <input name="quantity" defaultValue={item?.quantity ?? ""} className="rounded-md border border-[var(--line)] p-3" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Срок
          <input name="productionTime" defaultValue={item?.productionTime ?? ""} className="rounded-md border border-[var(--line)] p-3" />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">
          SEO title
          <input name="seoTitle" defaultValue={item?.seoTitle ?? ""} className="rounded-md border border-[var(--line)] p-3" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          SEO description
          <input name="seoDescription" defaultValue={item?.seoDescription ?? ""} className="rounded-md border border-[var(--line)] p-3" />
        </label>
      </div>
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 font-semibold">
          <input type="checkbox" name="featured" defaultChecked={item?.featured} />
          Избранная работа
        </label>
        <label className="flex items-center gap-2 font-semibold">
          Порядок
          <input type="number" name="featuredOrder" defaultValue={item?.featuredOrder ?? 0} className="w-24 rounded-md border border-[var(--line)] p-2" />
        </label>
        <label className="flex items-center gap-2 font-semibold">
          Статус
          <select name="status" defaultValue={item?.status ?? "DRAFT"} className="rounded-md border border-[var(--line)] p-2">
            <option value="DRAFT">Черновик</option>
            <option value="PUBLISHED">Опубликовано</option>
          </select>
        </label>
      </div>
      <button className="btn btn-primary w-fit" type="submit">Сохранить</button>
    </form>
  );
}

export async function ImageManager({
  item,
  uploadAction,
  metaAction,
  deleteAction
}: {
  item: PortfolioItem & { images: PortfolioImage[] };
  uploadAction: (formData: FormData) => Promise<void>;
  metaAction: (formData: FormData) => Promise<void>;
  deleteAction: (imageId: string, formData: FormData) => Promise<void>;
}) {
  const csrf = await csrfToken();
  return (
    <section className="mt-8 grid gap-6">
      <form action={uploadAction} className="card grid gap-4 p-6">
        <input type="hidden" name="csrf" value={csrf} />
        <h2 className="text-2xl font-black">Фотографии</h2>
        <input name="images" type="file" accept="image/jpeg,image/png,image/webp" multiple className="rounded-md border border-[var(--line)] bg-white p-3" />
        <button className="btn btn-primary w-fit" type="submit">Загрузить</button>
      </form>
      {item.images.length ? (
        <form action={metaAction} className="card grid gap-4 p-6">
          <input type="hidden" name="csrf" value={csrf} />
          <h2 className="text-2xl font-black">Порядок и alt</h2>
          {item.images.map((image, index) => (
            <div key={image.id} className="grid gap-3 border-b border-[var(--line)] pb-4 md:grid-cols-[80px_1fr_100px_120px]">
              <Image
                src={image.thumbPath}
                alt={image.alt || `Фото ${index + 1}`}
                width={80}
                height={80}
                className="h-20 w-20 rounded-md object-cover"
              />
              <input name={`alt_${image.id}`} defaultValue={image.alt ?? ""} className="rounded-md border border-[var(--line)] p-3" placeholder="Alt фотографии" />
              <input name={`order_${image.id}`} type="number" defaultValue={image.sortOrder} className="rounded-md border border-[var(--line)] p-3" />
              <label className="flex items-center gap-2 font-semibold">
                <input type="radio" name="coverId" value={image.id} defaultChecked={image.isCover} />
                Обложка
              </label>
              <button formAction={deleteAction.bind(null, image.id)} className="btn btn-outline w-fit" type="submit">
                Удалить
              </button>
            </div>
          ))}
          <button className="btn btn-primary w-fit" type="submit">Сохранить фотографии</button>
        </form>
      ) : null}
    </section>
  );
}
