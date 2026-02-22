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
        surveySubmitted: false,
        success: false,
        message: "Order details not found",
        order: null,
      };

    const { cart, ...rest } = order;

    let surveySubmitted = false;
    try {
      surveySubmitted =
        (await db.survey.findFirst({
          where: {
            OR: [
              {
                // @ts-ignore
                phone: order.shipping?.phone,
              },
              {
                // @ts-ignore
                email: order.shipping?.email,
              },
            ],
          },
        })) != null;
    } catch (err) {}
    return {
      success: true,
      message: "Order details found",
      surveySubmitted,
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
      surveySubmitted: false,
      success: false,
      message: "Order details not found",
      order: null,
    };
  }
}
