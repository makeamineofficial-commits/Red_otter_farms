import { db as prisma } from "@/lib/db";
import xlsx from "xlsx";
import path from "path";

function normalizeRow(row: any) {
  return {
    sku: row.sku?.toString().trim() || null,
  };
}

async function main() {
  try {
    /* ---------------- Load Excel ---------------- */

    const filePath = path.join(process.cwd(), "./scripts/products.xlsx");

    const workbook = xlsx.readFile(filePath);

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const rawData = xlsx.utils.sheet_to_json(sheet);

    const excelRows = rawData.map(normalizeRow).filter((r) => r.sku);

    console.log(`📄 Excel SKUs: ${excelRows.length}`);

    /* ---------------- Load Variants ---------------- */

    const variants = await prisma.variant.findMany({
      orderBy: {
        createdAt: "asc", // IMPORTANT: stable order
      },
      select: {
        id: true,
        sku: true,
      },
    });

    console.log(`🗄️ Variants in DB: ${variants.length}`);

    if (excelRows.length < variants.length) {
      console.warn("⚠️ Excel has fewer SKUs than variants!");
    }

    /* ---------------- Update Sequentially ---------------- */

    const count = Math.min(excelRows.length, variants.length);

    for (let i = 0; i < count; i++) {
      const newSku = excelRows[i].sku;
      const variantId = variants[i].id;

      await prisma.variant.update({
        where: {
          id: variantId,
        },
        data: {
          sku: newSku,
        },
      });

      console.log(`✅ ${i + 1}. Updated → ${newSku}`);
    }

    console.log("🎉 All SKUs updated successfully");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
