"use server";

import { BillingDetails, ShippingDetails } from "@/types/payment";
import { getCart } from "../user/cart/get.action";
import { CartStatus, db, OrderStatus, PaymentStatus } from "@/lib/db";
import { syncOrder } from "../user/cart/update.action";
import { PaymentMethod } from "@/types/payment";
import { cookies } from "next/headers";
import { handleOrder } from "../orders/order.action";
import { getOrder } from "../orders/utils";
import { getAccount } from "../user/account/get.action";
import { getRazorpayCheckout } from "./razorpay.action";
import { isNCRPincode } from "@/lib/utils";

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
  orderId?: string;
  razorPayOrderId?: string;
  paymentMethod: PaymentMethod;
}> {
  const cart = await getCart();
  if (!cart) {
    throw new Error("Cart not found");
  }

  const isNCR = isNCRPincode(shipping.zip);
  const hasNonDryStoreItem = cart.items.some(
    (item) => !item.product.isDrystore,
  );

  if (!isNCR && hasNonDryStoreItem) {
    return {
      success: false,
      message:
        "One or more products are not available in the requested quantity. Please reduce the quantity to proceed.",
      paymentMethod,
    };
  }
  const quantityConflict = cart.items.reduce(
    (prev, cur) => prev || cur.quantity > cur.variant.availableInStock,
    false,
  );

  if (quantityConflict) {
    return {
      success: false,
      message:
        "One or more products are not available in the requested quantity. Please reduce the quantity to proceed.",
      paymentMethod,
    };
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
  const cookieStore = await cookies();
  cookieStore.set("checkout_cart_id", cart.sessionId as string);
  cookieStore.set("checkout_order_id", orderId as string);

  try {
    if (paymentMethod === PaymentMethod.RAZORPAY) {
      const res = await getRazorpayCheckout({
        amount: total,
        isPartial: false,
        orderId,
      });

      return {
        orderId,
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
          orderId,
          ...res,
        };
      } else {
        await handleOrder({
          cartSessionId: cart?.sessionId,
          paymentMethod: PaymentMethod.OTTER,
        });
      }

      return {
        orderId,
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
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("checkout_cart_id")?.value;
    const orderId = cookieStore.get("checkout_order_id")?.value;

    if (!sessionId || !orderId) throw new Error("CartID or OrderID not found");

    const { order } = await getOrder({
      orderId,
    });

    if (!order) {
      console.error("❌ Order not found for:", orderId);
      throw new Error("Order not found");
    }

    console.log("✅ Order found:", {
      id: order.id,
      publicId: order.publicId,
      status: order.status,
      paymentId: order.paymentId,
    });

    console.log("🔄 Starting DB transaction...");

    await db.$transaction(async (tx) => {
      console.log("✏️ Updating cart status...");

      const exist = await tx.cart.findUnique({
        where: {
          sessionId: sessionId,
          status: {
            notIn: [CartStatus.CONVERTED],
          },
        },
      });
      if (exist) {
        await tx.cart.update({
          where: {
            sessionId: sessionId,
            status: {
              notIn: [CartStatus.CONVERTED],
            },
          },
          data: { status: CartStatus.CHECKEDOUT },
        });
      }

      if (order.paymentId) {
        console.log("💳 Fetching payment:", order.paymentId);

        const payment = await tx.payment.findUnique({
          where: { publicId: order.paymentId },
        });

        if (!payment) {
          console.warn("⚠️ Payment not found");
        } else {
          console.log("✏️ Updating payment status...");

          await tx.payment.update({
            where: { id: payment.id },
            data: { status: PaymentStatus.IN_PROGRESS },
          });

          console.log("✅ Payment updated");
        }
      } else {
        console.log("ℹ️ No paymentId on order");
      }

      console.log("✏️ Updating order status...");

      await tx.order.update({
        where: { id: order.id },
        data: { status: OrderStatus.PROCESSING },
      });

      console.log("✅ Order updated");
    });

    console.log("🧹 Clearing cart cookie");

    cookieStore.delete("cart");
    cookieStore.delete("checkout_cart_id");
    cookieStore.delete("checkout_order_id");
    console.log("🎉 Checkout completed for:", orderId);

    return { orderId: orderId };
  } catch (err) {
    console.error("🔥 afterCheckout error:", err);

    return null;
  }
}
