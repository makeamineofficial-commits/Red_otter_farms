"use server";
import { db } from "@/lib/db";
import { Recipe } from "@/types/recipe";
import { Prisma } from "../../../../generated/prisma/browser";
import { AssetType, PaginatedResponse } from "@/types/common";
import { nullToUndefined } from "@/lib/utils";
interface Filters {
  showPublishedOnly?: boolean;
  q?: string;
  limit?: number;
  page?: number;
}

export const listRecipe = async (
  filters: Filters = {},
): Promise<PaginatedResponse<Recipe>> => {
  const { showPublishedOnly = false, q, limit = 10, page = 1 } = filters;

  const safeLimit = Math.max(1, Math.min(limit, 100));
  const safePage = Math.max(1, page);
  const skip = (safePage - 1) * safeLimit;

  const where: Prisma.RecipeWhereInput = {
    ...(showPublishedOnly && { isPublished: true }),
    ...(q && {
      OR: [{ title: { contains: q, mode: "insensitive" } }],
    }),
  };

  const [total, recipes] = await db.$transaction([
    db.recipe.count({ where }),
    db.recipe.findMany({
      where,
      include: {
        linkedProducts: {
          select: {
            quantity: true,
            product: {
              select: {
                publicId: true,
                name: true,
                slug: true,
                price: true,
                mrp: true,
                nutritionalInfo: true,
                displayName: true,
                description: true,
                weight: true,
                weightUnit: true,
                assets: {
                  select: {
                    url: true,
                    type: true,
                  },
                },
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
      skip,
      take: safeLimit,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const totalPages = Math.ceil(total / safeLimit);
  const data = recipes.map((recipe) => {
    return nullToUndefined({
      ...recipe,
      linkedProducts: recipe.linkedProducts.map((ele) => {
        return { quantity: ele.quantity, ...ele.product };
      }),
      assets: recipe.assets.map((ele) => {
        return { ...ele };
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
