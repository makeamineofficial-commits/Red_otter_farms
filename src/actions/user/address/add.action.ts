"use server";
import axios from "axios";
import { AddressProps, states } from "@/types/account";
import { validateUser } from "@/actions/auth/user.action";
import { db } from "@/lib/db";
import { createAddress, updateAddress } from "./utils";
export const addAddress = async (data: AddressProps) => {
  try {
    const user = await validateUser();
    if (!user || !user.customerId || !user.phone)
      return {
        success: false,
        message: "Failed to authenticate user",
      };
    const { phone, customerId } = user;

    const state = states.find((ele) => ele.code === data.stateCode)?.name ?? "";
    const addressDetails = await createAddress({
      customerId,
      phone,
      address: { ...data, state, country: "India" },
    });
    if (!addressDetails.addressId)
      return { success: false, message: "Failed to sync address with backend" };
    await db.$transaction(async (tx) => {
      if (data.tag !== "NONE") {
        await tx.address.updateMany({
          where: {
            phone,
            customerId,
            tag: data.tag,
          },
          data: {
            tag: "NONE",
          },
        });
      }

      await tx.address.create({
        data: {
          addressId: addressDetails.addressId,
          phone,
          state,
          customerId,
          country: "India",
          ...data,
        },
      });
    });
    return { success: true, message: "Address created successfully" };
  } catch (err: any) {
    console.log(err);
    return { success: false, message: "Failed to create address" };
  }
};
