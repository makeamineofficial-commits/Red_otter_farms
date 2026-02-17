-- AlterTable
ALTER TABLE "Purchase" ALTER COLUMN "publicId" SET DEFAULT concat('purchase_', gen_random_uuid());
