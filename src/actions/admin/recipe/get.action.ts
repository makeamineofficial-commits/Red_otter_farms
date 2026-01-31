"use server";
import { db } from "@/lib/db";
import { Recipe } from "@/types/recipe";
import { nullToUndefined } from "@/lib/utils";
import { validateAdmin } from "@/actions/auth/admin.action";

export const getRecipe = async ({
  publicId,
}: {
  publicId: string;
}): Promise<{ recipe?: Recipe; success: boolean; message: string }> => {
  await validateAdmin();

  const product = await db.recipe.findUnique({
    where: {
      publicId,
    },
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
      return { quantity: ele.quantity, ...ele.product };
    }),
    assets: product.assets.map((ele) => {
      return { ...ele };
    }),
  });

  return {
    recipe: data,
    success: true,
    message: "Recipe details found",
  };
};
