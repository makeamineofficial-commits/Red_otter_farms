"use server";

import { validateUser } from "@/actions/auth/user.action";
import { db } from "@/lib/db";
import { nullToUndefined } from "@/lib/utils";

export async function getSimilarProducts(slug: string) {
  const product = await db.product.findUnique({
    where: { slug, isPublished: true },
    select: {
      healthBenefits: true,
    },
  });

  if (!product || product.healthBenefits.length === 0) {
    return [];
  }

  const products = await db.product.findMany({
    where: {
      isPublished: true,
      slug: { not: slug },
      healthBenefits: {
        hasSome: product.healthBenefits,
      },
    },
    take: 4,
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
      mrp: defaultVariant?.mrp ?? null,
      price: defaultVariant?.price ?? null,
      inStock: defaultVariant.inStock,
      variants: product._count.variants,
      stockLimit: product.variants[0].stockLimit,
      availableInStock: product.variants[0].availableInStock,
    });
  });

  const user = await validateUser();

  if (user?.phone && data.length) {
    const ids = data.map((p) => p.id);

    const wishlist = await db.userWishlist.findMany({
      where: { phone: user.phone, productId: { in: ids } },
      select: { productId: true },
    });

    const set = new Set(wishlist.map((w) => w.productId));

    data = data.map((p) => ({ ...p, presentInWishlist: set.has(p.id) }));
  }

  return data;
}
