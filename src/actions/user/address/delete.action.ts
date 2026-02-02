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
    await axios.delete(
      "https://automation.redotterfarms.com/webhook/e1dc62a4-5233-4a63-b460-8b3a120794ea",
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

    return { success: true, message: "Address deleted successfully" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to deleted address" };
  }
};
