"use server";

import { db } from "@/lib/db";
import { Product } from "@/types/product";
import { nullToUndefined } from "@/lib/utils";

export const listFeaturedProducts = async (): Promise<Product[]> => {
  const products = await db.product.findMany({
    where: {
      isFeatured: true,
      isPublished: true,
    },
    include: {
      categories: {
        include: {
          category: {
            select: { name: true, slug: true, publicId: true },
          },
        },
      },
      assets: {
        where: {
          isPrimary: true,
        },
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

  let data = products.map((product) =>
    nullToUndefined({
      ...product,
      categories: product.categories.map((c) => c.category),
      description: product.description ?? undefined,
      nutritionalInfo: product.nutritionalInfo as any,
      presentInWishlist: false,
      assets: product.assets,
    }),
  );

  return data;
};
