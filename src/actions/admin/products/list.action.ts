"use server";
import { db } from "@/lib/db";
import { Product } from "@/types/product";
import { Prisma } from "../../../../generated/prisma/browser";
import { PaginatedResponse } from "@/types/common";
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
        options: {
          include: {
            values: true,
          },
        },
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
        assets: true,
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const totalPages = Math.ceil(total / safeLimit);
  const data: Product[] = products.map((product) => {
    return nullToUndefined({
      ...product,
      summary: product.summary ?? "",
      description: product.description ?? "",
      categories: product.categories.map((c) => c.category),
      nutritionalInfo: product.nutritionalInfo as any,
      presentInWishlist: false,
      options: product.options.map((ele) => {
        return {
          displayName: ele.displayName,
          slug: ele.slug,
          values: ele.values.map((ele) => {
            return {
              displayName: ele.displayName,
              slug: ele.slug,
              isDefault: ele.isDefault,
            };
          }),
        };
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
    data,
  };
};
