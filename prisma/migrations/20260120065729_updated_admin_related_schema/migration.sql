/*
  Warnings:

  - You are about to drop the column `calories` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `carbs` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `fat` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `fiber` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `potassium` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `protein` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `sodium` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `sugar` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Collection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CollectionProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostAsset` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_lastUpdatedById_fkey";

-- DropForeignKey
ALTER TABLE "CollectionProduct" DROP CONSTRAINT "CollectionProduct_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "CollectionProduct" DROP CONSTRAINT "CollectionProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_lastUpdatedById_fkey";

-- DropForeignKey
ALTER TABLE "PostAsset" DROP CONSTRAINT "PostAsset_postId_fkey";

-- DropForeignKey
ALTER TABLE "ProductAsset" DROP CONSTRAINT "ProductAsset_productId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "calories",
DROP COLUMN "carbs",
DROP COLUMN "fat",
DROP COLUMN "fiber",
DROP COLUMN "potassium",
DROP COLUMN "protein",
DROP COLUMN "sodium",
DROP COLUMN "sugar",
ADD COLUMN     "nutritionalInfo" JSONB;

-- DropTable
DROP TABLE "Collection";

-- DropTable
DROP TABLE "CollectionProduct";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "PostAsset";

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL DEFAULT concat('category_', gen_random_uuid()),
    "name" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "lastUpdatedById" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryProduct" (
    "categoryId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "CategoryProduct_pkey" PRIMARY KEY ("categoryId","productId")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL DEFAULT concat('post_', gen_random_uuid()),
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "contentHTML" TEXT NOT NULL,
    "sharableLink" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "lastUpdatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeAsset" (
    "id" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "type" "AssetType" NOT NULL DEFAULT 'IMAGE',

    CONSTRAINT "RecipeAsset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_publicId_key" ON "Category"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "Category_publicId_idx" ON "Category"("publicId");

-- CreateIndex
CREATE INDEX "Category_slug_idx" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "Category_isPublished_idx" ON "Category"("isPublished");

-- CreateIndex
CREATE INDEX "CategoryProduct_productId_idx" ON "CategoryProduct"("productId");

-- CreateIndex
CREATE INDEX "CategoryProduct_categoryId_idx" ON "CategoryProduct"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_publicId_key" ON "Recipe"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_slug_key" ON "Recipe"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_sharableLink_key" ON "Recipe"("sharableLink");

-- CreateIndex
CREATE INDEX "Recipe_slug_idx" ON "Recipe"("slug");

-- CreateIndex
CREATE INDEX "Recipe_publicId_idx" ON "Recipe"("publicId");

-- CreateIndex
CREATE INDEX "Recipe_isPublished_idx" ON "Recipe"("isPublished");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_lastUpdatedById_fkey" FOREIGN KEY ("lastUpdatedById") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryProduct" ADD CONSTRAINT "CategoryProduct_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryProduct" ADD CONSTRAINT "CategoryProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAsset" ADD CONSTRAINT "ProductAsset_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_lastUpdatedById_fkey" FOREIGN KEY ("lastUpdatedById") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeAsset" ADD CONSTRAINT "RecipeAsset_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
