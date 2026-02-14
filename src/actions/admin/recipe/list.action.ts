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
        listedIngredients: {
          select: {
            quantity: true,
            variant: {
              select: {
                sku: true,
                publicId: true,
                price: true,
                options: {
                  select: {
                    value: {
                      select: {
                        displayName: true,
                      },
                    },
                  },
                },
                product: {
                  select: {
                    slug: true,
                    summary: true,
                    nutritionalInfo: true,
                    displayName: true,
                    assets: {
                      where: {
                        isPrimary: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        assets: true,
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
      listedIngredients: recipe.listedIngredients.map((ele) => {
        const { product, ...variant } = ele.variant;
        const { summary, ...detail } = product;
        const { options, ...rest } = variant;
        return {
          quantity: ele.quantity,
          product: {
            summary: summary ?? "",
            ...detail,
          },
          variant: {
            options: options.map((ele) => ele.value.displayName),
            ...rest,
          },
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
