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

  const recipe = await db.recipe.findUnique({
    where: {
      publicId,
    },
    include: {
      listedIngredients: {
        select: {
          quantity: true,
          variant: {
            select: {
              sku: true,
              publicId: true,
              price: true,
              product: {
                select: {
                  slug: true,
                  nutritionalInfo: true,
                  summary: true,
                  displayName: true,
                  assets: {
                    where: {
                      isPrimary: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      assets: true,
    },
  });
  if (!recipe) return { success: false, message: "Recipe details not found" };

  const data = nullToUndefined({
    ...recipe,
    listedIngredients: recipe.listedIngredients.map((ele) => {
      const { product, ...variant } = ele.variant;
      const { summary, ...detail } = product;
      return {
        quantity: ele.quantity,
        product: {
          summary: summary ?? "",
          ...detail,
        },
        variant,
      };
    }),
  });

  return {
    recipe: data,
    success: true,
    message: "Recipe details found",
  };
};
