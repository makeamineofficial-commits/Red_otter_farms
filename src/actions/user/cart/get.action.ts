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
      items: {
        select: {
          quantity: true,
          variant: {
            select: {
              sku: true,
              price: true,
              publicId: true,
              product: {
                select: {
                  summary: true,
                  displayName: true,
                  nutritionalInfo: true,
                  slug: true,
                  assets: {
                    where: {
                      isPrimary: true,
                    },
                    take: 1,
                    select: {
                      url: true,
                      thumbnail: true,
                      type: true,
                      position: true,
                      isPrimary: true,
                    },
                  },
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
    items:
      cart.items?.map(({ variant, quantity }) => {
        const { product, ...details } = variant;
        const { summary, ...productDetails } = product;
        return {
          variant: details,
          product: { summary: summary ?? "", ...productDetails },
          quantity,
        };
      }) ?? [],
  };
};
