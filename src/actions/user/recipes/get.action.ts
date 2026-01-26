"use server";

import { db } from "@/lib/db";
import { nullToUndefined } from "@/lib/utils";
import { unstable_cache } from "next/cache";

const _getRecipe = async (slug: string) => {
  const recipe = await db.recipe.findUnique({
    where: { slug },
    include: {
      linkedProducts: {
        select: {
          product: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },

      assets: {
        select: {
          url: true,
          thumbnail: true,
          type: true,
          isPrimary: true,
          position: true,
        },
      },
    },
  });

  if (!recipe) return null;

  return nullToUndefined({
    ...recipe,
    linkedProducts: recipe.linkedProducts.map((p) => p.product),
  });
};

export const getRecipe = unstable_cache(
  async ({ slug }: { slug: string }) => {
    const data = await _getRecipe(slug);

    if (!data) {
      return { success: false, message: "Recipe details not found" };
    }

    return {
      success: true,
      message: "Recipe details found",
      recipe: data,
    };
  },
  // @ts-ignore
  (args) => [`recipe:${args.slug}`],
  {
    revalidate: 60,
    tags: ["recipe"],
  },
);
