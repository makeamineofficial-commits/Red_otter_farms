/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "sessionId" TEXT NOT NULL DEFAULT concat('session_', gen_random_uuid());

-- CreateTable
CREATE TABLE "RecipeSaves" (
    "phone" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,

    CONSTRAINT "RecipeSaves_pkey" PRIMARY KEY ("phone","recipeId")
);

-- CreateTable
CREATE TABLE "UserWishlist" (
    "phone" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "UserWishlist_pkey" PRIMARY KEY ("phone","productId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_sessionId_key" ON "Cart"("sessionId");

-- CreateIndex
CREATE INDEX "Cart_sessionId_idx" ON "Cart"("sessionId");

-- AddForeignKey
ALTER TABLE "RecipeSaves" ADD CONSTRAINT "RecipeSaves_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWishlist" ADD CONSTRAINT "UserWishlist_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
