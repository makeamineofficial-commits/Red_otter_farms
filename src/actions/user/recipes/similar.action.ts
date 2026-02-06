"use server";

import { db } from "@/lib/db";
import { Prisma } from "../../../../generated/prisma/browser";
import { nullToUndefined } from "@/lib/utils";
import { RecipePreview } from "@/types/recipe";

export const similarRecipes = async (
  slug: string,
  limit = 6,
): Promise<RecipePreview[]> => {
  const baseRecipe = await db.recipe.findUnique({
    where: { slug },
    select: {
      id: true,
      tags: true,
      healthBenefits: true,
    },
  });

  if (!baseRecipe) return [];

  const { tags, healthBenefits, id } = baseRecipe;

  const where: Prisma.RecipeWhereInput = {
    isPublished: true,
    id: { not: id },

    OR: [
      tags?.length
        ? {
            tags: {
              hasSome: tags,
            },
          }
        : undefined,

      healthBenefits?.length
        ? {
            healthBenefits: {
              hasSome: healthBenefits,
            },
          }
        : undefined,
    ].filter(Boolean) as Prisma.RecipeWhereInput[],
  };

  const recipes = await db.recipe.findMany({
    where,
    take: limit,
    orderBy: { createdAt: "desc" },
    select: {
      slug: true,
      title: true,
      summary: true,
      cookingTime: true,
      serving: true,
      difficulty: true,
      assets: {
        where: { isPrimary: true },
        select: {
          url: true,
          thumbnail: true,
          type: true,
          position: true,
          isPrimary: true,
        },
      },
    },
  });

  return recipes.map((recipe) =>
    nullToUndefined({
      ...recipe,
      assets: recipe.assets,
    }),
  );
};
