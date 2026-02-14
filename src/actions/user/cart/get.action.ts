"use server";
import { db } from "@/lib/db";
import { getCartId } from "./util";
import { Cart } from "@/types/cart";
import { BillingDetails, ShippingDetails } from "@/types/payment";

export const getCart = async (): Promise<Cart | null> => {
  const sessionId = await getCartId();

  const cart = await db.cart.findUnique({
    where: { sessionId },
    select: {
      shipping: true,
      billing: true,
      sessionId: true,
      status: true,
      paymentId: true,
      items: {
        select: {
          quantity: true,
          variant: {
            select: {
              sku: true,
              price: true,
              publicId: true,
              options: {
                select: {
                  value: { select: { displayName: true } },
                },
              },
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
    shipping: (cart.shipping as unknown as ShippingDetails) ?? undefined,
    billing: (cart.billing as unknown as BillingDetails) ?? undefined,
    sessionId: cart.sessionId,
    paymentId: cart.paymentId ?? undefined,
    status: cart.status,
    items:
      cart.items?.map(({ variant, quantity }) => {
        const { product, options, ...details } = variant;
        const { summary, ...productDetails } = product;
        return {
          variant: {
            options: options.map((ele) => ele.value.displayName),
            ...details,
          },
          product: { summary: summary ?? "", ...productDetails },
          quantity,
        };
      }) ?? [],
  };
};
