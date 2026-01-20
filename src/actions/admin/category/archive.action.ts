"use server";
import { db } from "@/lib/db";
import { Prisma } from "../../../../generated/prisma/browser";
import { validateAdmin } from "../../auth/admin.action";

interface ArchiveCategoryProps {
  publicId: string;
}
export const archiveCategory = async (category: ArchiveCategoryProps) => {
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
    const updatedCategory = await db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const updatedCategory = await tx.category.update({
          data: { isPublished: !check.isPublished },
          where: { id: check.id },
        });

        return updatedCategory;
      },
    );

    return {
      success: true,
      message: check.isPublished ? "Category archived" : "Category published",
      Category: updatedCategory,
    };
  } catch (err) {
    return { success: false, message: "Failed to change category status" };
  }
};
