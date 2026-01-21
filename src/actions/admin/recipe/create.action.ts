"use server";
import { db } from "@/lib/db";
import { Prisma } from "../../../../generated/prisma/browser";
import { validateAdmin } from "../../auth/admin.action";
import { RecipeProps } from "@/types/recipe";
import { generateSlug } from "@/lib/utils";
export const createRecipe = async (recipe: RecipeProps) => {
  await validateAdmin();

  try {
    const slug = generateSlug("recipe", recipe.title);

    const newRecipe = await db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const { assets, linkedProducts, ...rest } = recipe;
        const newRecipe = await tx.recipe.create({
          data: { slug, ...rest },
        });

        await tx.recipeAsset.createMany({
          data: assets.map((ele) => {
            return {
              recipeId: newRecipe.id,
              ...ele,
            };
          }),
        });
        const products = await tx.product.findMany({
          where: {
            publicId: {
              in: linkedProducts.map((ele) => ele.publicId),
            },
          },
        });

        await tx.recipeProduct.createMany({
          data: products.map((ele) => {
            return {
              productId: ele.id,
              quantity:
                linkedProducts.find(
                  (product) => product.publicId === ele.publicId,
                )?.quantity || 1,
              recipeId: newRecipe.id,
            };
          }),
        });

        return newRecipe;
      },
    );

    return {
      success: true,
      message: "New recipe added to store",
      recipe: newRecipe,
    };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to create new recipe" };
  }
};
