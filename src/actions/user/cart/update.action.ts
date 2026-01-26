"use server";
import { db } from "@/lib/db";
import { getCartId } from "./util";

export const updateCart = async ({
  productPublicId,
  quantity,
}: {
  productPublicId: string;
  quantity: number;
}): Promise<{ success: boolean }> => {
  const sessionId = await getCartId();
  const product = await db.product.findUnique({
    where: { publicId: productPublicId },
    select: {
      id: true,
    },
  });
  const cart = await db.cart.findUnique({
    where: { sessionId },
    select: {
      id: true,
    },
  });

  if (!cart || !product) return { success: false };
  const exist = await db.cartProduct.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId: product.id,
      },
    },
  });

  if (exist) {
    if (quantity === 0) {
      await db.cartProduct.delete({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId: product.id,
          },
        },
      });
    } else {
      await db.cartProduct.update({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId: product.id,
          },
        },
        data: {
          quantity,
        },
      });
    }
  } else if (quantity > 0) {
    await db.cartProduct.create({
      data: {
        cartId: cart.id,
        productId: product.id,
        quantity,
      },
    });
  }
  return {
    success: true,
  };
};
