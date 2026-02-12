"use server";
import axios from "axios";
const PICKUP_PINCODE = (process.env.PICKUP_PINCODE as string) ?? "110001";
const SHIPROCKET_EMAIL = process.env.SHIPROCKET_EMAIL as string;
const SHIPROCKET_PASSWORD = process.env.SHIPROCKET_PASSWORD as string;

import {
  ShiprocketCreateOrderInput,
  ShiprocketOrderResponse,
} from "@/types/common";

const BASE_URL = "https://apiv2.shiprocket.in/v1/external";

import { getCart } from "../user/cart/get.action";

import { isNCRPincode } from "@/lib/utils";

import { db } from "@/lib/db";

export async function getShippingRate({
  deliveryPincode,
}: {
  deliveryPincode: string;
}): Promise<{
  success: boolean;
  rate: number;
  courier: string;
}> {
  try {
    /* ---------- NCR FLAT RATE ---------- */

    if (isNCRPincode(deliveryPincode)) {
      return {
        success: true,
        rate: 9900,
        courier: "Local NCR Delivery",
      };
    }

    /* ---------- Get Cart ---------- */

    const cart = await getCart();

    if (!cart || cart.items.length === 0) {
      return {
        success: false,
        rate: 9900,
        courier: "",
      };
    }

    const variantIds = cart.items.map((item) => item.variant.publicId);

    const variants = await db.variant.findMany({
      where: {
        id: {
          in: variantIds,
        },
      },
      select: {
        id: true,
        weight: true,
        weightUnit: true,
      },
    });

    const variantMap = new Map(variants.map((v) => [v.id, v]));

    let totalWeightKg = 0;

    for (const item of cart.items) {
      const variant = variantMap.get(item.variant.publicId);

      if (!variant || !variant.weight) continue;

      let weightKg = 0;

      if (variant.weightUnit === "kg") {
        weightKg = variant.weight;
      } else {
        // assume grams
        weightKg = variant.weight / 1000;
      }

      totalWeightKg += weightKg * item.quantity;
    }

    /* ---------- Safety Fallback ---------- */

    if (totalWeightKg <= 0) {
      totalWeightKg = 1; // minimum for Shiprocket
    }

    console.log("Live cart weight (kg):", totalWeightKg);

    /* ---------- Get Shiprocket Rate ---------- */

    const shipRocketRate = await getShiprocketRate({
      pickupPincode: PICKUP_PINCODE,
      deliveryPincode,
      weight: totalWeightKg,
    });

    if (shipRocketRate.success) {
      return {
        success: true,
        rate: shipRocketRate.rate,
        courier: "Shiprocket (Surface)",
      };
    }

    return {
      success: false,
      rate: 9900,
      courier: "",
    };
  } catch (err) {
    console.error("Shipping rate error:", err);

    return {
      success: false,
      rate: 9900,
      courier: "",
    };
  }
}

export const getShiprocketRate = async ({
  pickupPincode,
  deliveryPincode,
  weight = 1,
}: {
  pickupPincode: string;
  deliveryPincode: string;
  weight?: number;
}) => {
  try {
    if (weight === 0) return { success: false, rate: 9900, courier: "" };

    const { data: authData } = await axios.post(BASE_URL + "/auth/login", {
      email: SHIPROCKET_EMAIL.trim(),
      password: SHIPROCKET_PASSWORD.trim(),
    });

    const token = authData.token;

    const { data: ratesData } = await axios.get(
      BASE_URL + "/courier/serviceability/",

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          pickup_postcode: pickupPincode,
          delivery_postcode: deliveryPincode,
          weight,
          cod: 0,
        },
      },
    );

    if (ratesData.data.available_courier_companies.length > 0) {
      console.log(
        `Using rate from courier: ${ratesData.data.available_courier_companies[0].courier_name} - ₹${ratesData.data.available_courier_companies[0].rate}`,
      );
      return {
        success: true,
        rate: ratesData.data.available_courier_companies[0].rate * 100,
      };
    } else {
      console.warn("Shiprocket returned empty or failed data");
      return { success: false, rate: 0 };
    }
  } catch (error: any) {
    console.error("Shiprocket API call failed:");
    console.error("Status:", error.response?.status);
    console.error("Headers:", error.response?.headers);
    console.error("Data:", error.response?.data);
    console.error("Message:", error.message);
    return { success: false, rate: 0 };
  }
};

export async function createShiprocketOrder(
  input: ShiprocketCreateOrderInput,
): Promise<ShiprocketOrderResponse> {
  const { data: authData } = await axios.post(BASE_URL + "/auth/login", {
    email: SHIPROCKET_EMAIL.trim(),
    password: SHIPROCKET_PASSWORD.trim(),
  });

  const token = authData.token;

  const payload = {
    order_id: input.order_id,
    order_date: input.order_date,
    order_pickup_location: input.pickup_location,

    billing_customer_name: input.billing.customer_name,
    billing_address: input.billing.address,
    billing_city: input.billing.city,
    billing_pincode: input.billing.pincode,
    billing_state: input.billing.state,
    billing_country: input.billing.country,
    billing_email: input.billing.email,
    billing_phone: input.billing.phone,

    shipping_is_billing: input.shipping_is_billing ? 1 : 0,

    ...(input.shipping &&
      !input.shipping_is_billing && {
        shipping_customer_name: input.shipping.customer_name,
        shipping_address: input.shipping.address,
        shipping_city: input.shipping.city,
        shipping_pincode: input.shipping.pincode,
        shipping_state: input.shipping.state,
        shipping_country: input.shipping.country,
        shipping_email: input.shipping.email,
        shipping_phone: input.shipping.phone,
      }),

    order_items: input.order_items,

    payment_method: input.payment_method,

    shipping_charges: input.shipping_charges ?? 0,
    giftwrap_charges: input.giftwrap_charges ?? 0,
    transaction_charges: input.transaction_charges ?? 0,

    length: input.length,
    breadth: input.breadth,
    height: input.height,
    weight: input.weight,
  };

  const res = await fetch(`${BASE_URL}/orders/create/adhoc`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Shiprocket Order Failed: " + JSON.stringify(data));
  }

  return {
    order_id: data.order_id,
    shipment_id: data.shipment_id,
    status: data.status,
    awb_code: data.awb_code,
  };
}
