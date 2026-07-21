import { notFound } from "next/navigation";
import {
  deleteImageAction,
  deletePortfolioAction,
  updateImageMetaAction,
  updatePortfolioAction,
  uploadPortfolioImagesAction
} from "@/app/admin/portfolio/actions";
import { AdminShell } from "@/components/admin-shell";
import { ConfirmSubmitButton } from "@/components/confirm-submit-button";
import { ImageManager, PortfolioForm } from "@/components/portfolio-form";
import { csrfToken, requireAdmin } from "@/lib/auth";
import { getAdminCollections } from "@/lib/portfolio";
import { prisma } from "@/lib/prisma";

export default async function EditPortfolioPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const [item, collections, csrf] = await Promise.all([
    prisma.portfolioItem.findUnique({ where: { id }, include: { images: { orderBy: { sortOrder: "asc" } } } }),
    getAdminCollections(),
    csrfToken()
  ]);
  if (!item) notFound();
  return (
    <AdminShell>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-black">Редактирование работы</h1>
        <form action={deletePortfolioAction.bind(null, item.id)}>
          <input type="hidden" name="csrf" value={csrf} />
          <ConfirmSubmitButton className="btn btn-outline" message="Удалить работу и все ее фотографии?">
            Удалить работу
          </ConfirmSubmitButton>
        </form>
      </div>
      <div className="mt-6">
        <PortfolioForm
          item={item}
          categories={collections.categories}
          materials={collections.materials}
          action={updatePortfolioAction.bind(null, item.id)}
        />
        <ImageManager
          item={item}
          uploadAction={uploadPortfolioImagesAction.bind(null, item.id)}
          metaAction={updateImageMetaAction.bind(null, item.id)}
          deleteAction={deleteImageAction.bind(null, item.id)}
        />
      </div>
    </AdminShell>
  );
}
