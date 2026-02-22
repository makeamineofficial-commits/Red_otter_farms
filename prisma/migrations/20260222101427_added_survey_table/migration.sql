-- CreateTable
CREATE TABLE "Survey" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "age" TEXT,
    "dietType" TEXT[],
    "allergies" TEXT[],
    "customAllergy" TEXT,
    "frequency" TEXT,
    "budget" TEXT,
    "priorities" TEXT[],
    "goals" TEXT[],
    "healthConditions" TEXT[],
    "customCondition" TEXT,
    "familySize" TEXT,
    "cookingFrequency" TEXT,
    "mealPrepTime" TEXT,
    "favoriteProducts" TEXT[],
    "avoidProducts" TEXT[],
    "organicImportance" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Survey_pkey" PRIMARY KEY ("id")
);
