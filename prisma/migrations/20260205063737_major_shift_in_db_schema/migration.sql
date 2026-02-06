/*
  Warnings:

  - You are about to drop the column `breadth` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `dimension` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `inStock` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `mrp` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `servingSize` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `servingUnit` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `sku` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `weightUnit` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `CartProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CartProduct" DROP CONSTRAINT "CartProduct_cartId_fkey";

-- DropForeignKey
ALTER TABLE "CartProduct" DROP CONSTRAINT "CartProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeProduct" DROP CONSTRAINT "RecipeProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeProduct" DROP CONSTRAINT "RecipeProduct_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeSaves" DROP CONSTRAINT "RecipeSaves_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "UserWishlist" DROP CONSTRAINT "UserWishlist_productId_fkey";

-- DropIndex
DROP INDEX "Product_inStock_idx";

-- DropIndex
DROP INDEX "Product_isPublished_idx";

-- DropIndex
DROP INDEX "Product_publicId_idx";

-- DropIndex
DROP INDEX "Product_sku_idx";

-- DropIndex
DROP INDEX "Product_sku_key";

-- DropIndex
DROP INDEX "Product_slug_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "breadth",
DROP COLUMN "currency",
DROP COLUMN "dimension",
DROP COLUMN "height",
DROP COLUMN "inStock",
DROP COLUMN "mrp",
DROP COLUMN "price",
DROP COLUMN "quantity",
DROP COLUMN "servingSize",
DROP COLUMN "servingUnit",
DROP COLUMN "sku",
DROP COLUMN "weight",
DROP COLUMN "weightUnit",
DROP COLUMN "width",
ADD COLUMN     "summary" TEXT DEFAULT '';

-- DropTable
DROP TABLE "CartProduct";

-- DropTable
DROP TABLE "OrderProduct";

-- DropTable
DROP TABLE "RecipeProduct";

-- CreateTable
CREATE TABLE "Option" (
    "id" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OptionValue" (
    "id" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "OptionValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variant" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL DEFAULT concat('variant_', gen_random_uuid()),
    "sku" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "mrp" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "weight" INTEGER NOT NULL DEFAULT 0,
    "weightUnit" TEXT NOT NULL DEFAULT 'g',
    "length" INTEGER NOT NULL DEFAULT 0,
    "lengthUnit" TEXT NOT NULL DEFAULT 'mm',
    "breadth" INTEGER NOT NULL DEFAULT 0,
    "breadthUnit" TEXT NOT NULL DEFAULT 'mm',
    "height" INTEGER NOT NULL DEFAULT 0,
    "heightUnit" TEXT NOT NULL DEFAULT 'mm',
    "availableInStock" INTEGER NOT NULL DEFAULT 0,
    "stockLimit" INTEGER NOT NULL DEFAULT 5,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VariantOptionMap" (
    "variantId" TEXT NOT NULL,
    "valueId" TEXT NOT NULL,

    CONSTRAINT "VariantOptionMap_pkey" PRIMARY KEY ("variantId","valueId")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "cartId" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("cartId","variantId")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "orderId" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("orderId","variantId")
);

-- CreateTable
CREATE TABLE "RecipeIngredient" (
    "recipeId" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("recipeId","variantId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Option_slug_key" ON "Option"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Option_productId_slug_key" ON "Option"("productId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "OptionValue_slug_key" ON "OptionValue"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "OptionValue_slug_optionId_key" ON "OptionValue"("slug", "optionId");

-- CreateIndex
CREATE UNIQUE INDEX "Variant_publicId_key" ON "Variant"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "Variant_sku_key" ON "Variant"("sku");

-- CreateIndex
CREATE INDEX "Variant_isPublished_idx" ON "Variant"("isPublished");

-- CreateIndex
CREATE INDEX "Variant_inStock_idx" ON "Variant"("inStock");

-- CreateIndex
CREATE INDEX "VariantOptionMap_valueId_idx" ON "VariantOptionMap"("valueId");

-- CreateIndex
CREATE INDEX "VariantOptionMap_variantId_idx" ON "VariantOptionMap"("variantId");

-- CreateIndex
CREATE INDEX "CartItem_variantId_idx" ON "CartItem"("variantId");

-- CreateIndex
CREATE INDEX "CartItem_cartId_idx" ON "CartItem"("cartId");

-- CreateIndex
CREATE INDEX "OrderItem_variantId_idx" ON "OrderItem"("variantId");

-- CreateIndex
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");

-- CreateIndex
CREATE INDEX "RecipeIngredient_variantId_idx" ON "RecipeIngredient"("variantId");

-- CreateIndex
CREATE INDEX "RecipeIngredient_recipeId_idx" ON "RecipeIngredient"("recipeId");

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptionValue" ADD CONSTRAINT "OptionValue_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantOptionMap" ADD CONSTRAINT "VariantOptionMap_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantOptionMap" ADD CONSTRAINT "VariantOptionMap_valueId_fkey" FOREIGN KEY ("valueId") REFERENCES "OptionValue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeSaves" ADD CONSTRAINT "RecipeSaves_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWishlist" ADD CONSTRAINT "UserWishlist_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
