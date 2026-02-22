"use server";

import { validateUser } from "@/actions/auth/user.action";
import { db } from "@/lib/db";
import { nullToUndefined } from "@/lib/utils";
import { isLocationNCR } from "../location/index.action";
import { use } from "react";
import { ProductPreview } from "@/types/product";

export async function getWishlist(): Promise<{ products: ProductPreview[] }> {
  try {
    const user = await validateUser();

    if (!user || !user.phone) return { products: [] };
    const { phone } = user;

    const userWishlist = (
      await db.userWishlist.findMany({
        where: {
          phone,
        },
      })
    ).map((ele) => ele.productId);

    const products = await db.product.findMany({
      where: {
        id: { in: userWishlist },
      },

      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        displayName: true,
        publicId: true,
        summary: true,
        type: true,
        nutritionalInfo: true,
        hasSubscription: true,
        isDryStore: true,
        slug: true,
        healthBenefits: true,
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

    let data = products.map((product) => {
      const defaultVariant = product.variants[0] ?? null;

      return nullToUndefined({
        id: product.id,
        variantId: product.variants[0].publicId,
        productId: product.publicId,
        type: product.type,
        summary: product.summary ?? "",
        displayName: product.displayName,
        slug: product.slug,
        nutritionalInfo: product.nutritionalInfo,
        healthBenefits: product.healthBenefits,
        assets: product.assets,
        presentInWishlist: false,
        sku: defaultVariant?.sku ?? null,
        isDrystore: product.isDryStore,
        mrp: defaultVariant?.mrp ?? null,
        price: defaultVariant?.price ?? null,
        inStock: defaultVariant.inStock,
        variants: product._count.variants,
        stockLimit: product.variants[0].stockLimit,
        availableInStock: product.variants[0].availableInStock,
        hasSubscription: product.hasSubscription,
        variantOption: defaultVariant.options.map(
          (ele) => ele.value.displayName,
        ),
      });
    });

    return { products: data };
  } catch (err) {
    return { products: [] };
  }
}
