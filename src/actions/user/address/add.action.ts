"use server";
import axios from "axios";
import { AddressProps, states } from "@/types/account";
import { validateUser } from "@/actions/auth/user.action";
import { db } from "@/lib/db";
export const addAddress = async (data: AddressProps) => {
  try {
    const user = await validateUser();
    if (!user || !user.phone)
      return {
        success: false,
        message: "Failed to authenticate user",
      };
    const { phone } = user;

    await db.$transaction(async (tx) => {
      if (data.tag !== "NONE") {
        await tx.address.updateMany({
          where: {
            userIdentifier: phone,
            tag: data.tag,
          },
          data: {
            tag: "NONE",
          },
        });
      }
      const state =
        states.find((ele) => ele.code === data.stateCode)?.name ?? "";

      await tx.address.create({
        data: {
          state,
          userIdentifier: phone,
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
