"use server";

import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { nullToUndefined } from "@/lib/utils";
import { Product } from "@/types/product";
import { validateUser } from "@/actions/auth/user.action";

const _getProductCached = async (
  slug: string,
): Promise<
  | (Product & {
      id: string;
      recipes: { title: string; slug: string }[];
    })
  | null
> => {
  const product = await db.product.findUnique({
    where: { slug },
    include: {
      linkedRecipes: {
        select: {
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

  if (!product) return null;

  return nullToUndefined({
    ...product,
    description: product.description!,
    nutritionalInfo: product.nutritionalInfo as any,
    recipes: product.linkedRecipes.map((r) => r.recipe),
    categories: [],
  });
};

const getCachedProduct = unstable_cache(
  async ({ slug }: { slug: string }) => {
    return _getProductCached(slug);
  },
  // @ts-ignore
  (args) => [`product:${args.slug}`],
  {
    revalidate: 60,
    tags: ["product"],
  },
);

export const getProduct = async ({ slug }: { slug: string }) => {
  const product = await getCachedProduct({ slug });

  if (!product) {
    return {
      success: false,
      message: "Product not found",
    };
  }
  const { id, ...detail } = product;
  const user = await validateUser();
  let presentInWishlist = false;

  if (user?.phone) {
    const wishlistItem = await db.userWishlist.findUnique({
      where: {
        phone_productId: {
          phone: user.phone,
          productId: id,
        },
      },
    });

    presentInWishlist = wishlistItem !== null;
  }

  return {
    success: true,
    message: "Product details found",
    product: {
      ...detail,
      presentInWishlist,
      nutritionalInfo: detail.nutritionalInfo as Record<string, number>,
    },
  };
};
