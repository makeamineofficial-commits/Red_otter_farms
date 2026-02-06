"use server";
import { db } from "@/lib/db";
import { Product } from "@/types/product";
import { nullToUndefined } from "@/lib/utils";
import { validateAdmin } from "@/actions/auth/admin.action";

export const getProduct = async ({
  publicId,
}: {
  publicId: string;
}): Promise<{ product?: Product; success: boolean; message: string }> => {
  await validateAdmin();
  const product = await db.product.findUnique({
    where: {
      publicId,
    },
    include: {
      categories: {
        include: {
          category: {
            select: {
              name: true,
              slug: true,
              publicId: true,
            },
          },
        },
      },
      assets: true,
      options: {
        include: {
          values: true,
        },
      },
    },
  });
  if (!product) return { success: true, message: "Product details found" };
  const data: Product = nullToUndefined({
    ...product,
    summary: product.summary ?? "",
    description: product.description ?? "",
    categories: product.categories.map((c) => c.category),
    presentInWishlist: false,
    nutritionalInfo: product.nutritionalInfo as Record<string, number>,
    options: product.options.map((ele) => {
      return {
        displayName: ele.displayName,
        slug: ele.slug,
        values: ele.values.map((ele) => {
          return {
            displayName: ele.displayName,
            slug: ele.slug,
            isDefault: ele.isDefault,
          };
        }),
      };
    }),
  });

  return {
    product: data,
    success: true,
    message: "Product details found",
  };
};
