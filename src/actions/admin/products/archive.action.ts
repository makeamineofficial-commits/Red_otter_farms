"use server";
import { db } from "@/lib/db";
import { Prisma } from "../../../../generated/prisma/browser";
import { validateAdmin } from "../../auth/admin.action";

interface ArchiveProductProps {
  slug: string;
}
export const archiveProduct = async (product: ArchiveProductProps) => {
  await validateAdmin();
  const { slug } = product;
  try {
    const check = await db.product.findFirst({
      where: {
        AND: [{ slug }],
      },
    });

    if (!check)
      return {
        success: false,
        message: "Product details not found",
      };
    const updatedProduct = await db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const updatedProduct = await tx.product.update({
          data: { isPublished: !check.isPublished },
          where: { id: check.id },
        });

        return updatedProduct;
      }
    );

    return {
      success: true,
      message: check.isPublished ? "Product archived" : "Product published",
      product: updatedProduct,
    };
  } catch (err) {
    return { success: false, message: "Failed to change product status" };
  }
};
