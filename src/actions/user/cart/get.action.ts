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
      order: {
        select: {
          publicId: true,
        },
      },
      items: {
        select: {
          quantity: true,
          variant: {
            select: {
              sku: true,
              price: true,
              publicId: true,
              availableInStock: true,
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
                  isDryStore: true,
                  hasSubscription: true,
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
    orderId: cart.order?.publicId,
    items:
      cart.items?.map(({ variant, quantity }) => {
        const { product, options, ...details } = variant;
        const { summary, isDryStore, ...productDetails } = product;
        return {
          variant: {
            options: options.map((ele) => ele.value.displayName),
            ...details,
          },
          product: {
            summary: summary ?? "",
            isDrystore: isDryStore,
            ...productDetails,
          },
          quantity,
        };
      }) ?? [],
  };
};

export const getCartById = async ({
  sessionId,
}: {
  sessionId: string;
}): Promise<Cart | null> => {
  const cart = await db.cart.findUnique({
    where: { sessionId },
    select: {
      sessionId: true,
      status: true,
      order: {
        select: {
          publicId: true,
        },
      },
      items: {
        select: {
          quantity: true,
          variant: {
            select: {
              sku: true,
              price: true,
              publicId: true,
              availableInStock: true,
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
                  hasSubscription: true,
                  isDryStore: true,
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
    orderId: cart.order?.publicId,
    items:
      cart.items?.map(({ variant, quantity }) => {
        const { product, options, ...details } = variant;
        const { summary, isDryStore, ...productDetails } = product;
        return {
          variant: {
            options: options.map((ele) => ele.value.displayName),
            ...details,
          },
          product: {
            isDrystore: isDryStore,
            summary: summary ?? "",
            ...productDetails,
          },
          quantity,
        };
      }) ?? [],
  };
};
