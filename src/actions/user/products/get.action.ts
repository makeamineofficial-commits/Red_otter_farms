"use server";
import { db } from "@/lib/db";
import { Product } from "@/types/product";
import { nullToUndefined } from "@/lib/utils";

export const getProduct = async ({
  slug,
}: {
  slug: string;
}): Promise<{
  product?: Product & { recipes: { title: string; slug: string }[] };
  success: boolean;
  message: string;
}> => {

  const product = await db.product.findUnique({
    where: {
      slug,
    },

    include: {
      linkedRecipes: {
        include: {
          recipe: {
            select: {
              title: true,
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
          position: true,
          isPrimary: true,
        },
      },
    },
  });
  if (!product) return { success: true, message: "Product details found" };
  const data = nullToUndefined({
    ...product,
    categories: [],
    description: product.description ?? undefined,
    recipes: product.linkedRecipes.map((ele) => ele.recipe),
    assets: product.assets.map((ele) => {
      return { ...ele };
    }),
  });

  return {
    product: {
      ...data,
      nutritionalInfo: data.nutritionalInfo as Record<string, number>,
    },
    success: true,
    message: "Product details found",
  };
};
