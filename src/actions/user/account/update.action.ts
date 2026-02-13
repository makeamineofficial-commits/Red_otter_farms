"use server";
import { validateUser } from "@/actions/auth/user.action";
import { Account } from "@/types/account";
import axios from "axios";
export async function updateAccount() {
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

    const account = res.data;
    return {
      success: true,
      message: "User details found",
      account: account[0] as Account,
    };
  } catch (err) {
    return {
      success: false,
      message: "Failed to get user details",
    };
  }
}
