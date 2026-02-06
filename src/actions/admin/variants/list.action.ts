"use server";
import { db } from "@/lib/db";
import { Product, Variant } from "@/types/product";
import { Prisma } from "../../../../generated/prisma/browser";
import { PaginatedResponse } from "@/types/common";
import { nullToUndefined } from "@/lib/utils";
import { validateAdmin } from "@/actions/auth/admin.action";
interface Filters {
  productId: string;
  showPublishedOnly?: boolean;
  q?: string;
  limit?: number;
  page?: number;
}

export const listVariants = async (
  filters: Filters,
): Promise<PaginatedResponse<Variant>> => {
  await validateAdmin();
  const {
    showPublishedOnly = false,
    q,
    limit = 10,
    page = 1,
    productId,
  } = filters;

  const product = await db.product.findFirst({
    where: {
      AND: [{ publicId: productId }],
    },
  });

  if (!product)
    return {
      page: 0,
      limit: 0,
      prev: null,
      next: null,
      total: 0,
      totalPages: 0,
      data: [],
    };

  const safeLimit = Math.max(1, Math.min(limit, 100));
  const safePage = Math.max(1, page);
  const skip = (safePage - 1) * safeLimit;

  const where: Prisma.VariantWhereInput = {
    productId: product.id,
    ...(showPublishedOnly && { isPublished: true }),
    ...(q && {
      OR: [{ name: { contains: q, mode: "insensitive" } }],
    }),
  };

  const [total, variants] = await db.$transaction([
    db.variant.count({ where }),
    db.variant.findMany({
      where,
      skip,
      take: safeLimit,
      include: {
        options: {
          select: {
            value: {
              include: {
                option: {
                  select: {
                    slug: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const totalPages = Math.ceil(total / safeLimit);
  const data: Variant[] = variants.map((variant) => {
    return nullToUndefined({
      ...variant,
      options: variant.options.map((ele) => {
        return {
          option: ele.value.option.slug,
          optionValue: ele.value.slug,
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
