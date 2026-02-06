"use server";
import { db } from "@/lib/db";
import { Prisma } from "../../../../generated/prisma/browser";
import { validateAdmin } from "../../auth/admin.action";

interface DeleteVariantProps {
  publicId: string;
}
export const deleteVariant = async (variant: DeleteVariantProps) => {
  await validateAdmin();
  const { publicId } = variant;
  try {
    const check = await db.variant.findFirst({
      where: {
        AND: [{ publicId }],
      },
    });

    if (!check)
      return {
        success: false,
        message: "Variant details not found",
      };
    const deletedVariant = await db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const deletedProduct = await tx.variant.delete({
          where: { id: check.id },
        });
        return deletedProduct;
      },
    );

    return {
      success: true,
      message: "Variant deleted",
      variant: deletedVariant,
    };
  } catch (err) {
    return { success: false, message: "Failed to delete variant" };
  }
};
