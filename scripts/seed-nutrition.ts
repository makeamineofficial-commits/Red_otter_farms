// seed-product-nutrition.ts
// Run with: bun run seed-product-nutrition.ts

import { db as prisma } from "@/lib/db";

/* -------------------- Config -------------------- */

const DRY_RUN = false; // true = preview only, false = apply changes

/* -------------------- Helpers -------------------- */

function generateNutrition() {
  return {
    sodium: `${Math.floor(Math.random() * 200 + 50)}mg`,
    potassium: `${Math.floor(Math.random() * 150 + 30)}mg`,
    protein: `${Math.floor(Math.random() * 10 + 2)}g`,
    carbs: `${Math.floor(Math.random() * 40 + 10)}g`,
    fiber: `${Math.floor(Math.random() * 8 + 1)}g`,
    calories: `${Math.floor(Math.random() * 150 + 50)}kcal`,
  };
}

/* -------------------- Main -------------------- */

async function seedNutrition() {
  console.log("🥗 Seeding nutritional info for products...");

  const products = await prisma.product.findMany({
    select: {
      id: true,
      slug: true,
      nutritionalInfo: true,
    },
  });

  console.log(`Found ${products.length} products`);

  let updated = 0;
  let skipped = 0;

  for (const product of products) {
    // Skip if already has nutrition
    if (
      product.nutritionalInfo &&
      Object.keys(product.nutritionalInfo as any).length > 0
    ) {
      skipped++;
      continue;
    }

    const nutrition = generateNutrition();

    if (DRY_RUN) {
      console.log(`🔍 [DRY] ${product.slug}`, nutrition);
      continue;
    }

    await prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        nutritionalInfo: nutrition,
      },
    });

    updated++;

    console.log(`✅ Updated: ${product.slug}`);
  }

  console.log("\n🎉 Done!");
  console.log(`Updated: ${updated}`);
  console.log(`Skipped: ${skipped}`);
}

/* -------------------- Run -------------------- */

seedNutrition()
  .catch((err) => {
    console.error("❌ Error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
