"use server";
import { db } from "@/lib/db";
import { Prisma } from "../../../../generated/prisma/browser";
import { validateAdmin } from "../../auth/admin.action";
import { ProductProps } from "@/types/product";
import { generateSlug } from "@/lib/utils";
export const createProduct = async (product: ProductProps) => {
  await validateAdmin();
  const { sku } = product;
  try {
    const slug = generateSlug("product", product.name);

    const check = await db.product.findFirst({
      where: {
        OR: [{ sku }],
      },
    });

    if (check)
      return {
        success: false,
        message: "Product with this slug or sku already exist",
      };
    const newProduct = await db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const { assets, collections: col, ...rest } = product;
        const newProduct = await tx.product.create({ data: { slug, ...rest } });
        const collections = await tx.collection.findMany({
          where: {
            publicId: {
              in: col,
            },
          },
        });
        await tx.collectionProduct.createMany({
          data: collections.map((ele) => {
            return { collectionId: ele.id, productId: newProduct.id };
          }),
        });

        await tx.productAsset.createMany({
          data: assets.map((ele) => {
            return {
              productId: newProduct.id,
              ...ele,
            };
          }),
        });
        return newProduct;
      },
    );

    return {
      success: true,
      message: "New product added to store",
      product: newProduct,
    };
  } catch (err) {
    return { success: false, message: "Failed to create new product" };
  }
};
