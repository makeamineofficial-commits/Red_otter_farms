"use server";

import { finalizeOrder, saveOrderToFile, sendOrder, syncUser } from "./utils";
import { buildNormalItems, buildNormalAddress } from "./helper";

import { afterCheckout } from "../checkout/checkout.action";
import { PaymentStatus } from "@/lib/db";
import { Order } from "@/types/order";

export async function createWalletOrder({
  ncr,
  orderDetails,
}: {
  ncr: boolean;
  orderDetails: Order;
}) {
  console.log("[WALLET] Order sent", orderDetails.id);
  await afterCheckout();
  const { billingAddressId, shippingAddressId, phone, customerId } =
    await syncUser({
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

    payment_status: "PAID",

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

    source: ncr ? "Website - NCR" : "Website - Non NCR",

    place_of_supply: orderDetails.shipping.stateCode,
  };
  await sendOrder(order);
  await finalizeOrder(orderDetails.sessionId, PaymentStatus.VERIFIED);
  await saveOrderToFile(`order_${orderDetails.id}`, order);
  return order;
}
