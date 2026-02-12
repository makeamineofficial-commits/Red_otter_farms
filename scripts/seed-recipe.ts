// seed-recipe-ingredients.ts
// Run with: bun run seed-recipe-ingredients.ts

import { db as prisma } from "@/lib/db";
/* -------------------- Config -------------------- */

const INGREDIENTS_PER_RECIPE = 5; // 4–5 variants per recipe
const DRY_RUN = false; // set true to preview only

/* -------------------- Helpers -------------------- */

function shuffle<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

function randomQuantity() {
  return Math.floor(Math.random() * 3) + 1; // 1–3
}

/* -------------------- Main -------------------- */

async function seedIngredients() {
  console.log("🥗 Seeding recipe ingredients...");

  /* -------- Fetch Data -------- */

  const recipes = await prisma.recipe.findMany({
    select: { id: true, slug: true },
  });

  const variants = await prisma.variant.findMany({
    select: { id: true, name: true },
    where: { isPublished: true },
  });

  if (!recipes.length) {
    console.log("⚠️ No recipes found");
    return;
  }

  if (!variants.length) {
    console.log("⚠️ No variants found");
    return;
  }

  console.log(`Found ${recipes.length} recipes`);
  console.log(`Found ${variants.length} variants`);

  let created = 0;
  let skipped = 0;

  /* -------- Process Recipes -------- */

  for (const recipe of recipes) {
    // Check existing ingredients
    const existing = await prisma.recipeIngredient.findMany({
      where: {
        recipeId: recipe.id,
      },
      select: { variantId: true },
    });

    const usedVariantIds = new Set(existing.map((e) => e.variantId));

    if (usedVariantIds.size >= INGREDIENTS_PER_RECIPE) {
      skipped++;
      continue;
    }

    // Filter unused variants
    const available = variants.filter((v) => !usedVariantIds.has(v.id));

    if (!available.length) continue;

    // Pick random variants
    const selected = shuffle(available).slice(
      0,
      INGREDIENTS_PER_RECIPE - usedVariantIds.size,
    );

    for (const variant of selected) {
      if (DRY_RUN) {
        console.log(`🔍 [DRY] ${recipe.slug} ← ${variant.name}`);
        continue;
      }

      await prisma.recipeIngredient.create({
        data: {
          recipeId: recipe.id,
          variantId: variant.id,
          quantity: randomQuantity(),
        },
      });

      created++;
    }

    console.log(`✅ Updated recipe: ${recipe.slug}`);
  }

  console.log("\n🎉 Done!");
  console.log(`Created: ${created}`);
  console.log(`Skipped: ${skipped}`);
}

/* -------------------- Run -------------------- */

seedIngredients()
  .catch((err) => {
    console.error("❌ Error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
