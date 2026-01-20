"use server";
import { db } from "@/lib/db";
import { Prisma } from "../../../../generated/prisma/browser";
import { validateAdmin } from "../../auth/admin.action";
import { Category, CategoryProps } from "@/types/category";

export interface UpdateCategoryProps extends CategoryProps {
  publicId: string;
  slug: string;
}

export const updateCategory = async (category: UpdateCategoryProps) => {
  await validateAdmin();
  const { publicId, slug } = category;
  try {
    const check = await db.category.findFirst({
      where: {
        AND: [{ publicId }],
      },
    });

    if (!check)
      return {
        success: false,
        message: "Category with this publicId doesn't exist",
      };

    const exist = await db.category.findFirst({
      where: {
        OR: [{ slug }],
      },
    });

    if (exist && exist.id !== check.id)
      return {
        success: false,
        message: "Category with this slug already exist",
      };
    const updatedCategory = await db.$transaction(
      async (tx: Prisma.TransactionClient): Promise<Category> => {
        const { publicId, ...rest } = category;
        const updatedCategory = await tx.category.update({
          data: { ...rest },
          where: { publicId: check.publicId },
        });
        return {
          ...updatedCategory,
          description: updatedCategory.description ?? undefined,
        };
      },
    );

    return {
      success: true,
      message: "Category updated",
      category: updatedCategory,
    };
  } catch (err) {
    return { success: false, message: "Failed to update category" };
  }
};
