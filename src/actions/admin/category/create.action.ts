"use server";
import { db } from "@/lib/db";
import { Prisma } from "../../../../generated/prisma/browser";
import { validateAdmin } from "../../auth/admin.action";
import { CategoryProps } from "@/types/category";
import { generateSlug } from "@/lib/utils";
export const createCategory = async (category: CategoryProps) => {
  await validateAdmin();

  try {
    const slug = generateSlug("category", category.name);

    const newCategory = await db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const { ...rest } = category;
        const newCategory = await tx.category.create({
          data: { slug, ...rest },
        });

        return newCategory;
      },
    );

    return {
      success: true,
      message: "New category added to store",
      category: newCategory,
    };
  } catch (err) {
    return { success: false, message: "Failed to create new category" };
  }
};
