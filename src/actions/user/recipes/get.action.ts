"use server";

import { validateUser } from "@/actions/auth/user.action";
import { db } from "@/lib/db";
import { nullToUndefined } from "@/lib/utils";
import { Recipe } from "@/types/recipe";
import { unstable_cache } from "next/cache";

const _getRecipeCached = async (
  slug: string,
): Promise<
  | (Recipe & {
      id: string;
    })
  | null
> => {
  const recipe = await db.recipe.findUnique({
    where: { slug },
    include: {
      listedIngredients: {
        select: {
          quantity: true,
          variant: {
            select: {
              sku: true,
              price: true,
              publicId: true,
              product: {
                select: {
                  summary: true,
                  displayName: true,
                  nutritionalInfo: true,
                  slug: true,
                  assets: {
                    where: {
                      isPrimary: true,
                    },
                    take: 1,
                    select: {
                      url: true,
                      thumbnail: true,
                      type: true,
                      position: true,
                      isPrimary: true,
                    },
                  },
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
    listedIngredients:
      recipe.listedIngredients?.map(({ variant, quantity }) => {
        const { product, ...details } = variant;
        const { summary, ...productDetails } = product;
        return {
          variant: details,
          product: { summary: summary ?? "", ...productDetails },
          quantity,
        };
      }) ?? [],
  });
};

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
