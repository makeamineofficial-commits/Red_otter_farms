"use server";

import { isNCRPincode } from "@/lib/utils";

import { createRazorpayOrder } from "./razorpayOrder";
import { createWalletOrder } from "./walletOrder";
import { createSplitOrder } from "./splitOrder.action";

import {
  BillingDetails,
  PaymentMethod,
  ShippingDetails,
} from "@/types/payment";
import { getCartById } from "../user/cart/get.action";
import { getOrder } from "./utils";
import { Order } from "@/types/order";
export const handleOrder = async ({
  cartSessionId,
  paymentMethod,
}: {
  cartSessionId: string;
  paymentMethod: PaymentMethod;
}) => {
  const cart = await getCartById({ sessionId: cartSessionId });
  if (!cart) {
    throw new Error("Cart not found");
  }
  const { order } = await getOrder({ orderId: cart.orderId!! });
  if (!order) {
    throw new Error("Order not found");
  }

  const revisedOrder: Order = {
    id: order.publicId,
    userIdentifier: order.userIdentifier,
    shipping: (order.shipping as unknown as ShippingDetails) ?? undefined,
    billing: (order.billing as unknown as BillingDetails) ?? undefined,
    sessionId: cart.sessionId,
    paymentId: order.paymentId ?? undefined,
    status: order.status,
    subTotal: order.subTotal / 100,
    netTotal: order.netTotal / 100,
    discount: order.discount / 100,
    total: order.total / 100,
    shippingFee: order.shippingFee / 100,
    items:
      cart.items?.map(({ variant, product, quantity }) => {
        return {
          variant,
          product,
          quantity,
        };
      }) ?? [],
  };

  const ncr = isNCRPincode(revisedOrder.shipping.zip);
  if (paymentMethod === PaymentMethod.RAZORPAY) {
    await createRazorpayOrder({
      orderDetails: revisedOrder,
      ncr,
    });
  } else if (paymentMethod === PaymentMethod.OTTER) {
    await createWalletOrder({
      orderDetails: revisedOrder,
      ncr,
    });
  } else {
    await createSplitOrder({
      orderDetails: revisedOrder,
      ncr,
    });

    return { orderId: order.publicId };
  }
};
