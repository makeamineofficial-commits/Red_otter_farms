"use server";
import axios from "axios";
const PICKUP_PINCODE = (process.env.PICKUP_PINCODE as string) ?? "110001";
const SHIPROCKET_EMAIL = process.env.SHIPROCKET_EMAIL as string;
const SHIPROCKET_PASSWORD = process.env.SHIPROCKET_PASSWORD as string;

import { getCart } from "../user/cart/get.action";

function isNCRPincode(pincode: string): boolean {
  if (!/^\d{6}$/.test(pincode)) return false;

  const prefix = pincode.slice(0, 3);

  return (
    prefix.startsWith("11") ||
    prefix.startsWith("122") ||
    prefix.startsWith("201") ||
    prefix.startsWith("121")
  );
}

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
        if (ele.weightUnit === "kg") return ele.weight;
        return ele.weight / 1000; // convert grams to kg
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
    console.log("Logging into Shiprocket API...");
    const { data: authData } = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/auth/login",
      {
        email: SHIPROCKET_EMAIL,
        password: SHIPROCKET_PASSWORD,
      },
    );

    const token = authData.token;
    console.log("Received Shiprocket token:", token?.substring(0, 10) + "...");

    console.log(
      `Fetching shipping rate: pickup=${pickupPincode}, delivery=${deliveryPincode}, weight=${weight}kg`,
    );

    const { data: ratesData } = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/courier/serviceability/",
      {
        pickup_postcode: pickupPincode,
        delivery_postcode: deliveryPincode,
        weight,
        cod: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log(
      "Shiprocket API raw response:",
      JSON.stringify(ratesData, null, 2),
    );

    if (ratesData.status === "success" && ratesData.data.length > 0) {
      console.log(
        `Using rate from courier: ${ratesData.data[0].courier_name} - ₹${ratesData.data[0].rate}`,
      );
      return {
        success: true,
        rate: ratesData.data[0].rate,
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
