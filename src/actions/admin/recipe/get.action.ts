"use server";
import { db } from "@/lib/db";
import { Recipe } from "@/types/recipe";
import { AssetType } from "@/types/common";
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
      assets: {
        select: {
          url: true,
          thumbnail: true,
          type: true,
        },
      },
    },
  });
  if (!product) return { success: false, message: "Recipe details not found" };
  const data = nullToUndefined({
    ...product,

    description: product.contentHTML ?? undefined,
    assets: product.assets.map((ele) => {
      return { ...ele, type: ele.type as AssetType };
    }),
  });

  return {
    recipe: data,
    success: true,
    message: "Recipe details found",
  };
};
