"use server";
import { db } from "@/lib/db";
import { Prisma } from "../../../../generated/prisma/browser";
import { validateAdmin } from "../../auth/admin.action";
import { Recipe, RecipeProps } from "@/types/recipe";

export interface UpdateRecipeProps extends RecipeProps {
  publicId: string;
  slug: string;
}

export const updateRecipe = async (recipe: UpdateRecipeProps) => {
  await validateAdmin();
  const { publicId, slug } = recipe;
  try {
    const check = await db.recipe.findFirst({
      where: {
        AND: [{ publicId }],
      },
    });

    if (!check)
      return {
        success: false,
        message: "Recipe doesn't exist",
      };

    const updatedRecipe = await db.$transaction(
      async (tx: Prisma.TransactionClient): Promise<Recipe> => {
        const { assets, publicId, listedIngredients, ...rest } = recipe;
        const updatedRecipe = await tx.recipe.update({
          data: { ...rest },
          where: { id: check.id },
          include: {
            assets: {
              select: {
                url: true,
                thumbnail: true,
                type: true,
              },
            },
          },
        });
        await tx.recipeAsset.deleteMany({
          where: {
            recipeId: updatedRecipe.id,
          },
        });
        await tx.recipeAsset.createMany({
          data: assets.map((ele) => {
            return {
              recipeId: updatedRecipe.id,
              ...ele,
            };
          }),
        });
        await tx.recipeIngredient.deleteMany({
          where: {
            recipeId: updatedRecipe.id,
          },
        });
        const products = await tx.product.findMany({
          where: {
            publicId: {
              in: listedIngredients.map((ele) => ele.publicId),
            },
          },
        });
        await tx.recipeIngredient.createMany({
          data: products.map((ele) => {
            return {
              variantId: ele.id,
              quantity:
                listedIngredients.find(
                  (product) => product.publicId === ele.publicId,
                )?.quantity || 1,
              recipeId: updatedRecipe.id,
            };
          }),
        });

        // @ts-ignore
        return updatedRecipe;
      },
    );

    return {
      success: true,
      message: "Recipe updated",
      recipe: updatedRecipe,
    };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to update recipe" };
  }
};
