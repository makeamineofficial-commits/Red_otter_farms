"use server";
import { CartStatus, db } from "@/lib/db";
import { getCartId, getCartTotal } from "./util";
import {
  BillingDetails,
  PaymentMethod,
  ShippingDetails,
} from "@/types/payment";
import { getShippingRate } from "@/actions/checkout/shipping.action";
import { Cart } from "@/types/cart";

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

export const syncOrder = async ({
  shipping,
  billing,
  paymentMethod,
  cart,
}: {
  cart: Cart;
  shipping: ShippingDetails;
  billing: BillingDetails;
  paymentMethod: PaymentMethod;
}): Promise<{
  success: boolean;
  subTotal?: number;
  total?: number;
  shippingRate?: number;
  orderId?: string;
}> => {
  try {
    return await db.$transaction(async (tx) => {
      const cartRecord = await tx.cart.findUnique({
        where: { sessionId: cart.sessionId },
        include: { order: true },
      });
      
      if (!cartRecord) {
        throw new Error("Cart not found");
      }

      const { netTotal, discount, subTotal } = await getCartTotal(cart);
      const shippingRate = await getShippingRate({
        deliveryPincode: shipping.zip,
      });

      const shippingFee = shippingRate.rate;
      const total = netTotal + shippingFee;

      let order;

      if (cartRecord.order) {
        order = await tx.order.update({
          where: {
            id: cartRecord.order.id,
          },
          data: {
            userIdentifier: billing.phone,
            shipping: shipping as any,
            billing: billing as any,
            subTotal,
            discount,
            netTotal,
            shippingFee,
            total,
            paymentMethod,
          },
        });
      } else {
        order = await tx.order.create({
          data: {
            cartId: cartRecord.id,
            userIdentifier: billing.phone,
            shipping: shipping as any,
            billing: billing as any,
            subTotal,
            discount,
            netTotal,
            shippingFee,
            total,
            paymentMethod,
          },
        });
        await tx.cart.update({
          where: { id: cartRecord.id },
          data: {
            order: {
              connect: { id: order.id },
            },
          },
        });
      }
      return {
        success: true,
        subTotal,
        discount,
        netTotal,
        shippingFee,
        total,
        shippingRate: shippingFee,
        orderId: order.publicId,
      };
    });
  } catch (err) {
    console.error("syncOrder failed:", err);

    return { success: false };
  }
};

export const updateCartStatus = async ({
  sessionId,
  status,
}: {
  sessionId: string;
  status: CartStatus;
}): Promise<{ success: boolean }> => {
  const cart = await db.cart.findUnique({
    where: { sessionId },
  });

  if (!cart || cart.status === "CONVERTED") return { success: false };

  await db.cart.update({
    where: { sessionId },
    data: {
      status,
    },
  });

  return {
    success: true,
  };
};
