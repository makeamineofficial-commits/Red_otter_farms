"use server";

import { db } from "@/lib/db";
import { nullToUndefined } from "@/lib/utils";

export async function getSimilarProducts(slug: string) {
  const product = await db.product.findUnique({
    where: { slug, isPublished: true },
    select: {
      healthBenefits: true,
    },
  });

  if (!product || product.healthBenefits.length === 0) {
    return [];
  }

  const products = await db.product.findMany({
    where: {
      isPublished: true,
      slug: { not: slug },
      healthBenefits: {
        hasSome: product.healthBenefits,
      },
    },
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
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
  });

  return products.map((p) =>
    nullToUndefined({
      ...p,
      categories: p.categories.map((c) => c.category),
      nutritionalInfo: p.nutritionalInfo as any,
    }),
  );
}
