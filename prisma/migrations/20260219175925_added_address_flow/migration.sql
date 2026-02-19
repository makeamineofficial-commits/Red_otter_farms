/*
  Warnings:

  - You are about to drop the `AddressLabel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AddressTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "AddressLabel";

-- DropTable
DROP TABLE "AddressTag";

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL DEFAULT concat('post_', gen_random_uuid()),
    "attention" TEXT,
    "address" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "stateCode" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "county" TEXT,
    "countryCode" TEXT NOT NULL,
    "userIdentifier" TEXT NOT NULL,
    "label" "AddressLabelEnum" NOT NULL,
    "customLabel" TEXT,
    "tag" "AddressTagEnum" NOT NULL DEFAULT 'NONE',

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_publicId_key" ON "Address"("publicId");
