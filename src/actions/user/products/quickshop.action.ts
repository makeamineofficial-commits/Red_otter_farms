import React from "react";

import { Product, Variant } from "@/types/product";
import { db } from "@/lib/db";
import { nullToUndefined } from "@/lib/utils";
import { isLocationNCR } from "../location/index.action";

export default async function quickShop(): Promise<
  {
    displayName: string;
    slug: string;
    products: (Product & { variants: Variant[] })[];
  }[]
> {
  const isNCR = await isLocationNCR();

  const locationFilter = isNCR ? {} : { isDryStore: true };
  const categories = await db.category.findMany({
    where: { quickShop: true, isPublished: true },
    include: {
      products: {
        where: {
          product: {
            isPublished: true,
            ...locationFilter,
          },
        },

        select: {
          product: {
            include: {
              faqs: {
                select: {
                  question: true,
                  answer: true,
                },
              },
              assets: true,
              options: { include: { values: true } },
              variants: {
                where: {
                  isPublished: true,
                },
                include: {
                  options: {
                    select: {
                      value: {
                        include: { option: { select: { slug: true } } },
                      },
                    },
                  },
                  listedIngredients: {
                    select: { recipe: { select: { title: true, slug: true } } },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return categories.map((ele) => {
    const { displayName, slug, products } = ele;
    return {
      displayName,
      slug,
      products: products.map(({ product }) => {
        return nullToUndefined({
          ...product,
          nutritionalInfo: product.nutritionalInfo as any,
          summary: product.summary ?? "",
          description: product.description ?? "",
          categories: [],
          variants: product.variants.map((ele) => {
            return {
              ...ele,
              options: ele.options.map((ele) => {
                return {
                  option: ele.value.option.slug,
                  optionValue: ele.value.slug,
                };
              }),
            };
          }),
          options: product.options.map((o) => ({
            displayName: o.displayName,
            slug: o.slug,
            values: o.values.map((v) => ({
              displayName: v.displayName,
              slug: v.slug,
              isDefault: v.isDefault,
            })),
          })),
          recipes: [],
          presentInWishlist: false,
        });
      }),
    };
  });
}
