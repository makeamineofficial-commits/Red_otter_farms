"use server";

import { db } from "@/lib/db";

export async function getOrder({ orderId }: { orderId: string }) {
  try {
    const order = await db.order.findUnique({
      where: {
        publicId: orderId,
      },
      select: {
        shipping: true,
        billing: true,
        total: true,
        subTotal: true,
        netTotal: true,
        shippingFee: true,
        discount: true,
        cart: {
          include: {
            items: {
              select: {
                quantity: true,
                variant: {
                  select: {
                    price: true,
                    product: {
                      select: {
                        assets: { select: { url: true, thumbnail: true } },
                        displayName: true,
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
    if (!order)
      return {
        success: false,
        message: "Order details not found",
        order: null,
      };

    const { cart, ...rest } = order;

    return {
      success: true,
      message: "Order details found",
      order: {
        ...rest,
        products: cart.items.map((ele) => {
          const { variant, quantity } = ele;
          const { price, product } = variant;
          return {
            ...product,
            price,
            quantity,
          };
        }),
      },
    };
  } catch (err) {
    return {
      success: false,
      message: "Order details not found",
      order: null,
    };
  }
}
