import { db as prisma } from "@/lib/db";

const main = async () => {
  await prisma.$executeRawUnsafe(`
  UPDATE "Product"
  SET price = price * 100,
      mrp = mrp * 100
`);
  console.log("Prices updated successfully");
};

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
