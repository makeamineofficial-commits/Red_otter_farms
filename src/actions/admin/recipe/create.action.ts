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

    const check = await db.recipe.findFirst({
      where: {
        OR: [{ sharableLink: recipe.sharableLink }],
      },
    });

    if (check)
      return {
        success: false,
        message: "Recipe with this shared link already exist",
      };

    const newRecipe = await db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const { assets, ...rest } = recipe;
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
