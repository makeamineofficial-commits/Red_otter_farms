"use server";
import { db } from "@/lib/db";
import { getCartId } from "./util";
import { Cart } from "@/types/cart";

export const getCart = async (): Promise<Cart | null> => {
  const sessionId = await getCartId();

  const cart = await db.cart.findUnique({
    where: { sessionId },
    select: {
      sessionId: true,
      status: true,
      products: {
        select: {
          quantity: true,
          product: {
            select: {
              publicId: true,
              slug: true,
              price: true,
              displayName: true,
              description: true,
              nutritionalInfo: true,
              weight: true,
              weightUnit: true,
              assets: {
                select: {
                  url: true,
                  type: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!cart) return null;

  return {
    sessionId: cart.sessionId,
    status: cart.status,
    products:
      cart.products?.map(({ product, quantity }) => ({
        ...product,

        assets: product.assets as any,
        quantity,
      })) ?? [],
  };
};
