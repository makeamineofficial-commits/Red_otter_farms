import { db as prisma } from "@/lib/db";

/* ---------------- CONFIG ---------------- */

const PRODUCT_COUNT = 100;

// % distribution
const MULTI_VARIANT_PERCENT = 0.4; // 40% multi
const RECIPE_LINK_PERCENT = 0.3; // 30% linked to recipes

/* ---------------- HELPERS ---------------- */

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

function getUnsplashImage(seed: string, size = "800x800") {
  return `https://source.unsplash.com/${size}/?food,product,organic&sig=${seed}`;
}
/* ---------------- MAIN ---------------- */

async function main() {
  console.log("🌱 Starting seed...");

  /* ---------- Fetch Existing Data ---------- */

  const categories = await prisma.category.findMany();
  const recipes = await prisma.recipe.findMany();

  if (!categories.length) {
    throw new Error("No categories found. Create categories first.");
  }

  if (!recipes.length) {
    console.warn("⚠️ No recipes found. Recipe linking skipped.");
  }

  console.log(`Found ${categories.length} categories`);
  console.log(`Found ${recipes.length} recipes`);

  /* ---------- Clear Old Data (Optional) ---------- */

  await prisma.variantOptionMap.deleteMany();
  await prisma.recipeIngredient.deleteMany();

  await prisma.variant.deleteMany();
  await prisma.optionValue.deleteMany();
  await prisma.option.deleteMany();
  await prisma.product.deleteMany();

  console.log("Old products cleared");

  /* ---------- Product Loop ---------- */

  for (let i = 1; i <= PRODUCT_COUNT; i++) {
    const isMulti = Math.random() < MULTI_VARIANT_PERCENT;
    const isRecipeLinked = Math.random() < RECIPE_LINK_PERCENT;

    /* ---------- Name ---------- */

    let label = isMulti ? "[MULTI]" : "[SINGLE]";
    if (isRecipeLinked) label += "[RECIPE]";

    const baseName = `Product ${i}`;
    const name = `${baseName} ${label}`;

    const slug = slugify(`${baseName}-${i}-${Date.now()}`);

    /* ---------- Create Product ---------- */

    const product = await prisma.product.create({
      data: {
        name,
        displayName: name,
        slug,
        description: `Seeded product ${i}`,
        type: "FOOD",

        healthBenefits: ["energy", "nutrition"],

        isPublished: true,
        isFeatured: Math.random() < 0.1,

        categories: {
          create: [
            {
              categoryId: randomFrom(categories).id,
            },
          ],
        },
      },
    });

    const imageCount = randomInt(3, 5);

    for (let img = 0; img < imageCount; img++) {
      const url = getUnsplashImage(`${product.id}-${img}`, "800x800");
      const thumb = getUnsplashImage(`${product.id}-${img}`, "300x300");

      await prisma.productAsset.create({
        data: {
          productId: product.id,
          url,
          thumbnail: thumb,
          type: "IMAGE",
          position: img,
          isPrimary: img === 0,
        },
      });
    }
    /* ---------- Create Option (Size) ---------- */

    const option = await prisma.option.create({
      data: {
        displayName: "Size",
        slug: `size-${product.id}`,
        productId: product.id,
      },
    });

    const sizes = isMulti ? ["Small", "Medium", "Large"] : ["Standard"];

    const optionValues = [];

    for (let j = 0; j < sizes.length; j++) {
      const val = await prisma.optionValue.create({
        data: {
          displayName: sizes[j],
          slug: `${slug}-${sizes[j].toLowerCase()}`,
          optionId: option.id,
          isDefault: j === 0,
        },
      });

      optionValues.push(val);
    }

    /* ---------- Create Variants ---------- */

    const variantCount = isMulti ? sizes.length : 1;

    const createdVariants = [];

    for (let v = 0; v < variantCount; v++) {
      const isDefault = v === 0;

      const variant = await prisma.variant.create({
        data: {
          name: `${name} - ${sizes[v]}`,
          sku: `SKU-${i}-${v}-${Date.now()}`,

          productId: product.id,

          price: randomInt(100, 500),
          mrp: randomInt(600, 900),

          availableInStock: randomInt(10, 100),
          stockLimit: 5,

          inStock: true,

          isPublished: true,
          isDefault,
        },
      });

      await prisma.variantOptionMap.create({
        data: {
          variantId: variant.id,
          valueId: optionValues[v].id,
        },
      });

      createdVariants.push(variant);
    }

    /* ---------- Link Variants to Recipes ---------- */

    if (isRecipeLinked && recipes.length) {
      const linkCount = randomInt(1, 2);

      for (let r = 0; r < linkCount; r++) {
        const recipe = randomFrom(recipes);
        const variant = randomFrom(createdVariants);

        await prisma.recipeIngredient.create({
          data: {
            recipeId: recipe.id,
            variantId: variant.id,
            quantity: randomInt(1, 5),
          },
        });
      }
    }

    if (i % 10 === 0) {
      console.log(`✅ Created ${i} products`);
    }
  }

  console.log("🌱 Seeding finished!");
}

/* ---------------- RUN ---------------- */

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
