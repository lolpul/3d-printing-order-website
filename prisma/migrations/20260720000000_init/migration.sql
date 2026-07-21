CREATE TYPE "PortfolioStatus" AS ENUM ('DRAFT', 'PUBLISHED');

CREATE TABLE "Category" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Material" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "shortDescription" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "PortfolioItem" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "shortDescription" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "clientTask" TEXT,
  "result" TEXT,
  "categoryId" TEXT NOT NULL,
  "materialId" TEXT NOT NULL,
  "color" TEXT,
  "dimensions" TEXT,
  "quantity" TEXT,
  "productionTime" TEXT,
  "status" "PortfolioStatus" NOT NULL DEFAULT 'DRAFT',
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "featuredOrder" INTEGER NOT NULL DEFAULT 0,
  "seoTitle" TEXT,
  "seoDescription" TEXT,
  "publishedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "PortfolioItem_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "PortfolioImage" (
  "id" TEXT NOT NULL,
  "portfolioItemId" TEXT NOT NULL,
  "originalPath" TEXT,
  "largePath" TEXT NOT NULL,
  "mediumPath" TEXT NOT NULL,
  "thumbPath" TEXT NOT NULL,
  "webpPath" TEXT,
  "alt" TEXT,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "isCover" BOOLEAN NOT NULL DEFAULT false,
  "width" INTEGER NOT NULL,
  "height" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PortfolioImage_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SiteSettings" (
  "id" TEXT NOT NULL DEFAULT 'site',
  "siteName" TEXT NOT NULL,
  "heroTitle" TEXT NOT NULL,
  "city" TEXT NOT NULL,
  "region" TEXT NOT NULL,
  "contactEmail" TEXT,
  "telegramUrl" TEXT,
  "avitoUrl" TEXT,
  "phoneNumber" TEXT,
  "deliveryText" TEXT NOT NULL,
  "defaultSeoTitle" TEXT NOT NULL,
  "defaultSeoDescription" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");
CREATE UNIQUE INDEX "Material_slug_key" ON "Material"("slug");
CREATE UNIQUE INDEX "PortfolioItem_slug_key" ON "PortfolioItem"("slug");
CREATE INDEX "PortfolioItem_status_featured_featuredOrder_idx" ON "PortfolioItem"("status", "featured", "featuredOrder");
CREATE INDEX "PortfolioItem_categoryId_idx" ON "PortfolioItem"("categoryId");
CREATE INDEX "PortfolioItem_materialId_idx" ON "PortfolioItem"("materialId");
CREATE INDEX "PortfolioImage_portfolioItemId_sortOrder_idx" ON "PortfolioImage"("portfolioItemId", "sortOrder");

ALTER TABLE "PortfolioItem" ADD CONSTRAINT "PortfolioItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "PortfolioItem" ADD CONSTRAINT "PortfolioItem_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "PortfolioImage" ADD CONSTRAINT "PortfolioImage_portfolioItemId_fkey" FOREIGN KEY ("portfolioItemId") REFERENCES "PortfolioItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
