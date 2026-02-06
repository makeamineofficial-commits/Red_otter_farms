"use server";
import { db } from "@/lib/db";
import { Prisma } from "../../../../generated/prisma/browser";
import { validateAdmin } from "../../auth/admin.action";
import { ProductPropsBase } from "@/types/product";
import { syncOptions } from "./syncOption";
export interface UpdateProductProps extends ProductPropsBase {
  publicId: string;
  slug: string;
  categories: string[];
  options: {
    displayName: string;
    slug: string;
    values: { displayName: string; slug: string; isDefault: boolean }[];
  }[];
}
export const updateProduct = async (product: UpdateProductProps) => {
  await validateAdmin();
  const { slug, publicId } = product;
  try {
    const check = await db.product.findFirst({
      where: {
        AND: [{ publicId }],
      },
    });

    if (!check)
      return {
        success: false,
        message: "Product details not found",
      };

    const exist = await db.product.findFirst({
      where: {
        OR: [{ slug }],
      },
    });

    if (exist && exist.id !== check.id)
      return {
        success: false,
        message: "slug already in use",
      };
    const updatedProduct = await db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const {
          publicId,
          assets,
          maxPrice,
          minPrice,
          options: _options,
          categories: _categories,
          ...rest
        } = product;
        const updatedProduct = await tx.product.update({
          data: { maxPrice: maxPrice * 100, minPrice: minPrice * 100, ...rest },
          where: { id: check.id },
        });

        const categories = await tx.category.findMany({
          where: {
            publicId: {
              in: _categories,
            },
          },
        });

        await tx.categoryProduct.deleteMany({
          where: {
            productId: check.id,
          },
        });
        await tx.categoryProduct.createMany({
          data: categories.map((ele) => {
            return { categoryId: ele.id, productId: updatedProduct.id };
          }),
        });
        await tx.productAsset.deleteMany({
          where: {
            productId: check.id,
          },
        });
        await tx.productAsset.createMany({
          data: assets.map((ele) => {
            return {
              productId: updatedProduct.id,
              ...ele,
            };
          }),
        });
        await syncOptions(tx, updatedProduct.id, _options);
        return updatedProduct;
      },
    );

    return {
      success: true,
      message: "Product updated",
      product: updatedProduct,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message ?? "Failed to update product",
    };
  }
};
