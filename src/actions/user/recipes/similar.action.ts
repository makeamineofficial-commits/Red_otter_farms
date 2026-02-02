"use server";

import { db } from "@/lib/db";
import { Prisma } from "../../../../generated/prisma/browser";
import { nullToUndefined } from "@/lib/utils";
import { Recipe } from "@/types/recipe";

export const similarRecipes = async (
  slug: string,
  limit = 6,
): Promise<Recipe[]> => {
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

  // 3️⃣ Fetch similar recipes
  const recipes = await db.recipe.findMany({
    where,
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      linkedProducts: {
        select: {
          quantity: true,
          product: {
            select: {
              publicId: true,
              name: true,
              slug: true,
              price: true,
              mrp: true,
              nutritionalInfo: true,
              displayName: true,
              description: true,
              weight: true,
              weightUnit: true,
              assets: {
                select: {
                  url: true,
                  type: true,
                },
              },
            },
          },
        },
      },
      assets: {
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

  // 4️⃣ Normalize response
  return recipes.map((recipe) =>
    nullToUndefined({
      ...recipe,
      linkedProducts: recipe.linkedProducts.map((lp) => ({
        quantity: lp.quantity,
        ...lp.product,
      })),
      assets: recipe.assets,
    }),
  );
};
