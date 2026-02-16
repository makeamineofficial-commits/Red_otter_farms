"use server";
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
import { Order } from "@/types/order";

export async function createNormalSplitOrder(
  orderDetails: Order & { customerId: string | null },
) {
  if (!orderDetails.paymentId) throw new Error("Missing paymentId");
  const user = await validateUser();

  const paymentInstance = await db.payment.findUnique({
    where: { publicId: orderDetails.paymentId },
  });
  if (!paymentInstance) {
    throw new Error("Payment not found");
  }

  const payment = await razorpay.payments.fetch(
    paymentInstance.razorpayPaymentId as string,
  );

  const finalStatus = mapRazorpayStatus(payment.status);

  const paidViaRazorpay = Number(payment.amount) / 100;

  const order = {
    id: orderDetails.id,

    order_date: new Date().toISOString().slice(0, 10),

    customer_id: orderDetails.customerId,

    mobile: orderDetails.billing.phone.startsWith("+91")
      ? orderDetails.billing.phone
      : "+91" + orderDetails.billing.phone,

    payment_status: finalStatus === "VERIFIED" ? "PAID" : "FAILED",

    billing_address: buildNormalAddress(orderDetails.billing),

    shipping_address: buildNormalAddress(orderDetails.shipping),

    order_items: {
      items: buildNormalItems(orderDetails),
    },

    payment_object: {
      cart_value: orderDetails.subTotal,
      otterwallet: orderDetails.total - paidViaRazorpay,
      rof_campaign: {
        coupon: "",
      },
      split_payment: true,
      delivery_charge: orderDetails.shippingFee,
      discount_amount: orderDetails.discount,
      customer_payment: {
        useRazorpay: true,
        useOtterWallet: true,
        total_payment_due: orderDetails.total,
        razorpay_payment_amount: paidViaRazorpay,
        otterwallet_payment_amount: orderDetails.total - paidViaRazorpay,
      },
      total_order_value: orderDetails.total,
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

    place_of_supply: orderDetails.shipping.state,
  };
  if (finalStatus === "VERIFIED")
    console.log("[SPLIT NORMAL] Order sent", orderDetails.sessionId);
  if (process.env.NODE_ENV === "production" && finalStatus === "VERIFIED")
    await sendNormalOrder(order);
  await finalizeOrder(orderDetails.sessionId, finalStatus);
  await saveOrderToFile(
    `order_${orderDetails.sessionId}_split_razorpay`,
    order,
  );
  return order;
}

export async function createDrystoreSplitOrder(orderDetails: Order) {
  if (!orderDetails.paymentId) throw new Error("Missing paymentId");

  const paymentInstance = await db.payment.findUnique({
    where: { publicId: orderDetails.paymentId },
  });
  if (!paymentInstance) {
    throw new Error("Payment not found");
  }
  const payment = await razorpay.payments.fetch(
    paymentInstance.razorpayPaymentId as string,
  );

  const finalStatus = mapRazorpayStatus(payment.status);

  const order = {
    id: orderDetails.id,
    number: orderDetails.sessionId,
    status: finalStatus === "VERIFIED" ? "PAID" : "FAILED",
    currency: "INR",
    version: "9.9.5",
    date_created_utc: new Date().toISOString(),
    date_paid_utc: new Date().toISOString(),
    total: orderDetails.total,
    shipping_total: orderDetails.shippingFee,
    payment_method: "split",
    payment_method_title: "Split",
    created_via: "checkout",
    razorpay_order_id: payment.order_id,
    transaction_id: payment.id,
    billing: buildDrystoreAddress(orderDetails.billing),
    shipping: buildDrystoreAddress(orderDetails.shipping),
    line_items: buildDrystoreItems(orderDetails),
    shipping_lines:
      orderDetails.shippingFee === 0
        ? [
            {
              method_title: "Free Shipping",
              total: "0.00",
            },
          ]
        : [
            {
              method_title: "ShipRocket",
              total: orderDetails.shippingFee.toFixed(2),
            },
          ],

    fee_lines: [],
  };
  if (finalStatus === "VERIFIED")
    console.log("[SPLIT DRYSTORE] Order sent", orderDetails.sessionId);
  if (process.env.NODE_ENV === "production" && finalStatus === "VERIFIED")
    await sendDryStoreOrder(order);
  await finalizeOrder(orderDetails.sessionId, finalStatus);
  await saveOrderToFile(
    `order_${orderDetails.sessionId}_drystore_split`,
    order,
  );
  return order;
}
