"use server";
import { CartStatus, db } from "@/lib/db";
import { getCartId } from "./util";
import { BillingDetails, ShippingDetails } from "@/types/payment";

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

export const syncAddress = async ({
  shipping,
  billing,
}: {
  shipping: ShippingDetails;
  billing: BillingDetails;
}): Promise<{ success: boolean }> => {
  const sessionId = await getCartId();
  const cart = await db.cart.findUnique({
    where: { sessionId },
    select: {
      id: true,
    },
  });

  if (!cart) return { success: false };

  await db.cart.update({
    where: { sessionId },
    data: {
      shipping: shipping as any,
      billing: billing as any,
    },
  });

  return {
    success: true,
  };
};

export const updateCartPayment = async ({
  paymentId,
}: {
  paymentId: string;
}): Promise<{ success: boolean }> => {
  const sessionId = await getCartId();
  const cart = await db.cart.findUnique({
    where: { sessionId },
    select: {
      id: true,
    },
  });

  if (!cart) return { success: false };

  await db.cart.update({
    where: { sessionId },
    data: {
      paymentId,
    },
  });

  return {
    success: true,
  };
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

  if (!cart || cart.status==="CONVERTED") return { success: false };

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
