import { db } from "@/lib/db";

const benefits = [
  "Low in Fat",
  "High Protein",
  "Rich in Fiber",
  "No Added Sugar",
  "Gluten Free",
  "Heart Healthy",
  "Rich in Vitamins",
  "Low Sodium",
  "Immunity Booster",
  "Natural Ingredients",
];

async function main() {
  await db.healthBenefit.createMany({
    data: benefits.map((label) => ({
      label,
    })),
    skipDuplicates: true, 
  });
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
