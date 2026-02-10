"use server";
import { ShippingAddress } from "@/types/account";
import { BillingDetails } from "@/types/payment";
import {
  createPayment,
  getPaymentById,
  updatePaymentStatus,
} from "./payment.action";
import { getCart } from "../user/cart/get.action";
import { CartStatus, PaymentPurpose, PaymentStatus } from "@/lib/db";
import {
  syncAddress,
  updateCartPayment,
  updateCartStatus,
} from "../user/cart/update.action";
import { getCartTotal } from "../user/cart/util";
import { getShippingRate } from "./shipping.action";
import { PaymentMethod } from "@/types/payment";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { validateUser } from "../auth/user.action";
import { handleOrder } from "../orders/order.action";

export async function getCheckout({
  paymentMethod,
  shipping,
  billing,
}: {
  paymentMethod: PaymentMethod;
  shipping: ShippingAddress;
  billing: BillingDetails;
}): Promise<{
  success: boolean;
  message: any;
  orderId?: string;
  paymentMethod: PaymentMethod;
}> {
  const cart = await getCart();

  if (!cart) {
    throw new Error("Cart not found");
  }

  await syncAddress({ shipping, billing });
  try {
    if (paymentMethod === PaymentMethod.RAZORPAY) {
      const res = await getRazorpayCheckout({
        shipping,
        billing,
      });

      return {
        paymentMethod,
        ...res,
      };
    } else {
      await handleOrder({
        cartSessionId: cart?.sessionId,
        paymentMethod: PaymentMethod.OTTER,
      });

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

export async function getRazorpayCheckout({
  shipping,
  billing,
}: {
  shipping: ShippingAddress;
  billing: BillingDetails;
}): Promise<{
  success: boolean;
  message: any;
  orderId?: string;
}> {
  try {
    const cart = await getCart();

    if (!cart) {
      return { success: false, message: "No cart found" };
    }

    const user = await validateUser();

    const subtotal = await getCartTotal(cart);
    const shippingRate = await getShippingRate({
      deliveryPincode: shipping.zip,
    });
    const total = subtotal + shippingRate.rate;

    if (!cart.paymentId) {
      const payment = await createPayment({
        amount: total,
        purpose: PaymentPurpose.ORDER,
        referenceId: cart.sessionId,
        customerId: user && user.customerId ? user.customerId : null,
      });

      if (!payment.success || !payment.paymentId || !payment.orderId) {
        return {
          success: false,
          message: payment.message ?? "Failed to create payment",
        };
      }
      await updateCartPayment({
        paymentId: payment.paymentId,
      });
      return {
        success: true,
        orderId: payment.orderId,
        message: "Payment created for cart",
      };
    }

    const payment = await getPaymentById({
      id: cart.paymentId,
    });

    if (
      payment &&
      [
        PaymentStatus.IN_PROGRESS,
        PaymentStatus.PROCESSING,
        // @ts-ignore
      ].includes(payment.status)
    ) {
      return {
        success: false,
        message: "Ongoing payment for this checkout",
      };
    }
    const shouldRecreate =
      !payment || payment.amount !== total || !payment.razorpayOrderId;

    if (shouldRecreate) {
      const newPayment = await createPayment({
        amount: total,
        purpose: PaymentPurpose.ORDER,
        referenceId: cart.sessionId,
        customerId: user && user.customerId ? user.customerId : null,
      });

      if (!newPayment.success || !newPayment.paymentId || !newPayment.orderId) {
        return {
          success: false,
          message: "Failed to create payment",
        };
      }
      await updateCartPayment({
        paymentId: newPayment.paymentId,
      });

      return {
        success: true,
        orderId: newPayment.orderId,
        message: "Payment created for cart",
      };
    }

    return {
      success: true,
      orderId:
        payment.razorpayOrderId === null ? undefined : payment.razorpayOrderId,
      message: "Continuing existing payment",
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message ?? "Failed to checkout",
    };
  }
}

export async function afterCheckout() {
  try {
    const cart = await getCart();
    if (!cart || !cart.paymentId) return;

    await updateCartStatus({
      sessionId: cart.sessionId,
      status: CartStatus.CHECKEDOUT,
    });
    const payment = await getPaymentById({ id: cart.paymentId });
    if (!payment) return;
    await updatePaymentStatus({
      paymentId: cart.paymentId,
      status: PaymentStatus.IN_PROGRESS,
    });

    const cartId = await db.cart.findUnique({
      where: {
        sessionId: cart.sessionId,
      },
      select: {
        id: true,
      },
    });
    const user = await validateUser();

    if (cartId && user && user.phone) {
      const order = await db.order.create({
        data: {
          cartId: cartId.id,
          userIdentifier: user.phone,
        },
      });

      await db.cart.update({
        where: { id: cartId.id },
        data: {
          order: {
            connect: { id: order.id },
          },
        },
      });
    }
    const cookieStore = await cookies();
    cookieStore.delete("cart");
    return;
  } catch (err) {}
}
