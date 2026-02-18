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
import { getUser, validateUser } from "../auth/user.action";

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
    const user = await validateUser();
    if (user && user.phone) {
      const profile = await getUser(user.phone);
      if (profile && profile.otter_pass)
        return { success: true, rate: 0, courier: "Free Shipping" };
    }

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
