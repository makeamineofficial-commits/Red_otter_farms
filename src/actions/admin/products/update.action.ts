"use server";
import { db } from "@/lib/db";
import { Prisma } from "../../../../generated/prisma/browser";
import { validateAdmin } from "../../auth/admin.action";
import { ProductProps } from "@/types/product";
export interface UpdateProductProps extends ProductProps {
  publicId: string;
}
export const updateProduct = async (product: UpdateProductProps) => {
  await validateAdmin();
  const { sku, publicId } = product;
  try {
    const check = await db.product.findFirst({
      where: {
        AND: [{ sku }, { publicId }],
      },
    });

    if (!check)
      return {
        success: false,
        message: "Product details not found",
      };
    const updatedProduct = await db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const {
          sku,

          publicId,
          assets,
          collections: col,
          ...rest
        } = product;
        const updatedProduct = await tx.product.update({
          data: { ...rest },
          where: { id: check.id },
        });

        const collections = await tx.collection.findMany({
          where: {
            publicId: {
              in: col,
            },
          },
        });

        await tx.collectionProduct.deleteMany({
          where: {
            productId: check.id,
          },
        });
        await tx.collectionProduct.createMany({
          data: collections.map((ele) => {
            return { collectionId: ele.id, productId: updatedProduct.id };
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
      }
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
