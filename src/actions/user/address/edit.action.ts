"use server";
import axios from "axios";
import { AddressProps } from "@/types/account";
import { validateUser } from "@/actions/auth/user.action";
import { db } from "@/lib/db";
export const editAddress = async (
  data: AddressProps & { address_id: string },
) => {
  try {
    const user = await validateUser();
    if (!user)
      return {
        success: false,
        message: "Failed to authenticate user",
      };
    const { phone, customerId } = user;
    await axios.post(
      "https://automation.redotterfarms.com/webhook/cf21ea68-477f-4e50-9d20-d122a299bb21",
      { address: { mobile: phone, ...data } },
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

    await db.addressLabel.create({
      data: {
        addressId: data.address_id,
        label: data.labelType as any,
        customLabel: data.customLabel,
      },
    });

    if (data.tag !== "NONE") {
      await db.addressTag.updateMany({
        where: {
          customerId,
          tag: data.tag,
        },
        data: {
          tag: "NONE",
        },
      });
    }

    const lookUp = await db.addressTag.findUnique({
      where: {
        customerId,
        addressId: data.address_id,
      },
    });
    if (lookUp) {
      await db.addressTag.update({
        where: {
          customerId,
          addressId: data.address_id,
        },
        data: {
          tag: data.tag,
        },
      });
    } else {
      await db.addressTag.create({
        data: {
          tag: data.tag,
          customerId,
          addressId: data.address_id,
        },
      });
    }
    return { success: true, message: "Address update successfully" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to update address" };
  }
};
