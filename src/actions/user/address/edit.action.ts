"use server";
import { AddressProps, states } from "@/types/account";
import { validateUser } from "@/actions/auth/user.action";
import { AddressTagEnum, db } from "@/lib/db";
export const editAddress = async ({
  publicId,
  ...rest
}: AddressProps & { publicId: string }) => {
  try {
    const user = await validateUser();
    if (!user)
      return {
        success: false,
        message: "Failed to authenticate user",
      };
    const { phone } = user;

    await db.$transaction(async (tx) => {
      if (rest.tag !== AddressTagEnum.NONE) {
        await tx.address.updateMany({
          where: {
            userIdentifier: phone,
            tag: rest.tag,
          },
          data: {
            tag: AddressTagEnum.NONE,
          },
        });
      }
      const state =
        states.find((ele) => ele.code === rest.stateCode)?.name ?? "";
      await tx.address.update({
        where: { publicId: publicId },
        data: {
          state,
          ...rest,
        },
      });
    });

    return { success: true, message: "Address update successfully" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to update address" };
  }
};
