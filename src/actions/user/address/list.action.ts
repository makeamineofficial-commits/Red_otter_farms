"use server";
import { validateUser } from "@/actions/auth/user.action";
import axios from "axios";
import { AddressTag, ListAddressReturnType } from "@/types/account";
import { db } from "@/lib/db";

export const listAddress = async () => {
  try {
    const user = await validateUser();
    if (!user)
      return {
        success: false,
        message: "Failed to authenticate user",
      };
    const { phone } = user;
    const res = await axios.post(
      "https://automation.redotterfarms.com/webhook/0b38de6f-5560-4396-8204-a1874e419a2d",
      { phone },
      {
        headers: { api_key: process.env.BACKEND_API_KEY as string },
      },
    );

    const {
      addresses: _addresses,
      shipping_address,
      billing_address,
    } = res.data[0];
    const addressIds = _addresses.map((a: any) => a.address_id);

    const labels = await db.addressLabel.findMany({
      where: {
        addressId: { in: addressIds },
      },
    });

    const addressTag = await db.addressTag.findMany({
      where: {
        addressId: { in: addressIds },
      },
    });

    const labelMap = new Map(labels.map((label) => [label.addressId, label]));

    const tagMap = new Map(addressTag.map((tag) => [tag.addressId, tag.tag]));

    const addresses = _addresses
      .map((address: any) => {
        const labelEntry = labelMap.get(address.address_id);
        const tagEntry = tagMap.get(address.address_id);
        return {
          ...address,
          street: address.street2,
          tag: tagEntry ?? ("NONE" as AddressTag),
          phone: phone!,
          label: labelEntry?.label ?? null,
          customLabel: labelEntry?.customLabel ?? null,
        };
      })
      .map((ele: any) => {
        if (
          ele.address_id === billing_address.address_id ||
          ele.address_id === shipping_address.address_id
        )
          return null;
        return ele;
      })
      .filter((ele: any) => !!ele);
    return {
      data: {
        shipping_address,
        billing_address,
        addresses,
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
