"use server";

import { db } from "@/lib/db";
import { validateAdmin } from "../../auth/admin.action";
import { ProductProps } from "@/types/product";
import { generateSlug } from "@/lib/utils";

export const createProduct = async (product: ProductProps) => {
  await validateAdmin();

  const {
    options: _options,
    categories: _categories,
    assets: _assets,
    faqs,
    maxPrice,
    minPrice,
    ...rest
  } = product;

  try {
    const slug = generateSlug("product", product.name);

    const result = await db.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          slug,
          maxPrice: maxPrice * 100,
          minPrice: minPrice * 100,
          ...rest,
        },
      });
      const categories = await tx.category.findMany({
        where: {
          publicId: { in: _categories },
        },
      });

      await tx.categoryProduct.createMany({
        data: categories.map((c) => ({
          categoryId: c.id,
          productId: product.id,
        })),
      });

      await tx.productAsset.createMany({
        data: _assets.map((ele) => {
          return {
            productId: product.id,
            ...ele,
          };
        }),
      });

      await tx.productFAQ.createMany({
        data: faqs.map((ele) => {
          return { ...ele, productId: product.id };
        }),
      });
      for (const _option of _options) {
        const { values, displayName } = _option;

        const option = await tx.option.create({
          data: {
            displayName,
            slug: generateSlug(
              "option",
              displayName.toLowerCase().split(" ").join("_"),
            ),
            productId: product.id,
          },
        });
        await tx.optionValue.createMany({
          data: values.map(({ displayName }) => {
            return {
              displayName,
              optionId: option.id,
              slug: generateSlug(
                "value",
                displayName.toLowerCase().split(" ").join("_"),
              ),
            };
          }),
        });
      }
      return product;
    });

    return {
      success: true,
      message: "New product added to store",
      product: result,
    };
  } catch (err: any) {
    console.error(err);

    return {
      success: false,
      message: "Failed to create new product",
    };
  }
};
