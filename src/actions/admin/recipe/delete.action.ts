"use server";
import { db } from "@/lib/db";
import { Prisma } from "../../../../generated/prisma/browser";
import { validateAdmin } from "../../auth/admin.action";

interface DeleteRecipeProps {
  publicId: string;
}
export const deleteRecipe = async (Recipe: DeleteRecipeProps) => {
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
    const deletedRecipe = await db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const deletedRecipe = await tx.recipe.delete({
          where: { id: check.id },
        });
        await tx.recipeAsset.deleteMany({
          where: {
            recipeId: deletedRecipe.id,
          },
        });
        await tx.recipeProduct.deleteMany({
          where: {
            recipeId: deletedRecipe.id,
          },
        });
        return deletedRecipe;
      },
    );

    return {
      success: true,
      message: "Recipe deleted",
      recipe: deletedRecipe,
    };
  } catch (err) {
    return { success: false, message: "Failed to delete recipe" };
  }
};
