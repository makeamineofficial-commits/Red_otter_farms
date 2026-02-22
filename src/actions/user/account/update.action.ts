"use server";
import { validateUser } from "@/actions/auth/user.action";
import axios from "axios";
export async function updateAccount(data: {
  family_members: string[];
  family_size: string;
  age: string;
  gender: string;
  profile_pic?: string;
  email: string;
}) {
  try {
    const user = await validateUser();
    if (!user)
      return {
        success: false,
        message: "Failed to authenticate user",
      };
    const { customerId } = user;

    await axios.post(
      "https://automation.redotterfarms.com/webhook/44cf592b-5711-4da3-a69f-1a5e57b490f3",
      { ...data, customer_id: customerId },
      {
        headers: { api_key: process.env.BACKEND_API_KEY as string },
      },
    );

    return {
      success: true,
      message: "User details updated",
    };
  } catch (err) {
    return {
      success: false,
      message: "Failed to get user details",
    };
  }
}
