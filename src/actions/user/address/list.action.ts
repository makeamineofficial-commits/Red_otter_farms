"use server";
import { validateUser } from "@/actions/auth/user.action";
import { AddressTagEnum, db } from "@/lib/db";

export const listAddress = async () => {
  try {
    const user = await validateUser();

    if (!user || !user.phone)
      return {
        success: false,
        message: "Failed to authenticate user",
      };
    const { customerId } = user;

    const addresses = await db.address.findMany({
      where: { customerId },
    });

    const shippingAddress =
      addresses.find((ele) => ele.tag === AddressTagEnum.SHIPPING) ?? null;
    const billingAddress =
      addresses.find((ele) => ele.tag === AddressTagEnum.BILLING) ?? null;
    return {
      data: {
        shippingAddress,
        billingAddress,
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
