"use server";
import { AddressProps, states } from "@/types/account";
import { validateUser } from "@/actions/auth/user.action";
import { AddressTagEnum, db } from "@/lib/db";
import { updateAddress } from "./utils";
export const editAddress = async ({
  publicId,
  ...rest
}: AddressProps & { publicId: string }) => {
  try {
    const user = await validateUser();
    if (!user || !user.phone || !user.customerId)
      return {
        success: false,
        message: "Failed to authenticate user",
      };
    const { phone, customerId } = user;

    const state = states.find((ele) => ele.code === rest.stateCode)?.name ?? "";

    const address = await db.$transaction(async (tx) => {
      if (rest.tag !== AddressTagEnum.NONE) {
        await tx.address.updateMany({
          where: {
            phone,
            tag: rest.tag,
          },
          data: {
            tag: AddressTagEnum.NONE,
          },
        });
      }
      const state =
        states.find((ele) => ele.code === rest.stateCode)?.name ?? "";
      return await tx.address.update({
        where: { publicId: publicId },
        data: {
          state,
          ...rest,
        },
      });
    });

    await updateAddress({
      customerId,
      phone,
      address: {
        ...rest,
        state,
        country: "India",
        addressId: address.addressId,
      },
    });

    return { success: true, message: "Address update successfully" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to update address" };
  }
};
