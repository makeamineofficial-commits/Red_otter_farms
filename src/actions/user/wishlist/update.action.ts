"use server";

import { validateUser } from "@/actions/auth/user.action";
import { db } from "@/lib/db";

export const updateWishlist = async ({ productId }: { productId: string }) => {
  try {
    const user = await validateUser();

    if (!user || !user.phone)
      return {
        success: false,
        authenticationRequired: true,
        message: "Login required to update wishlist",
      };
    const { phone } = user;
    const product = await db.product.findUnique({
      where: {
        publicId: productId,
      },
      select: {
        id: true,
      },
    });
    if (!product) return { success: false, message: "Product not found" };
    const check = await db.userWishlist.findUnique({
      where: {
        phone_productId: {
          productId: product.id,
          phone,
        },
      },
    });
    if (check) {
      await db.userWishlist.delete({
        where: {
          phone_productId: {
            phone,
            productId: product.id,
          },
        },
      });

      return { success: true, message: "Product removed from wishlist" };
    } else {
      await db.userWishlist.create({
        data: {
          phone,
          productId: product.id,
        },
      });

      return { success: true, message: "Product added to wishlist" };
    }
  } catch (err) {
    console.log(err);

    return { success: false, message: "Failed to mark product in wishlist" };
  }
};
