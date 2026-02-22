"use server";

import { db } from "@/lib/db";
import { Product, ProductPreview } from "@/types/product";
import { nullToUndefined } from "@/lib/utils";
import { isLocationNCR } from "../location/index.action";
export const listFeaturedProducts = async (): Promise<ProductPreview[]> => {
  const ncr = await isLocationNCR();

  const where: any = {
    isFeatured: true,
    isPublished: true,
  };

  if (!ncr) {
    where.isDryStore = true;
  }
  const products = await db.product.findMany({
    where,
    select: {
      displayName: true,
      nutritionalInfo: true,
      slug: true,
      summary: true,
      type: true,
      publicId: true,
      isDryStore: true,
      healthBenefits: true,
      hasSubscription: true,
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
      variants: {
        where: {
          isDefault: true,
        },
        take: 1,
        select: {
          publicId: true,
          sku: true,
          mrp: true,
          price: true,
          inStock: true,
          stockLimit: true,
          availableInStock: true,
          options: {
            select: {
              value: {
                select: {
                  displayName: true,
                },
              },
            },
          },
        },
      },
      _count: {
        select: {
          variants: true,
        },
      },
    },
  });
  const data: ProductPreview[] = products.map((product) => {
    const defaultVariant = product.variants[0] ?? null;

    return nullToUndefined({
      displayName: product.displayName,
      slug: product.slug,
      variantId: product.variants[0].publicId,
      productId: product.publicId,
      type: product.type,
      summary: product.summary ?? "",
      nutritionalInfo: product.nutritionalInfo,
      healthBenefits: product.healthBenefits,
      hasSubscription: product.hasSubscription,
      assets: product.assets,
      presentInWishlist: false,
      inStock: defaultVariant.inStock,
      isDrystore: product.isDryStore,
      sku: defaultVariant?.sku ?? null,
      mrp: defaultVariant?.mrp ?? null,
      price: defaultVariant?.price ?? null,
      variants: product._count.variants,
      stockLimit: product.variants[0].stockLimit,
      availableInStock: product.variants[0].availableInStock,
      variantOption: defaultVariant.options.map((ele) => ele.value.displayName),
    });
  });

  return data;
};
