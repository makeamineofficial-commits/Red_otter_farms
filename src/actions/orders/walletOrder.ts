"use server";

import {
  finalizeOrder,
  saveOrderToFile,
  sendNormalOrder,
  sendDryStoreOrder,
} from "./utils";
import {
  buildNormalItems,
  buildDrystoreAddress,
  buildDrystoreItems,
  buildNormalAddress,
} from "./helper";

import { afterCheckout } from "../checkout/checkout.action";
import { PaymentStatus } from "@/lib/db";
import { Order } from "@/types/order";

export async function createNormalWalletOrder(
  orderDetails: Order & { customerId: string | null },
) {
  await afterCheckout();

  const order = {
    id: orderDetails.id,

    order_date: new Date().toISOString().slice(0, 10),

    customer_id: orderDetails.customerId,

    mobile: orderDetails.billing.phone.startsWith("+91")
      ? orderDetails.billing.phone
      : "+91" + orderDetails.billing.phone,

    payment_status: "PAID",

    billing_address: buildNormalAddress(orderDetails.billing),

    shipping_address: buildNormalAddress(orderDetails.shipping),

    order_items: {
      items: buildNormalItems(orderDetails),
    },
    payment_object: {
      cart_value: orderDetails.subTotal,
      otterwallet: orderDetails.total,

      rof_campaign: {
        coupon: "",
      },

      split_payment: false,
      delivery_charge: orderDetails.shippingFee,
      discount_amount: orderDetails.discount,
      customer_payment: {
        useRazorpay: false,
        useOtterWallet: true,
        total_payment_due: orderDetails.total,
        razorpay_payment_amount: 0,
        otterwallet_payment_amount: orderDetails.total,
      },

      total_order_value: orderDetails.total,
    },

    source: "Website - NCR",

    place_of_supply: orderDetails.shipping.state,
  };
  if (process.env.NODE_ENV === "production") await sendNormalOrder(order);
  await finalizeOrder(orderDetails.sessionId, PaymentStatus.VERIFIED);
  await saveOrderToFile(`order_${orderDetails.sessionId}_normal_wallet`, order);
  return order;
}

export async function createDrystoreWalletOrder(orderDetails: Order) {
  await afterCheckout();
  const order = {
    id: orderDetails.id,
    number: orderDetails.sessionId,
    status: "paid",
    currency: "INR",
    version: "9.9.5",
    date_created_utc: new Date().toISOString(),
    date_paid_utc: new Date().toISOString(),
    total: orderDetails.total,
    shipping_total: orderDetails.shippingFee,
    payment_method: "wallet",
    payment_method_title: "Otter Wallet",
    created_via: "checkout",
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
  if (process.env.NODE_ENV === "production") await sendDryStoreOrder(order);
  await finalizeOrder(orderDetails.sessionId, PaymentStatus.VERIFIED);
  await saveOrderToFile(
    `order_${orderDetails.sessionId}_drystore_wallet`,
    order,
  );
  return order;
}
