import { createPortfolioAction } from "@/app/admin/portfolio/actions";
import { AdminShell } from "@/components/admin-shell";
import { PortfolioForm } from "@/components/portfolio-form";
import { requireAdmin } from "@/lib/auth";
import { getAdminCollections } from "@/lib/portfolio";

export default async function NewPortfolioPage() {
  await requireAdmin();
  const { categories, materials } = await getAdminCollections();
  return (
    <AdminShell>
      <h1 className="text-3xl font-black">Новая работа</h1>
      <div className="mt-6">
        <PortfolioForm categories={categories} materials={materials} action={createPortfolioAction} />
      </div>
    </AdminShell>
  );
}
