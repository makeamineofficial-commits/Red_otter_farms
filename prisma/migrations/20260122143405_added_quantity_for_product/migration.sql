-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "cookingTime" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "difficulty" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "prepTime" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "serving" TEXT NOT NULL DEFAULT '';
