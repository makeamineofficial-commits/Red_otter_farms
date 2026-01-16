"use server";
import { db } from "@/lib/db";
import { Post } from "@/types/post";
import { Prisma } from "../../../../generated/prisma/browser";
import { AssetType, PaginatedResponse } from "@/types/common";
import { nullToUndefined } from "@/lib/utils";
interface Filters {
  showPublishedOnly?: boolean;
  q?: string;
  limit?: number;
  page?: number;
}

export const listPost = async (
  filters: Filters = {}
): Promise<PaginatedResponse<Post>> => {
  const { showPublishedOnly = false, q, limit = 10, page = 1 } = filters;

  const safeLimit = Math.max(1, Math.min(limit, 100));
  const safePage = Math.max(1, page);
  const skip = (safePage - 1) * safeLimit;

  const where: Prisma.PostWhereInput = {
    isDeleted: false,
    ...(showPublishedOnly && { isPublished: true }),
    ...(q && {
      OR: [{ title: { contains: q, mode: "insensitive" } }],
    }),
  };

  const [total, collections] = await db.$transaction([
    db.post.count({ where }),
    db.post.findMany({
      where,
      include: {
        assets: {
          select: {
            url: true,
            thumbnail: true,
            type: true,
            // position: true,
            // isPrimary: true,
          },
        },
      },
      skip,
      take: safeLimit,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const totalPages = Math.ceil(total / safeLimit);
  const data = collections.map((collection) => {
    return nullToUndefined({
      ...collection,
      assets: collection.assets.map((ele) => {
        const { type, ...rest } = ele;
        return { type: ele.type as AssetType, ...rest };
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
