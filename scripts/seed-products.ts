import { db as prisma, AssetType } from "@/lib/db";

/* ------------------ CONSTANTS ------------------ */

const DUMMY_IMAGES = [
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  "https://images.unsplash.com/photo-1506806732259-39c2d0268443",
  "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
];

const PRODUCT_TYPES = [
  "FRESH",
  "ORGANIC",
  "PROCESSED",
  "PACKAGED",
  "FROZEN",
  "READY_TO_EAT",
];

const HEALTH_BENEFITS = [
  "Boosts immunity",
  "Rich in antioxidants",
  "Supports digestion",
  "Improves bone health",
  "Heart friendly",
  "High in fiber",
  "Good for skin",
  "Low in fat",
  "Improves metabolism",
];

const NUTRIENTS = [
  { key: "sodium", unit: "mg", min: 10, max: 300 },
  { key: "potassium", unit: "mg", min: 20, max: 500 },
  { key: "protein", unit: "g", min: 1, max: 20 },
  { key: "carbohydrates", unit: "g", min: 5, max: 50 },
  { key: "fat", unit: "g", min: 0, max: 15 },
  { key: "fiber", unit: "g", min: 1, max: 15 },
];

const CATEGORIES = [
  { name: "Salads", slug: "salads" },
  { name: "Fruits", slug: "fruits" },
  { name: "Cheese", slug: "cheese" },
  { name: "Vegetables", slug: "vegetables" },
  { name: "Dairy Products", slug: "dairy-products" },
  { name: "Soup", slug: "soup" },
  { name: "Flour", slug: "flour" },
];



/* ------------------ HELPERS ------------------ */

function getRandomItems<T>(arr: T[], count: number): T[] {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
}

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateNutritionalInfo() {
  const selected = getRandomItems(NUTRIENTS, randomBetween(3, 5));
  const nutrition: Record<string, string> = {};

  selected.forEach((n) => {
    nutrition[n.key] = `${randomBetween(n.min, n.max)}${n.unit}`;
  });

  return nutrition;
}

/* ------------------ SEED SCRIPT ------------------ */

async function main() {
  console.log("🌱 Seeding started...");

  /* ---------- CATEGORIES ---------- */
  const categoryMap: Record<string, string> = {};

  for (const cat of CATEGORIES) {
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        name: cat.name,
        displayName: cat.name,
        slug: cat.slug,
        description: `${cat.name} category`,
      },
    });

    categoryMap[cat.slug] = category.id;
  }

  /* ---------- PRODUCTS ---------- */
  const PRODUCTS_PER_CATEGORY = 15;
  let totalProducts = 0;

  for (const category of CATEGORIES) {
    for (let i = 1; i <= PRODUCTS_PER_CATEGORY; i++) {
      totalProducts++;

      const product = await prisma.product.create({
        data: {
          name: `${category.name} Product ${i}`,
          displayName: `${category.name} Product ${i}`,
          slug: `${category.slug}-product-${i}`,
          sku: `SKU-${category.slug.toUpperCase()}-${i}`,
          type: PRODUCT_TYPES[Math.floor(Math.random() * PRODUCT_TYPES.length)],
          description: `High quality ${category.name.toLowerCase()} product`,
          price: randomBetween(80, 300),
          mrp: randomBetween(320, 400),
          quantity: randomBetween(20, 200),

          healthBenefits: getRandomItems(HEALTH_BENEFITS, randomBetween(2, 4)),

          nutritionalInfo: generateNutritionalInfo(),
        },
      });

      /* ---------- CATEGORY LINKING ---------- */
      const linkedCategories = new Set<string>();
      linkedCategories.add(category.slug);

      // Multi-category testing
      if (i % 5 === 0) linkedCategories.add("salads");
      if (i % 7 === 0) linkedCategories.add("vegetables");

      for (const slug of linkedCategories) {
        await prisma.categoryProduct.create({
          data: {
            categoryId: categoryMap[slug],
            productId: product.id,
          },
        });
      }

      /* ---------- ASSETS ---------- */
      for (let j = 0; j < 5; j++) {
        await prisma.productAsset.create({
          data: {
            productId: product.id,
            url: DUMMY_IMAGES[j % DUMMY_IMAGES.length],
            thumbnail: DUMMY_IMAGES[j % DUMMY_IMAGES.length],
            position: j,
            isPrimary: j === 0,
            type: AssetType.IMAGE,
          },
        });
      }
    }
  }

  console.log(`✅ Seeded ${totalProducts} products with nutrition + benefits`);
}

main()
  .catch((err) => {
    console.error("❌ Seed failed", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
