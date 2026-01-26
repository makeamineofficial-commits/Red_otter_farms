"use server";

import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { nullToUndefined } from "@/lib/utils";

const _getProduct = async (slug: string) => {
  const product = await db.product.findUnique({
    where: { slug },
    include: {
      linkedRecipes: {
        select: {
          recipe: {
            select: { title: true, slug: true },
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
    recipes: product.linkedRecipes.map((r) => r.recipe),
    categories: [],
  });
};

export const getProduct = unstable_cache(
  async ({ slug }: { slug: string }) => {
    const data = await _getProduct(slug);

    if (!data) {
      return { success: false, message: "Product not found" };
    }

    return {
      success: true,
      message: "Product details found",
      product: {
        ...data,
        nutritionalInfo: data.nutritionalInfo as Record<string, number>,
      },
    };
  },
  // @ts-ignore
  (args) => [`product:${args.slug}`],
  {
    revalidate: 60,
    tags: ["product"],
  },
);
