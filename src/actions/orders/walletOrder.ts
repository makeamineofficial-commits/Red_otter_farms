"use server";

import { CartExtended } from "@/types/cart";
import {
  finalizeOrder,
  saveOrderToFile,
  calculateTotal,
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
import { validateUser } from "../auth/user.action";

export async function createNormalWalletOrder(cart: CartExtended) {
  const user = await validateUser();
  await afterCheckout();
  const total = await calculateTotal(cart);

  const order = {
    id: cart.sessionId,

    order_date: new Date().toISOString().slice(0, 10),

    customer_id: user && user.customerId ? user.customerId : null,

    mobile: (cart.billing.phone as string).startsWith("+91")
      ? cart.billing.phone
      : "+91" + cart.billing.phone,

    payment_status: "PAID",

    billing_address: buildNormalAddress(cart.billing),

    shipping_address: buildNormalAddress(cart.shipping),

    order_items: {
      items: buildNormalItems(cart),
    },
    payment_object: {
      cart_value: total,
      otterwallet: total,

      rof_campaign: {
        coupon: "",
      },

      split_payment: total,
      delivery_charge: 0,
      discount_amount: 0,
      customer_payment: {
        useRazorpay: false,
        useOtterWallet: true,
        total_payment_due: total,
        razorpay_payment_amount: 0,
        otterwallet_payment_amount: total,
      },

      total_order_value: total,
    },

    source: "Website - NCR",

    place_of_supply: cart.shipping.state,
  };
  await sendNormalOrder(order);
  await finalizeOrder(cart.id, cart.userIdentifier!, PaymentStatus.VERIFIED);
  await saveOrderToFile(`order_${cart.sessionId}`, order);
  return order;
}

export async function createDrystoreWalletOrder(cart: CartExtended) {
  const total = await calculateTotal(cart);

  const order = {
    id: Number(cart.sessionId),

    number: cart.sessionId,

    status: "processing",

    currency: "INR",

    version: "9.9.5",

    date_created_utc: new Date().toISOString(),

    date_paid_utc: new Date().toISOString(),

    total: total.total.toFixed(2),

    shipping_total: total.shipping.toFixed(2),

    payment_method: "wallet",

    payment_method_title: "Otter Wallet",

    created_via: "checkout",

    billing: buildDrystoreAddress(cart.billing),

    shipping: buildDrystoreAddress(cart.shipping),

    line_items: buildDrystoreItems(cart),

    shipping_lines:
      total.shipping === 0
        ? [
            {
              method_title: "Free Shipping",
              total: "0.00",
            },
          ]
        : [
            {
              method_title: "ShipRocket",
              total: total.shipping.toFixed(2),
            },
          ],

    fee_lines: [],
  };
  await sendDryStoreOrder(order);
  await finalizeOrder(cart.id, cart.userIdentifier!, PaymentStatus.VERIFIED);
  await saveOrderToFile(`order_${cart.sessionId}`, order);
  return order;
}
