"use server";

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
import {
  createDrystoreSplitOrder,
  createNormalSplitOrder,
} from "./splitOrder.action";
import { getCartById } from "../user/cart/get.action";
import { getOrder } from "./utils";
import { Order } from "@/types/order";
export const handleOrder = async ({
  cartSessionId,
  paymentMethod,
  customerId,
}: {
  cartSessionId: string;
  paymentMethod: PaymentMethod;
  customerId?: string;
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

  const normalOrder = isNCRPincode(revisedOrder.shipping.zip);
  if (paymentMethod === PaymentMethod.RAZORPAY) {
    // @ts-ignore
    if (normalOrder) {
      await createNormalRazorpayOrder({
        ...revisedOrder,
        customerId: customerId ?? null,
      });
    } else {
      await createDrystoreRazorpayOrder(revisedOrder);
    }
  } else if (paymentMethod === PaymentMethod.OTTER) {
    // @ts-ignore
    if (normalOrder) {
      await createNormalWalletOrder({
        ...revisedOrder,
        customerId: customerId ?? null,
      });
    } else {
      await createDrystoreWalletOrder(revisedOrder);
    }
  } else {
    // @ts-ignore
    if (normalOrder) {
      await createNormalSplitOrder({
        ...revisedOrder,
        customerId: customerId ?? null,
      });
    } else {
      await createDrystoreSplitOrder(revisedOrder);
    }

    return { orderId: order.publicId };
  }
};
