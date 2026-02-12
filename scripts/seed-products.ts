import { db as prisma } from "@/lib/db";

export const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1610832958506-aa56368176cf",
  "https://images.unsplash.com/photo-1542838132-92c53300491e",
  "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
  "https://images.unsplash.com/photo-1573246123716-6b1782bfc499",
  "https://images.unsplash.com/photo-1606787366850-de6330128bfc",
  "https://images.unsplash.com/photo-1597362925123-77861d3fbac7",
  "https://images.unsplash.com/photo-1518843875459-f738682238a6",
];

const CATEGORY_MAP: Record<string, string> = {
  salads: "1509d9cf-0486-4240-93b8-7d367fb64c28",
  cheese: "258fcbae-00fc-4c6b-8697-492424e80ef6",
  soup: "7de7605d-afc2-4b8c-ab52-6535bd7d72e1",
  dairy: "96d3e85a-2fe5-4bda-9036-579457581583",
  flour: "d25cb277-9589-4ade-98ab-17a7861dca26",
  fruits: "e85137a0-c89d-4647-b71a-3d8c995ebbbe",
  vegetables: "fda18a30-68ae-44bc-a049-5455ab2eb25e",
};

const PRODUCTS_PER_CATEGORY = 12;

/* -------------------- Helpers -------------------- */

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 50);
}

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPrice(min = 50, max = 400) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSKU() {
  return `SKU-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

/* -------------------- Main Seeder -------------------- */

async function seed() {
  console.log("🌱 Starting product seeding...");

  for (const [category, categoryId] of Object.entries(CATEGORY_MAP)) {
    console.log(`\n📦 Seeding category: ${category}`);

    for (let i = 1; i <= PRODUCTS_PER_CATEGORY; i++) {
      const name = `${category} product ${i}`;
      const slug = `${category}-${slugify(name)}-${i}`;

      const basePrice = randomPrice();
      const mrp = basePrice + randomPrice(20, 80);

      /* ---------------- Create Product ---------------- */

      const product = await prisma.product.create({
        data: {
          name,
          displayName: name.toUpperCase(),
          slug,
          summary: `Fresh ${name} from organic farms`,
          description: `High quality ${name}. Rich in nutrients and freshness.`,
          type: "grocery",
          minPrice: basePrice,
          maxPrice: basePrice + 100,
          healthBenefits: ["Rich in vitamins", "Boosts immunity", "Organic"],

          categories: {
            create: {
              categoryId,
            },
          },
        },
      });

      /* ---------------- Create Assets ---------------- */

      const images = PRODUCT_IMAGES.sort(() => 0.5 - Math.random()).slice(0, 3);

      for (let idx = 0; idx < images.length; idx++) {
        await prisma.productAsset.create({
          data: {
            productId: product.id,
            url: images[idx],
            thumbnail: images[idx],
            position: idx,
            isPrimary: idx === 0,
          },
        });
      }

      /* ---------------- Create Option (Weight) ---------------- */

      const option = await prisma.option.create({
        data: {
          productId: product.id,
          displayName: "Weight",
          slug: `weight-${product.id}`,
        },
      });

      const weights = [250, 500, 1000];

      const optionValues = [];

      for (let j = 0; j < weights.length; j++) {
        const val = await prisma.optionValue.create({
          data: {
            optionId: option.id,
            displayName: `${weights[j]}g`,
            slug: `weight-${weights[j]}-${product.id}`,
            isDefault: j === 0,
          },
        });

        optionValues.push(val);
      }

      /* ---------------- Create Default Variant ---------------- */

      const defaultVariant = await prisma.variant.create({
        data: {
          productId: product.id,
          name: `${name} - 250g`,
          sku: generateSKU(),
          price: basePrice,
          mrp,
          weight: 250,
          weightUnit: "g",
          availableInStock: randomPrice(20, 100),
          isDefault: true,
          inStock: true,
        },
      });

      await prisma.variantOptionMap.create({
        data: {
          variantId: defaultVariant.id,
          valueId: optionValues[0].id,
        },
      });

      /* ---------------- Create Extra Variants (Random) ---------------- */

      const shouldCreateExtra = Math.random() > 0.4; // ~60% products

      if (shouldCreateExtra) {
        for (let k = 1; k < optionValues.length; k++) {
          const weight = weights[k];
          const price = basePrice + k * 40;

          const variant = await prisma.variant.create({
            data: {
              productId: product.id,
              name: `${name} - ${weight}g`,
              sku: generateSKU(),
              price,
              mrp: price + 60,
              weight,
              weightUnit: "g",
              availableInStock: randomPrice(10, 80),
              isDefault: false,
              inStock: true,
            },
          });

          await prisma.variantOptionMap.create({
            data: {
              variantId: variant.id,
              valueId: optionValues[k].id,
            },
          });
        }
      }

      /* ---------------- Create FAQs ---------------- */

      await prisma.productFAQ.createMany({
        data: [
          {
            productId: product.id,
            question: "Is this product organic?",
            answer: "Yes, it is 100% organically sourced.",
          },
          {
            productId: product.id,
            question: "How should I store it?",
            answer: "Store in a cool and dry place.",
          },
        ],
      });

      console.log(`✅ Created: ${name}`);
    }
  }

  console.log("\n🎉 Seeding completed successfully!");
}

/* -------------------- Run -------------------- */

seed()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
