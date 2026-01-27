"use server";

import { getCart } from "../user/cart/get.action";
import { getShippingRate } from "./shipping.action";
export const getRazorpayOrderId = async ({
  shippingPincode,
}: {
  shippingPincode: string;
}): Promise<{ success: boolean; orderId?: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    success: true,
    orderId: "dummy_order_id_123456",
  };
};
