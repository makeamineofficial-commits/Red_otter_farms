/*
  Warnings:

  - A unique constraint covering the columns `[addressId,customerId]` on the table `AddressTag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerId` to the `AddressTag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AddressTag" ADD COLUMN     "customerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AddressTag_addressId_customerId_key" ON "AddressTag"("addressId", "customerId");
