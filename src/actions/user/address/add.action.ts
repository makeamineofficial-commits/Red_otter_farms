"use server";
import axios from "axios";
import { AddressProps } from "@/types/account";
import { validateUser } from "@/actions/auth/user.action";
import { db } from "@/lib/db";
export const addAddress = async (data: AddressProps) => {
  try {
    const user = await validateUser();
    if (!user)
      return {
        success: false,
        message: "Failed to authenticate user",
      };
    const { phone, customerId } = user;

    const res = await axios.post(
      "https://automation.redotterfarms.com/webhook/9da662fb-adc1-482e-850f-0b69c588ef85",
      { address: { mobile: phone, ...data } },
      {
        headers: { api_key: process.env.BACKEND_API_KEY as string },
        params: { customer_id: customerId },
      },
    );

    const { address_id } = res.data[0];
    await db.addressLabel.create({
      data: {
        addressId: address_id,
        label: data.labelType as any,
        customLabel: data.customLabel,
      },
    });
    return { success: true, message: "Address created successfully" };
  } catch (err: any) {
    console.log(err);
    return { success: false, message: "Failed to create address" };
  }
};
