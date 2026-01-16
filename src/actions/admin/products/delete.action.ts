"use server";
import { db } from "@/lib/db";
import { Prisma } from "../../../../generated/prisma/browser";
import { validateAdmin } from "../../auth/admin.action";

interface DeleteProductProps {
  slug: string;
}
export const deleteProduct = async (product: DeleteProductProps) => {
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
    const deletedProduct = await db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const deletedProduct = await tx.product.update({
          data: { isDeleted: true },
          where: { id: check.id },
        });

        return deletedProduct;
      }
    );

    return {
      success: true,
      message: "Product deleted",
      product: deletedProduct,
    };
  } catch (err) {
    return { success: false, message: "Failed to delete product" };
  }
};
