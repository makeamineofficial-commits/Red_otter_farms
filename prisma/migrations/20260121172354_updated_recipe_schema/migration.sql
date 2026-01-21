/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `contentHTML` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `sharableLink` on the `Recipe` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Recipe_sharableLink_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "contentHTML",
DROP COLUMN "isDeleted",
DROP COLUMN "sharableLink",
ADD COLUMN     "chefTips" TEXT[],
ADD COLUMN     "ingredients" TEXT[],
ADD COLUMN     "instructions" TEXT[],
ADD COLUMN     "nutritionalInfo" JSONB;

-- CreateTable
CREATE TABLE "RecipeProduct" (
    "recipeId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "RecipeProduct_pkey" PRIMARY KEY ("recipeId","productId")
);

-- CreateIndex
CREATE INDEX "RecipeProduct_productId_idx" ON "RecipeProduct"("productId");

-- CreateIndex
CREATE INDEX "RecipeProduct_recipeId_idx" ON "RecipeProduct"("recipeId");

-- AddForeignKey
ALTER TABLE "RecipeProduct" ADD CONSTRAINT "RecipeProduct_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeProduct" ADD CONSTRAINT "RecipeProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
