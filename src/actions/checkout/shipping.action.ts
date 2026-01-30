"use server";
import axios from "axios";
const PICKUP_PINCODE = (process.env.PICKUP_PINCODE as string) ?? "110001";
const SHIPROCKET_EMAIL = process.env.SHIPROCKET_EMAIL as string;
const SHIPROCKET_PASSWORD = process.env.SHIPROCKET_PASSWORD as string;

import { getCart } from "../user/cart/get.action";

import { isNCRPincode } from "@/lib/utils";
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
    if (isNCRPincode(deliveryPincode)) {
      console.log("NCR pincode detected, using flat rate 99");
      return { success: true, rate: 9900, courier: "Local NCR Delivery" };
    }

    const cart = await getCart();
    if (!cart) {
      console.log("Cart is empty or failed to load, fallback rate applied");
      return { success: false, rate: 9900, courier: "" };
    }

    const weight = cart.products
      .map((ele) => {
        if (ele.weightUnit === "kg") return ele.weight * ele.quantity;
        return (ele.weight / 1000) * ele.quantity;
      })
      .reduce((a, b) => a + b, 0);

    console.log(`Total cart weight (kg): ${weight}`);

    const shipRocketRate = await getShiprocketRate({
      pickupPincode: PICKUP_PINCODE,
      deliveryPincode,
      weight,
    });

    console.log("Shiprocket API response:", shipRocketRate);

    if (shipRocketRate.success) {
      return {
        success: true,
        rate: shipRocketRate.rate,
        courier: "Shiprocket (Surface)",
      };
    } else {
      console.warn("Shiprocket returned no valid rates, using fallback");
      return { success: false, rate: 9900, courier: "" };
    }
  } catch (err) {
    console.error("Error in getShippingRate:", err);
    return { success: false, rate: 9900, courier: "" };
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

    const { data: authData } = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/auth/login",
      {
        email: SHIPROCKET_EMAIL.trim(),
        password: SHIPROCKET_PASSWORD.trim(),
      },
    );

    const token = authData.token;

    const { data: ratesData } = await axios.get(
      "https://apiv2.shiprocket.in/v1/external/courier/serviceability/",

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
