import { db as prisma, AssetType } from "@/lib/db";

/* ------------------ CONSTANTS ------------------ */

const RECIPE_IMAGES = [
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
  "https://images.unsplash.com/photo-1529042410759-befb1204b468",
];

const RECIPES = [
  "Fresh Garden Salad",
  "Creamy Cheese Soup",
  "Fruit Power Bowl",
  "Vegetable Delight Stir Fry",
  "Cheesy Veg Bowl",
  "Healthy Mixed Soup",
  "Classic Flour Pancakes",
  "Protein Rich Salad",
  "Warm Comfort Soup",
  "Daily Nutrition Bowl",
];

const INGREDIENTS = [
  "Salt",
  "Olive oil",
  "Black pepper",
  "Garlic",
  "Onion",
  "Butter",
  "Milk",
  "Cheese",
  "Fresh vegetables",
  "Herbs",
];

const INSTRUCTIONS = [
  "Wash all ingredients thoroughly",
  "Heat oil in a pan",
  "Add chopped ingredients",
  "Cook on medium flame",
  "Stir occasionally",
  "Serve hot",
];

const CHEF_TIPS = [
  "Always use fresh ingredients",
  "Adjust salt as per taste",
  "Do not overcook vegetables",
  "Serve immediately for best flavor",
];

/* ------------------ HELPERS ------------------ */

function pickRandom<T>(arr: T[], count: number): T[] {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
}

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateNutrition() {
  return {
    calories: `${randomBetween(150, 350)}kcal`,
    protein: `${randomBetween(5, 20)}g`,
    fat: `${randomBetween(5, 18)}g`,
    carbohydrates: `${randomBetween(10, 45)}g`,
    sodium: `${randomBetween(80, 300)}mg`,
  };
}

/* ------------------ MAIN SCRIPT ------------------ */

async function main() {
  console.log("🍳 Seeding recipes...");

  const products = await prisma.product.findMany({
    select: { id: true, name: true },
  });

  if (products.length === 0) {
    throw new Error("No products found. Seed products first.");
  }

  for (const title of RECIPES) {
    const linkedProducts = pickRandom(products, randomBetween(3, 6));

    const recipe = await prisma.recipe.create({
      data: {
        title,
        slug: title.toLowerCase().replace(/\s+/g, "-"),
        summary: `A delicious and healthy ${title.toLowerCase()}`,
        tags: ["healthy", "homemade", "quick"],
        ingredients: pickRandom(INGREDIENTS, 6),
        instructions: pickRandom(INSTRUCTIONS, 5),
        chefTips: pickRandom(CHEF_TIPS, 2),
        nutritionalInfo: generateNutrition(),
        cookingTime: `${randomBetween(10, 30)} mins`,
        prepTime: `${randomBetween(5, 15)} mins`,
        difficulty: ["Easy", "Medium"][Math.floor(Math.random() * 2)],
        serving: `${randomBetween(1, 4)} people`,
      },
    });

    /* ---------- LINK PRODUCTS ---------- */
    for (const product of linkedProducts) {
      await prisma.recipeIngredient.create({
        data: {
          recipeId: recipe.id,
          variantId: product.id,
          quantity: randomBetween(1, 3),
        },
      });
    }

    /* ---------- RECIPE ASSETS ---------- */
    for (let i = 0; i < 5; i++) {
      await prisma.recipeAsset.create({
        data: {
          recipeId: recipe.id,
          url: RECIPE_IMAGES[i % RECIPE_IMAGES.length],
          thumbnail: RECIPE_IMAGES[i % RECIPE_IMAGES.length],
          position: i,
          isPrimary: i === 0,
          type: AssetType.IMAGE,
        },
      });
    }

    console.log(`✅ Recipe created: ${title}`);
  }

  console.log("🎉 Recipe seeding completed");
}

main()
  .catch((err) => {
    console.error("❌ Recipe seed failed", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
