import { validateUser } from "@/actions/auth/user.action";
import { Account } from "@/types/account";
import React from "react";
import { success } from "zod";

const SECRET = process.env.OTP_SECRET as string;

export async function getAccount(): Promise<{
  success: boolean;
  message: string;
  account?: Account;
}> {
  await validateUser();
  return new Promise((res, rej) => {
    res({
      success: true,
      message: "Account details found",
      account: {
        customer_id: "96965000000247226",
        first_name: "John",
        last_name: "Doe",
        phone: "+919XXXXXXXXX",
        mobile: "+919XXXXXXXXX",
        otter_wallet: 250.0,
        total_saving: 1340.5,
        loyality_status: "GOLD",
        otter_pass: true,
        nutrition_meter: false,
        otter_n: true,
      },
    });
  });
  //   const res = await fetch(
  //     "https://automation.redotterfarms.com/webhook/0b38de6f-5560-4396-8204-a1874e419a2d",
  //     {
  //       method: "POST",
  //       headers: { api_key: process.env.BACKEND_API_KEY as string },
  //       body: JSON.stringify({ phone }),
  //     },
  //   );
  //   if (!res.ok) {
  //     return {
  //       success: false,
  //       message: "Failed to load user details",
  //     };
  //   }

  //   const account = (await res.json()) as Account;
  //   return {
  //     success: true,
  //     message: "Account details found",
  //     account,
  //   };
}
