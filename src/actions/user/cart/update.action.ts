"use server";
import { db } from "@/lib/db";
import { getCartId } from "./util";

export const updateCart = async ({
  variantId,
  quantity,
}: {
  variantId: string;
  quantity: number;
}): Promise<{ success: boolean }> => {
  const sessionId = await getCartId();
  const variant = await db.variant.findUnique({
    where: { publicId: variantId },
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

  if (!cart || !variant) return { success: false };
  const exist = await db.cartItem.findUnique({
    where: {
      cartId_variantId: {
        cartId: cart.id,
        variantId: variant.id,
      },
    },
  });

  if (exist) {
    if (quantity === 0) {
      await db.cartItem.delete({
        where: {
          cartId_variantId: {
            cartId: cart.id,
            variantId: variant.id,
          },
        },
      });
    } else {
      await db.cartItem.update({
        where: {
          cartId_variantId: {
            cartId: cart.id,
            variantId: variant.id,
          },
        },
        data: {
          quantity,
        },
      });
    }
  } else if (quantity > 0) {
    await db.cartItem.create({
      data: {
        cartId: cart.id,
        variantId: variant.id,
        quantity,
      },
    });
  }
  return {
    success: true,
  };
};
