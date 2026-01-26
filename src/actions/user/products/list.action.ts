"use server";

import { db } from "@/lib/db";
import { Product, SortBy } from "@/types/product";
import { Prisma } from "../../../../generated/prisma/browser";
import { PaginatedResponse } from "@/types/common";
import { nullToUndefined } from "@/lib/utils";

interface Filters {
  inStock?: boolean;
  category?: string;
  q?: string;
  maxPrice?: number;
  sortBy?: SortBy;
  limit?: number;
  page?: number;
}

export const listProducts = async (
  filters: Filters = {},
): Promise<PaginatedResponse<Product>> => {
  const {
    inStock = true,
    q,
    category,
    maxPrice,
    sortBy = SortBy.LATEST,
    limit = 10,
    page = 1,
  } = filters;
  console.log("[LIST CATEGORIES CALLED]", filters);
  const safeLimit = Math.max(1, Math.min(limit, 100));
  const safePage = Math.max(1, page);
  const skip = (safePage - 1) * safeLimit;

  const where: Prisma.ProductWhereInput = {
    isPublished: true,
    ...(inStock && { inStock: true }),
    ...(typeof maxPrice === "number" && {
      price: { lte: Number(maxPrice) * 100 },
    }),
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
  };

  const orderBy: Prisma.ProductOrderByWithRelationInput[] =
    sortBy === SortBy.PRICE_LOW
      ? [{ price: "asc" }, { createdAt: "desc" }]
      : sortBy === SortBy.PRICE_HIGH
        ? [{ price: "desc" }, { createdAt: "desc" }]
        : [{ createdAt: "desc" }];
  const [total, products] = await db.$transaction([
    db.product.count({ where }),
    db.product.findMany({
      where,
      skip,
      take: safeLimit,
      orderBy,
      include: {
        categories: {
          include: {
            category: {
              select: { name: true, slug: true, publicId: true },
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
    }),
  ]);

  const totalPages = Math.ceil(total / safeLimit);

  const data = products.map((product) =>
    nullToUndefined({
      ...product,
      categories: product.categories.map((c) => c.category),
      description: product.description ?? undefined,
      nutritionalInfo: product.nutritionalInfo as any,
      assets: product.assets,
    }),
  );

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
