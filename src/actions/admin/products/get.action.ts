"use server";
import { db } from "@/lib/db";
import { Product } from "@/types/product";
import { AssetType } from "@/types/common";
import { nullToUndefined } from "@/lib/utils";
import { validateAdmin } from "@/actions/auth/admin.action";

export const getProduct = async ({
  publicId,
}: {
  publicId: string;
}): Promise<{ product?: Product; success: boolean; message: string }> => {
  await validateAdmin();

  const product = await db.product.findUnique({
    where: {
      publicId,
    },

    include: {
      categories: {
        include: {
          category: {
            select: {
              name: true,
              slug: true,
              publicId: true,
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
    categories: product.categories.map((c) => c.category),
    description: product.description ?? undefined,
    presentInWishlist: false,
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
