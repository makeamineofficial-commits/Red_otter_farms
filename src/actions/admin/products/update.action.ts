"use server";
import { db } from "@/lib/db";
import { Prisma } from "../../../../generated/prisma/browser";
import { validateAdmin } from "../../auth/admin.action";
import { ProductProps } from "@/types/product";
export interface UpdateProductProps extends ProductProps {
  publicId: string;
  slug: string;
}
export const updateProduct = async (product: UpdateProductProps) => {
  await validateAdmin();
  const { sku, slug, publicId } = product;
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
        OR: [{ sku }, { slug }],
      },
    });

    if (exist && exist.id !== check.id)
      return {
        success: false,
        message: "sku or slug already in use",
      };
    const updatedProduct = await db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const {
          sku,
          publicId,
          price,
          mrp,
          assets,
          categories: col,
          ...rest
        } = product;
        const updatedProduct = await tx.product.update({
          data: { price: price * 100, mrp: mrp * 100, ...rest },
          where: { id: check.id },
        });

        const categorys = await tx.category.findMany({
          where: {
            publicId: {
              in: col,
            },
          },
        });

        await tx.categoryProduct.deleteMany({
          where: {
            productId: check.id,
          },
        });
        await tx.categoryProduct.createMany({
          data: categorys.map((ele) => {
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
        return updatedProduct;
      },
    );

    return {
      success: true,
      message: "Product updated",
      product: updatedProduct,
    };
  } catch (err) {
    return { success: false, message: "Failed to update product" };
  }
};
