"use server";
import { finalizeOrder, saveOrderToFile, sendOrder, syncUser } from "./utils";
import {
  buildNormalItems,
  mapRazorpayStatus,
  buildNormalAddress,
} from "./helper";

import { razorpay } from "@/lib/razorpay";
import { db } from "@/lib/db";
import { Order } from "@/types/order";

export async function createRazorpayOrder({
  orderDetails,
  ncr,
}: {
  ncr: boolean;
  orderDetails: Order;
}) {
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

  const total = Number(payment.amount) / 100;

  if (finalStatus === "VERIFIED") {
    console.log("[RAZORPAY] Order sent", orderDetails.id);
    const {
      billingAddressId,
      shippingAddressId,
      phone,
      accountId,
      customerId,
    } = await syncUser({
      billing: orderDetails.billing,
      shipping: orderDetails.shipping,
    });
    const { addressId: _shippingAddressId, ...billing } = orderDetails.billing;
    const { addressId: _billingAddressId, ...shipping } = orderDetails.shipping;
    const order = {
      id: orderDetails.id,

      order_date: new Date().toISOString().slice(0, 10),

      customer_id: customerId,

      mobile: phone,

      payment_status: finalStatus === "VERIFIED" ? "PAID" : "FAILED",

      billing_address: buildNormalAddress({
        addressId: _billingAddressId ? _billingAddressId : billingAddressId,
        ...billing,
      }),

      shipping_address: buildNormalAddress({
        addressId: _shippingAddressId ? _shippingAddressId : shippingAddressId,
        ...shipping,
      }),

      order_items: {
        // @ts-ignore
        items: buildNormalItems(orderDetails),
      },

      payment_object: {
        cart_value: orderDetails.subTotal,
        otterwallet: 0,
        rof_campaign: {
          coupon: "",
        },
        split_payment: false,
        delivery_charge: orderDetails.shippingFee,
        discount_amount: orderDetails.discount,
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

        account_id: accountId,
      },

      source: ncr ? "Website - NCR" : "Website - Non NCR",

      place_of_supply: orderDetails.shipping.stateCode,
    };
    await sendOrder(order);
    await saveOrderToFile(`order_${order.id}`, order);
    await finalizeOrder(orderDetails.sessionId, finalStatus);
    return order;
  }
}
