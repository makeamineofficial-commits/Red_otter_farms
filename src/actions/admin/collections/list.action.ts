"use server";
import { db } from "@/lib/db";
import { Collection } from "@/types/collection";
import { Prisma } from "../../../../generated/prisma/browser";
import { PaginatedResponse } from "@/types/common";
import { nullToUndefined } from "@/lib/utils";
interface Filters {
  showPublishedOnly?: boolean;
  q?: string;
  limit?: number;
  page?: number;
}

export const listCollection = async (
  filters: Filters = {}
): Promise<PaginatedResponse<Collection>> => {
  const { showPublishedOnly = false, q, limit = 10, page = 1 } = filters;

  const safeLimit = Math.max(1, Math.min(limit, 100));
  const safePage = Math.max(1, page);
  const skip = (safePage - 1) * safeLimit;

  const where: Prisma.CollectionWhereInput = {
    isDeleted: false,
    ...(showPublishedOnly && { isPublished: true }),
    ...(q && {
      OR: [{ name: { contains: q, mode: "insensitive" } }],
    }),
  };

  const [total, collections] = await db.$transaction([
    db.collection.count({ where }),
    db.collection.findMany({
      where,
      skip,
      take: safeLimit,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const totalPages = Math.ceil(total / safeLimit);
  const data = collections.map((collection) => {
    return nullToUndefined({
      ...collection,
      description: collection.description ?? undefined,
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
