-- CreateEnum
CREATE TYPE "AddressTagEnum" AS ENUM ('BILLING', 'SHIPPING', 'NONE');

-- CreateTable
CREATE TABLE "AddressTag" (
    "id" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "tag" "AddressTagEnum" NOT NULL,

    CONSTRAINT "AddressTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AddressTag_addressId_key" ON "AddressTag"("addressId");
