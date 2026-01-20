"use server";
import { db } from "@/lib/db";
import { Prisma } from "../../../../generated/prisma/browser";
import { validateAdmin } from "../../auth/admin.action";

interface ArchiveRecipeProps {
  publicId: string;
}
export const archiveRecipe = async (Recipe: ArchiveRecipeProps) => {
  await validateAdmin();
  const { publicId } = Recipe;
  try {
    const check = await db.recipe.findFirst({
      where: {
        AND: [{ publicId }],
      },
    });

    if (!check)
      return {
        success: false,
        message: "Recipe details not found",
      };
    const updatedRecipe = await db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const updatedRecipe = await tx.recipe.update({
          data: { isPublished: !check.isPublished },
          where: { id: check.id },
        });

        return updatedRecipe;
      }
    );

    return {
      success: true,
      message: check.isPublished ? "Recipe archived" : "Recipe published",
      recipe: updatedRecipe,
    };
  } catch (err) {
    return { success: false, message: "Failed to change recipe status" };
  }
};
