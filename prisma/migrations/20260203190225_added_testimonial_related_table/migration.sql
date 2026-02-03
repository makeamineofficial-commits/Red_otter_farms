-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL DEFAULT concat('testimonial_', gen_random_uuid()),
    "slug" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestimonialAsset" (
    "id" TEXT NOT NULL,
    "testimonialId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "type" "AssetType" NOT NULL DEFAULT 'IMAGE',

    CONSTRAINT "TestimonialAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestimonialUserAsset" (
    "id" TEXT NOT NULL,
    "testimonialId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "type" "AssetType" NOT NULL DEFAULT 'IMAGE',

    CONSTRAINT "TestimonialUserAsset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Testimonial_publicId_key" ON "Testimonial"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "Testimonial_slug_key" ON "Testimonial"("slug");

-- AddForeignKey
ALTER TABLE "TestimonialAsset" ADD CONSTRAINT "TestimonialAsset_testimonialId_fkey" FOREIGN KEY ("testimonialId") REFERENCES "Testimonial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestimonialUserAsset" ADD CONSTRAINT "TestimonialUserAsset_testimonialId_fkey" FOREIGN KEY ("testimonialId") REFERENCES "Testimonial"("id") ON DELETE CASCADE ON UPDATE CASCADE;
