"use server";

import { BillingDetails, ShippingDetails } from "@/types/payment";
import { getCart } from "../user/cart/get.action";
import { CartStatus, db, OrderStatus, PaymentStatus } from "@/lib/db";
import { syncOrder, updateCartStatus } from "../user/cart/update.action";

import { PaymentMethod } from "@/types/payment";
import { cookies } from "next/headers";
import { createAccount } from "../auth/user.action";
import { handleOrder } from "../orders/order.action";

import { getOrder } from "../orders/utils";
import { getAccount } from "../user/account/get.action";
import { getRazorpayCheckout } from "./razorpay.action";

export async function getCheckout({
  paymentMethod,
  shipping,
  billing,
}: {
  paymentMethod: PaymentMethod;
  shipping: ShippingDetails;
  billing: BillingDetails;
}): Promise<{
  success: boolean;
  message: any;
  razorPayOrderId?: string;
  paymentMethod: PaymentMethod;
}> {
  const cart = await getCart();
  if (!cart) {
    throw new Error("Cart not found");
  }
  const { total, success, orderId } = await syncOrder({
    cart,
    shipping,
    billing,
    paymentMethod,
  });

  if (!success || !total || !orderId)
    return {
      success: false,
      message: "Failed to sync cart and order",
      paymentMethod,
    };

  if (billing.createAccount && process.env.NODE_ENV === "production") {
    await createAccount(billing);
  }

  try {
    if (paymentMethod === PaymentMethod.RAZORPAY) {
      const res = await getRazorpayCheckout({
        amount: total,
        isPartial: false,
        orderId,
      });
      console.log("here");
      return {
        paymentMethod,
        ...res,
      };
    } else {
      const user = await getAccount();

      if (
        user &&
        user.account &&
        Number(user.account.otter_wallet || "0") * 100 < total
      ) {
        const res = await getRazorpayCheckout({
          orderId,
          amount: total - Number(user.account.otter_wallet || "0") * 100,
          isPartial: true,
        });
        return {
          paymentMethod: PaymentMethod.SPLIT,
          ...res,
        };
      } else {
        await handleOrder({
          cartSessionId: cart?.sessionId,
          paymentMethod: PaymentMethod.OTTER,
          customerId: user.account?.customer_id,
        });
      }
      console.log("Selected Payment Method", paymentMethod);
      return {
        paymentMethod,
        success: true,
        message: "Order created via red otter wallet",
      };
    }
  } catch (err: any) {
    console.log(err.message);
    return {
      paymentMethod,
      success: false,
      message: "Failed to create Order",
    };
  }
}
export async function afterCheckout() {
  try {
    const cart = await getCart();

    if (!cart?.orderId) return null;

    const { order } = await getOrder({
      orderId: cart.orderId,
    });
    if (!order) throw new Error("Order not found");

    if (cart.status === CartStatus.CHECKEDOUT) {
      return { orderId: order.publicId };
    }

    await db.$transaction(async (tx) => {
      await tx.cart.update({
        where: { sessionId: cart.sessionId },
        data: { status: CartStatus.CHECKEDOUT },
      });

      if (order.paymentId) {
        const payment = await tx.payment.findUnique({
          where: { publicId: order.paymentId },
        });
        if (payment) {
          await tx.payment.update({
            where: { id: payment.id },
            data: { status: PaymentStatus.IN_PROGRESS },
          });
        }
      }
      await tx.order.update({
        where: { id: order.id },
        data: { status: OrderStatus.PROCESSING },
      });
    });

    const cookieStore = await cookies();
    cookieStore.delete("cart");

    return { orderId: order.publicId };
  } catch (err) {
    console.error("afterCheckout error:", err);
    return null;
  }
}
