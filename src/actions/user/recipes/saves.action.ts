"use server";

import { validateUser } from "@/actions/auth/user.action";
import { db } from "@/lib/db";

export const saveRecipe = async ({ recipeId }: { recipeId: string }) => {
  try {
    const user = await validateUser();

    if (!user || !user.phone)
      return {
        success: false,
        authenticationRequired: true,
        message: "Login required to save recipe",
      };

    const { phone } = user;

    const recipe = await db.recipe.findUnique({
      where: {
        publicId: recipeId,
      },
      select: {
        id: true,
      },
    });
    if (!recipe) return { success: false, message: "Recipe not found" };

    const check = await db.recipeSaves.findUnique({
      where: {
        phone_recipeId: {
          recipeId: recipe.id,
          phone,
        },
      },
    });

    if (check) {
      await db.recipeSaves.delete({
        where: {
          phone_recipeId: {
            recipeId: recipe.id,
            phone,
          },
        },
      });

      return { success: true, message: "Recipe removed from saves" };
    } else {
      await db.recipeSaves.create({
        data: {
          phone,
          recipeId: recipe.id,
        },
      });

      return { success: true, message: "Recipe added to saves" };
    }
  } catch (err) {
    console.log(err);

    return { success: false, message: "Failed to save recipe" };
  }
};
