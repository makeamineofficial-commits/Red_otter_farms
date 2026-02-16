"use server";
import { getUser, validateUser } from "@/actions/auth/user.action";
import { Account } from "@/types/account";
export async function getAccount() {
  try {
    const user = await validateUser();
    if (!user)
      return {
        success: false,
        message: "Failed to authenticate user",
      };
    const { phone } = user;
    if (!phone)
      return {
        success: false,
        message: "User not logged in",
      };
    const account = await getUser(phone);
    return {
      success: true,
      message: "User details found",
      account: account as Account,
    };
  } catch (err) {
    return {
      success: false,
      message: "Failed to get user details",
    };
  }
}
