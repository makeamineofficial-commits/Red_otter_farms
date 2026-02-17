-- CreateEnum
CREATE TYPE "PurchaseStatus" AS ENUM ('CREATED', 'IN_PROGRESS', 'COMPLETE', 'FAILED');

-- AlterEnum
ALTER TYPE "PaymentPurpose" ADD VALUE 'WALLET';

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "bankFee" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "customerBank" TEXT,
ADD COLUMN     "customerCardId" TEXT,
ADD COLUMN     "customerEmail" TEXT,
ADD COLUMN     "customerPhone" TEXT,
ADD COLUMN     "customerVpa" TEXT,
ADD COLUMN     "customerWallet" TEXT,
ADD COLUMN     "gatewayFee" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "isSettled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "netAmount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "settledAt" TIMESTAMP(3),
ADD COLUMN     "tax" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL DEFAULT concat('testimonial_', gen_random_uuid()),
    "amount" INTEGER NOT NULL,
    "purpose" "PaymentPurpose" NOT NULL,
    "status" "PurchaseStatus" NOT NULL DEFAULT 'CREATED',
    "paymentId" TEXT,
    "userIdentifier" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_publicId_key" ON "Purchase"("publicId");
