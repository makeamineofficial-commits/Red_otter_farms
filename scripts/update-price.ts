import { db as prisma } from "@/lib/db";

async function syncAllProductPrices() {
  console.log("Starting product price sync...");

  // Fetch all products with their variants
  const products = await prisma.product.findMany({
    select: {
      id: true,
      variants: {
        where: {
          isPublished: true,
        },
        select: {
          price: true,
        },
      },
    },
  });

  console.log(`Found ${products.length} products`);

  let updated = 0;
  let skipped = 0;

  for (const product of products) {
    const prices = product.variants.map((v) => v.price);

    // No variants → reset prices
    if (!prices.length) {
      await prisma.product.update({
        where: { id: product.id },
        data: {
          minPrice: 0,
          maxPrice: 0,
        },
      });

      skipped++;
      continue;
    }

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    await prisma.product.update({
      where: { id: product.id },
      data: {
        minPrice,
        maxPrice,
      },
    });

    updated++;

    if (updated % 100 === 0) {
      console.log(`Updated ${updated} products...`);
    }
  }

  console.log("Sync complete!");
  console.log(`Updated: ${updated}`);
  console.log(`Reset (no variants): ${skipped}`);
}

async function main() {
  try {
    await syncAllProductPrices();
  } catch (err) {
    console.error("Sync failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
