"use server";
import { db } from "@/lib/db";
import { Recipe } from "@/types/recipe";
import { nullToUndefined } from "@/lib/utils";
import { validateAdmin } from "@/actions/auth/admin.action";

export const getRecipe = async ({
  slug,
}: {
  slug: string;
}): Promise<{ recipe?: Recipe; success: boolean; message: string }> => {
  await validateAdmin();

  const product = await db.recipe.findUnique({
    where: {
      slug,
    },
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
  if (!product) return { success: false, message: "Recipe details not found" };

  const data = nullToUndefined({
    ...product,
    linkedProducts: product.linkedProducts.map((ele) => {
      return { ...ele.product };
    }),
    assets: product.assets.map((ele) => {
      return { ...ele };
    }),
  });

  return {
    // @ts-ignore
    recipe: data,
    success: true,
    message: "Recipe details found",
  };
};
