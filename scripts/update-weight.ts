import { db } from "@/lib/db";

async function main() {
  const result = await db.product.updateMany({
    data: {
      weight: 50,
    },
  });

  console.log(`Updated ${result.count} products`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
