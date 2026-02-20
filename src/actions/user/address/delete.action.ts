"use server";
import axios from "axios";
import { validateUser } from "@/actions/auth/user.action";
import { db } from "@/lib/db";
import { delAddress } from "./utils";
export const deleteAddress = async ({ publicId }: { publicId: string }) => {
  try {
    const user = await validateUser();
    if (!user || !user.phone)
      return {
        success: false,
        message: "Failed to authenticate user",
      };

    const { phone, customerId } = user;

    const address = await db.address.delete({
      where: { publicId, phone },
    });
    await delAddress({ customerId, addressId: address.addressId });
    return { success: true, message: "Address deleted successfully" };
  } catch (err: any) {
    console.log(err.response.data);
    return {
      success: false,
      message: err.response.data.message ?? "Failed to delete address",
    };
  }
};
