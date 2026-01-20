"use server";
import { db } from "@/lib/db";
import { Product } from "@/types/product";
import { Prisma } from "../../../../generated/prisma/browser";
import { AssetType, PaginatedResponse } from "@/types/common";
import { nullToUndefined } from "@/lib/utils";
import { validateAdmin } from "@/actions/auth/admin.action";
interface Filters {
  showPublishedOnly?: boolean;
  q?: string;
  limit?: number;
  page?: number;
}

export const listProduct = async (
  filters: Filters = {},
): Promise<PaginatedResponse<Product>> => {
  await validateAdmin();
  const { showPublishedOnly = false, q, limit = 10, page = 1 } = filters;

  const safeLimit = Math.max(1, Math.min(limit, 100));
  const safePage = Math.max(1, page);
  const skip = (safePage - 1) * safeLimit;

  const where: Prisma.ProductWhereInput = {
    isDeleted: false,
    ...(showPublishedOnly && { isPublished: true }),
    ...(q && {
      OR: [{ name: { contains: q, mode: "insensitive" } }],
    }),
  };

  const [total, products] = await db.$transaction([
    db.product.count({ where }),
    db.product.findMany({
      where,
      skip,
      take: safeLimit,
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
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const totalPages = Math.ceil(total / safeLimit);
  const data = products.map((product) => {
    return nullToUndefined({
      ...product,
      categories: product.categories.map((c) => c.category),
      description: product.description ?? undefined,
      assets: product.assets.map((ele) => {
        return { ...ele, type: ele.type as AssetType };
      }),
    });
  });
  return {
    page: safePage,
    limit: safeLimit,
    prev: safePage > 1 ? safePage - 1 : null,
    next: safePage < totalPages ? safePage + 1 : null,
    total,
    totalPages,
    // @ts-ignore
    data,
  };
};
