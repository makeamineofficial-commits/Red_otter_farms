/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('CREATED', 'PENDING', 'IN_PROGRESS', 'PROCESSING', 'FAILED', 'VERIFIED', 'REFUNDED', 'UNDERPAID', 'OVERPAID', 'EXPIRED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentPurpose" AS ENUM ('ORDER');

-- AlterEnum
ALTER TYPE "CartStatus" ADD VALUE 'CHECKEDOUT';

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_variantId_fkey";

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "billing" JSONB,
ADD COLUMN     "paymentId" TEXT,
ADD COLUMN     "shipping" JSONB;

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "OrderItem";

-- DropEnum
DROP TYPE "OrderStatus";

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL DEFAULT concat('payment_', gen_random_uuid()),
    "referenceId" TEXT NOT NULL,
    "purpose" "PaymentPurpose" NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "status" "PaymentStatus" NOT NULL DEFAULT 'CREATED',
    "razorpayOrderId" TEXT,
    "razorpayPaymentId" TEXT,
    "razorpaySignature" TEXT,
    "razorpayEvent" TEXT,
    "method" TEXT,
    "provider" TEXT,
    "errorCode" TEXT,
    "errorDescription" TEXT,
    "refundId" TEXT,
    "refundAmount" INTEGER,
    "refundedAt" TIMESTAMP(3),
    "rawWebhook" JSONB,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_publicId_key" ON "Payment"("publicId");
