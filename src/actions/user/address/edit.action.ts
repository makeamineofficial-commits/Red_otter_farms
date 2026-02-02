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
      { mobile: phone, ...data },
      {
        headers: { api_key: process.env.BACKEND_API_KEY as string },
        params: { customer_id: customerId, address_id: data.address_id },
      },
    );

    await db.addressLabel.delete({
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

    return { success: true, message: "Address created successfully" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to create address" };
  }
};
