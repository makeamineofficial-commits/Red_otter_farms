"use server";
import { db } from "@/lib/db";
import { Prisma } from "../../../../generated/prisma/browser";
import { validateAdmin } from "../../auth/admin.action";

interface DeleteCategoryProps {
  publicId: string;
}
export const deleteCategory = async (category: DeleteCategoryProps) => {
  await validateAdmin();
  const { publicId } = category;
  try {
    const check = await db.category.findFirst({
      where: {
        AND: [{ publicId }],
      },
    });

    if (!check)
      return {
        success: false,
        message: "Category details not found",
      };
    const deletedcategory = await db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const deletedcategory = await tx.category.delete({
          where: { id: check.id },
        });

        return deletedcategory;
      },
    );

    return {
      success: true,
      message: "Category deleted",
      category: deletedcategory,
    };
  } catch (err) {
    return { success: false, message: "Failed to delete category" };
  }
};
