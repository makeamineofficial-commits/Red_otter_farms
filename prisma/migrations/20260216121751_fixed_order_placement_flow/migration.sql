/*
  Warnings:

  - You are about to drop the column `billing` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `paymentId` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `shipping` on the `Cart` table. All the data in the column will be lost.
  - Added the required column `netTotal` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingFee` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subTotal` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('RAZORPAY', 'OTTER', 'SPLIT');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PaymentPurpose" ADD VALUE 'OTTER_PASS';
ALTER TYPE "PaymentPurpose" ADD VALUE 'NUTRITION_METER';

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "billing",
DROP COLUMN "paymentId",
DROP COLUMN "shipping";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "billing" JSONB,
ADD COLUMN     "discount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "netTotal" INTEGER NOT NULL,
ADD COLUMN     "paymentId" TEXT,
ADD COLUMN     "paymentMethod" "PaymentMethod" NOT NULL,
ADD COLUMN     "shipping" JSONB,
ADD COLUMN     "shippingFee" INTEGER NOT NULL,
ADD COLUMN     "subTotal" INTEGER NOT NULL,
ADD COLUMN     "total" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "isPartial" BOOLEAN NOT NULL DEFAULT false;
