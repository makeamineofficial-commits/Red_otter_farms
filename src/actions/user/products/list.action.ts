"use server";

import { db } from "@/lib/db";
import { ProductPreview, SortBy } from "@/types/product";
import { Prisma } from "../../../../generated/prisma/browser";
import { PaginatedResponse } from "@/types/common";
import { nullToUndefined } from "@/lib/utils";
import { validateUser, validateUserReadOnly } from "@/actions/auth/user.action";

interface Filters {
  inStock?: boolean;
  category?: string;
  q?: string;
  maxPrice?: number;
  sortBy?: SortBy;
  limit?: number;
  page?: number;
  benefits?: string[]; // ✅ added
}

export const listProducts = async (
  filters: Filters = {},
): Promise<PaginatedResponse<ProductPreview>> => {
  const {
    inStock = true,
    q,
    category,
    maxPrice,
    sortBy = SortBy.LATEST,
    limit = 10,
    page = 1,
    benefits,
  } = filters;

  const safeLimit = Math.max(1, Math.min(limit, 100));
  const safePage = Math.max(1, page);
  const skip = (safePage - 1) * safeLimit;

  // ✅ Convert ₹ → paise
  const maxPricePaise =
    typeof maxPrice === "number" ? Math.round(maxPrice * 100) : undefined;

  /* ---------------- WHERE ---------------- */

  const where: Prisma.ProductWhereInput = {
    isPublished: true,

    ...(q && {
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { displayName: { contains: q, mode: "insensitive" } },
      ],
    }),

    ...(category && {
      categories: {
        some: {
          category: { slug: category },
        },
      },
    }),

    ...(benefits?.length
      ? {
          healthBenefits: {
            hasSome: benefits, // ✅ match at least one selected benefit
          },
        }
      : {}),

    ...(typeof maxPricePaise === "number" && {
      minPrice: {
        lte: maxPricePaise,
      },
    }),

    ...(inStock && {
      variants: {
        some: {
          isDefault: true,
          isPublished: true,
          inStock: true,
        },
      },
    }),
  };

  /* ---------------- ORDER BY ---------------- */

  const orderBy: Prisma.ProductOrderByWithRelationInput[] =
    sortBy === SortBy.PRICE_LOW
      ? [{ minPrice: "asc" }, { createdAt: "desc" }]
      : sortBy === SortBy.PRICE_HIGH
        ? [{ maxPrice: "desc" }, { createdAt: "desc" }]
        : [{ createdAt: "desc" }];

  /* ---------------- QUERY ---------------- */

  const [total, products] = await db.$transaction([
    db.product.count({ where }),

    db.product.findMany({
      where,
      skip,
      take: safeLimit,
      orderBy,

      select: {
        id: true,
        summary: true,
        type: true,
        publicId: true,
        displayName: true,
        nutritionalInfo: true,
        slug: true,
        healthBenefits: true,

        assets: {
          where: { isPrimary: true },
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
            isPublished: true,
          },
          take: 1,
          select: {
            sku: true,
            mrp: true,
            publicId: true,
            price: true,
            inStock: true,
            stockLimit: true,
            availableInStock: true,
          },
        },

        _count: {
          select: { variants: true },
        },
      },
    }),
  ]);

  /* ---------------- MAP ---------------- */

  const totalPages = Math.ceil(total / safeLimit);

  let data = products
    .map((product) => {
      const defaultVariant = product.variants[0];
      if (!defaultVariant) return null;

      return nullToUndefined({
        id: product.id,
        variantId: defaultVariant.publicId,
        productId: product.publicId,
        type: product.type,
        displayName: product.displayName,
        slug: product.slug,
        summary: product.summary ?? "",
        nutritionalInfo: product.nutritionalInfo,
        healthBenefits: product.healthBenefits,
        assets: product.assets,
        presentInWishlist: false,
        sku: defaultVariant.sku,
        inStock: defaultVariant.inStock,
        mrp: defaultVariant.mrp,
        price: defaultVariant.price,
        variants: product._count.variants,
        stockLimit: product.variants[0].stockLimit,
        availableInStock: product.variants[0].availableInStock,
      });
    })
    .filter(Boolean) as (ProductPreview & { id: string })[];

  /* ---------------- WISHLIST (OPTIMIZED) ---------------- */

  const user = await validateUserReadOnly();

  if (user?.phone && data.length) {
    const ids = data.map((p) => p.id);

    const wishlist = await db.userWishlist.findMany({
      where: { phone: user.phone, productId: { in: ids } },
      select: { productId: true },
    });

    const set = new Set(wishlist.map((w) => w.productId));

    data = data.map((p) => ({ ...p, presentInWishlist: set.has(p.id) }));
  }

  /* ---------------- RETURN ---------------- */

  return {
    page: safePage,
    limit: safeLimit,
    prev: safePage > 1 ? safePage - 1 : null,
    next: safePage < totalPages ? safePage + 1 : null,
    total,
    totalPages,
    data,
  };
};
