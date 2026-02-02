-- CreateEnum
CREATE TYPE "AddressLabelEnum" AS ENUM ('HOME', 'WORK', 'CUSTOM');

-- CreateTable
CREATE TABLE "AddressLabel" (
    "id" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "label" "AddressLabelEnum" NOT NULL DEFAULT 'HOME',
    "customLabel" TEXT,

    CONSTRAINT "AddressLabel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AddressLabel_addressId_key" ON "AddressLabel"("addressId");
