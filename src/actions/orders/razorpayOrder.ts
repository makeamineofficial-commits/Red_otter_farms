"use server";

import { CartExtended } from "@/types/cart";
import {
  finalizeOrder,
  saveOrderToFile,
  sendDryStoreOrder,
  sendNormalOrder,
} from "./utils";
import {
  buildNormalItems,
  buildDrystoreAddress,
  buildDrystoreItems,
  mapRazorpayStatus,
  buildNormalAddress,
} from "./helper";

import { razorpay } from "@/lib/razorpay";

import { validateUser } from "../auth/user.action";
import { db } from "@/lib/db";

export async function createNormalRazorpayOrder(
  cart: CartExtended & { customerId: string | null },
) {
  if (!cart.paymentId) throw new Error("Missing paymentId");
  const user = await validateUser();

  const paymentInstance = await db.payment.findUnique({
    where: { publicId: cart.paymentId },
  });
  if (!paymentInstance) {
    throw new Error("Payment not found");
  }

  const payment = await razorpay.payments.fetch(
    paymentInstance.razorpayPaymentId as string,
  );

  const finalStatus = mapRazorpayStatus(payment.status);

  const total = Number(payment.amount) / 100;

  const order = {
    id: cart.sessionId,

    order_date: new Date().toISOString().slice(0, 10),

    customer_id: cart.customerId,

    mobile: cart.shipping.phone.startsWith("+91")
      ? cart.shipping.phone
      : "+91" + cart.shipping.phone,

    payment_status: finalStatus === "VERIFIED" ? "PAID" : "FAILED",

    billing_address: buildNormalAddress(cart.billing),

    shipping_address: buildNormalAddress(cart.shipping),

    order_items: {
      items: buildNormalItems(cart),
    },

    payment_object: {
      cart_value: total,
      otterwallet: 0,

      rof_campaign: {
        coupon: "",
      },

      split_payment: total,

      delivery_charge: 0,
      discount_amount: 0,

      customer_payment: {
        useRazorpay: true,
        useOtterWallet: false,

        total_payment_due: total,

        razorpay_payment_amount: total,
        otterwallet_payment_amount: 0,
      },

      total_order_value: total,
    },

    razorpay_payment: {
      amount: Number(payment.amount) / 100,

      date: new Date().toISOString().slice(0, 10),

      reference_number: payment.id,

      bank_charges: payment.fee ? Number(payment.fee) / 100 : 0,

      description: {
        "RazorPay Reference ID": payment.id,
        "RazorPay Payment Method": payment.method,
        "RazorPay Customer Phone ": payment.contact,
      },

      account_id: user?.customerId,
    },

    source: "Website - NCR",

    place_of_supply: cart.shipping.state,
  };
  await sendNormalOrder(order);
  await finalizeOrder(cart.id, cart.userIdentifier!, finalStatus);
  await saveOrderToFile(`order_${cart.sessionId}`, order);
  return order;
}

export async function createDrystoreRazorpayOrder(cart: CartExtended) {
  if (!cart.paymentId) throw new Error("Missing paymentId");
  const orderDetails = await db.cart.findUnique({
    where: { sessionId: cart.sessionId },
    include: { order: true },
  });
  const paymentInstance = await db.payment.findUnique({
    where: { publicId: cart.paymentId },
  });
  if (!paymentInstance) {
    throw new Error("Payment not found");
  }
  const payment = await razorpay.payments.fetch(
    paymentInstance.razorpayPaymentId as string,
  );

  const finalStatus = mapRazorpayStatus(payment.status);

  const total = Number(payment.amount) / 100;

  const order = {
    id: orderDetails?.publicId || cart.sessionId,
    number: cart.sessionId,

    status: "pending_payment",

    currency: "INR",

    date_created_utc: new Date().toISOString(),

    total: total.toFixed(2),

    payment_method: "razorpay",

    razorpay_order_id: payment.order_id,

    transaction_id: payment.id,

    billing: buildDrystoreAddress(cart.billing),

    shipping: buildDrystoreAddress(cart.shipping),

    line_items: buildDrystoreItems(cart),
  };
  await sendDryStoreOrder(order);
  await finalizeOrder(cart.id, cart.userIdentifier!, finalStatus);
  await saveOrderToFile(`order_${cart.sessionId}`, order);
  return order;
}
