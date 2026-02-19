"use server";
import axios from "axios";
import { validateUser } from "@/actions/auth/user.action";
import { db } from "@/lib/db";
export const deleteAddress = async ({ publicId }: { publicId: string }) => {
  try {
    const user = await validateUser();
    if (!user)
      return {
        success: false,
        message: "Failed to authenticate user",
      };

    const { phone } = user;

    await db.address.delete({
      where: { publicId, userIdentifier: phone },
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
