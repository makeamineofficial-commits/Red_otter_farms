"use server";
import { validateUser } from "@/actions/auth/user.action";
import axios from "axios";
import { ListAddressReturnType } from "@/types/account";
import { db } from "@/lib/db";
export const listAddress = async () => {
  try {
    const user = await validateUser();
    if (!user)
      return {
        success: false,
        message: "Failed to authenticate user",
      };
    const { phone, customerId } = user;
    const res = await axios.post(
      "https://automation.redotterfarms.com/webhook/0b38de6f-5560-4396-8204-a1874e419a2d",
      { phone },
      {
        headers: { api_key: process.env.BACKEND_API_KEY as string },
      },
    );

    const { addresses: _addresses, ...rest }: ListAddressReturnType =
      res.data[0];
    const addressIds = _addresses.map((a) => a.address_id);

    const labels = await db.addressLabel.findMany({
      where: {
        addressId: { in: addressIds },
      },
    });
    const labelMap = new Map(labels.map((label) => [label.addressId, label]));

    const addresses = _addresses.map((address) => {
      const labelEntry = labelMap.get(address.address_id);

      return {
        ...address,
        phone: phone!,
        label: labelEntry?.label ?? null,
        customLabel: labelEntry?.customLabel ?? null,
      };
    });
    return {
      data: {
        addresses,
        ...rest,
      },
      success: true,
      message: "Address list of user",
    };
  } catch (err) {
    console.log(err);
    return {
      success: true,
      message: "Error fetching address for user",
    };
  }
};
