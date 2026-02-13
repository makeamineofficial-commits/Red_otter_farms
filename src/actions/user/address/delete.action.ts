"use server";
import axios from "axios";
import { validateUser } from "@/actions/auth/user.action";
import { db } from "@/lib/db";
export const deleteAddress = async (data: { address_id: string }) => {
  try {
    const user = await validateUser();
    if (!user)
      return {
        success: false,
        message: "Failed to authenticate user",
      };
    const { customerId } = user;
    await axios.delete(
      "https://automation.redotterfarms.com/webhook/e1dc62a4-5233-4a63-b460-8b3a120794ea",
      {
        headers: { api_key: process.env.BACKEND_API_KEY as string },
        params: { customer_id: customerId, address_id: data.address_id },
      },
    );

    await db.addressLabel.deleteMany({
      where: {
        addressId: data.address_id,
      },
    });
    await db.addressTag.deleteMany({
      where: {
        addressId: data.address_id,
      },
    });

    return { success: true, message: "Address deleted successfully" };
  } catch (err: any) {
    console.log(err.response.data);
    return {
      success: false,
      message: err.response.data.message ?? "Failed to delete address",
    };
  }
};
