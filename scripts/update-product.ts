import { db as prisma, AssetType } from "@/lib/db";

/* ------------------ Helpers ------------------ */

// Default summary
function getDefaultSummary(name: string) {
  return `Fresh and high-quality ${name} straight from the farm, perfect for a healthy lifestyle.`;
}

/* ------------------ Main ------------------ */

async function main() {
  const products = await prisma.product.findMany({
    include: { assets: true },
  });

  for (const product of products) {
    /* ----------- Add Health Benefits ----------- */

    /* ----------- Default Summary ----------- */
    const summary = product.summary || getDefaultSummary(product.name);

    await prisma.product.update({
      where: { id: product.id },
      data: {
        summary,
      },
    });

    console.log(`📸 Images added → ${product.name}`);
  }

  console.log("\n✅ Done!");
}

/* ------------------ Run ------------------ */
main()
  .catch((err) => {
    console.error("❌ Error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
