"use server";

import { db, OrderStatus } from "@/lib/db";
import { isNCRPincode } from "@/lib/utils";

import {
  createNormalRazorpayOrder,
  createDrystoreRazorpayOrder,
} from "./razorpayOrder";
import {
  createNormalWalletOrder,
  createDrystoreWalletOrder,
} from "./walletOrder";

import {
  BillingDetails,
  PaymentMethod,
  ShippingDetails,
} from "@/types/payment";
export const handleOrder = async ({
  cartSessionId,
  paymentMethod,
  customerId,
}: {
  cartSessionId: string;
  paymentMethod: PaymentMethod;
  customerId?: string;
}) => {
  const cart = await db.$transaction(async (tx) => {
    const cart = await tx.cart.findUnique({
      where: {
        sessionId: cartSessionId,
      },
      include: {
        items: {
          select: {
            quantity: true,
            variant: {
              select: {
                sku: true,
                price: true,
                publicId: true,
                options: {
                  select: { value: { select: { displayName: true } } },
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

    if (cart) {
      const existingOrder = await tx.order.findUnique({
        where: { cartId: cart.id },
      });

      if (!existingOrder) {
        await tx.order.create({
          data: {
            cartId: cart.id,
            userIdentifier: cart.userIdentifier!,
            status: OrderStatus.PROCESSING,
          },
        });
      } else {
        await tx.order.update({
          where: { cartId: cart.id },
          data: { status: OrderStatus.PROCESSING },
        });
      }
    }
    return cart;
  });

  if (!cart || !cart.shipping) {
    console.log(cart);
    console.error("here -> Cart not found");
    throw new Error("Cart not found");
  }

  const revisedCart = {
    id: cart.id,
    userIdentifier: cart.userIdentifier,
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

  // @ts-ignore
  if (isNCRPincode(cart.shipping.zip)) {
    paymentMethod === PaymentMethod.RAZORPAY
      ? await createNormalRazorpayOrder({
          ...revisedCart,
          customerId: customerId ?? null,
        })
      : await createNormalWalletOrder(revisedCart);
  } else {
    paymentMethod === PaymentMethod.RAZORPAY
      ? await createDrystoreRazorpayOrder(revisedCart)
      : await createDrystoreWalletOrder(revisedCart);
  }
};
