"use server";

import { validateUser } from "@/actions/auth/user.action";
import { db } from "@/lib/db";
import { nullToUndefined } from "@/lib/utils";
import { Recipe } from "@/types/recipe";
import { unstable_cache } from "next/cache";

/* -------------------------------------------------------------------------- */
/*                           CACHE-SAFE RECIPE QUERY                           */
/* -------------------------------------------------------------------------- */

const _getRecipeCached = async (
  slug: string,
): Promise<
  | (Recipe & {
      id: string;
      linkedProducts: {
        publicId: string;
        name: string;
        slug: string;
      }[];
    })
  | null
> => {
  const recipe = await db.recipe.findUnique({
    where: { slug },
    include: {
      linkedProducts: {
        select: {
          product: {
            select: {
              publicId: true,
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
    summary: recipe.summary,
    linkedProducts: recipe.linkedProducts.map((p) => p.product),
  });
};

/* -------------------------------------------------------------------------- */
/*                                CACHE LAYER                                  */
/* -------------------------------------------------------------------------- */

const getCachedRecipe = unstable_cache(
  async ({ slug }: { slug: string }) => {
    return _getRecipeCached(slug);
  },
  // @ts-ignore
  (args) => [`recipe:${args.slug}`],
  {
    revalidate: 60,
    tags: ["recipe"],
  },
);

/* -------------------------------------------------------------------------- */
/*                           PUBLIC SERVER ACTION                               */
/* -------------------------------------------------------------------------- */

export const getRecipe = async ({ slug }: { slug: string }) => {
  const recipe = await getCachedRecipe({ slug });

  if (!recipe) {
    return {
      success: false,
      message: "Recipe details not found",
    };
  }

  const { id, ...detail } = recipe;
  const user = await validateUser();
  let recipeSaved = false;

  if (user?.phone) {
    const saved = await db.recipeSaves.findUnique({
      where: {
        phone_recipeId: {
          phone: user.phone,
          recipeId: id,
        },
      },
    });

    recipeSaved = saved !== null;
  }

  return {
    success: true,
    message: "Recipe details found",
    recipe: {
      ...detail,
      recipeSaved,
    },
  };
};
