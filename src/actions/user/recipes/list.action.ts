"use server";

import { db } from "@/lib/db";
import { Recipe, RecipePreview } from "@/types/recipe";
import { Prisma } from "../../../../generated/prisma/browser";
import { PaginatedResponse } from "@/types/common";
import { nullToUndefined } from "@/lib/utils";

interface Filters {
  q?: string;
  limit?: number;
  page?: number;
  category?: string;
}

export const listRecipes = async (
  filters: Filters = {},
): Promise<PaginatedResponse<RecipePreview>> => {
  const { q, limit = 10, page = 1, category } = filters;

  const safeLimit = Math.max(1, Math.min(limit, 100));
  const safePage = Math.max(1, page);
  const skip = (safePage - 1) * safeLimit;

  const categories = category
    ? Array.isArray(category)
      ? category
      : [category]
    : [];

  const where: Prisma.RecipeWhereInput = {
    isPublished: true,

    ...(q && {
      OR: [{ title: { contains: q, mode: "insensitive" } }],
    }),

    ...(categories.length > 0 && {
      tags: {
        hasSome: categories,
      },
    }),
  };

  const [total, recipes] = await db.$transaction([
    db.recipe.count({ where }),
    db.recipe.findMany({
      where,
      skip,
      take: safeLimit,
      orderBy: { createdAt: "desc" },
      select: {
        slug: true,
        title: true,
        summary: true,
        cookingTime: true,
        serving: true,
        difficulty: true,
        assets: {
          where: { isPrimary: true },
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

  const data = recipes.map((recipe) =>
    nullToUndefined({
      ...recipe,
      summary: recipe.summary,
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
