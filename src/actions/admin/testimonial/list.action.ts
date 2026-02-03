"use server";
import { validateAdmin } from "@/actions/auth/admin.action";
import { db } from "@/lib/db";

import { Prisma } from "../../../../generated/prisma/browser";
import { nullToUndefined } from "@/lib/utils";
import { Testimonial } from "@/types/testimonial";
import { PaginatedResponse } from "@/types/common";
interface Filters {
  showPublishedOnly?: boolean;
  q?: string;
  limit?: number;
  page?: number;
}

export const listTestimonials = async (
  filters: Filters,
): Promise<PaginatedResponse<Testimonial>> => {
  await validateAdmin();
  const { showPublishedOnly = false, q, limit = 10, page = 1 } = filters;

  const safeLimit = Math.max(1, Math.min(limit, 100));
  const safePage = Math.max(1, page);
  const skip = (safePage - 1) * safeLimit;

  const where: Prisma.TestimonialWhereInput = {
    ...(showPublishedOnly && { isPublished: true }),
    ...(q && {
      OR: [{ name: { contains: q, mode: "insensitive" } }],
    }),
  };

  const [total, products] = await db.$transaction([
    db.testimonial.count({ where }),
    db.testimonial.findMany({
      where,
      skip,
      take: safeLimit,
      include: {
        heroImage: true,
        avatar: true,
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const totalPages = Math.ceil(total / safeLimit);
  const data = products.map((product) => {
    return nullToUndefined({
      ...product,
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
