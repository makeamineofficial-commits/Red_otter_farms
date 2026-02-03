"use server";

import { cookies } from "next/headers";
import { generateJWT } from "@/utils/jwt.util";
import { redirect } from "next/navigation";
import { validateToken } from "@/utils/jwt.util";
import { db } from "@/lib/db";
import { sendOTP, verifyOTP } from "@/utils/otp.util";
import { success } from "zod";
import axios from "axios";
import { UserToken } from "@/types/auth";

const validateUser = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("access-token")?.value;
  const refreshToken = cookieStore.get("refresh-token")?.value;

  const accessPayload = await validateToken<UserToken>(accessToken);
  const refreshPayload = await validateToken<UserToken>(refreshToken);

  if (!accessPayload && !refreshPayload) {
    return null;
  }

  if (!accessPayload && refreshPayload) {
    const newAccessToken = await generateJWT({
      phone: refreshPayload.phone,
      customerId: refreshPayload.customerId,
    });

    cookieStore.set("access-token", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: 60 * 15,
      path: "/",
    });
  }

  return {
    customerId: refreshPayload!.customerId,
    phone: refreshPayload!.phone?.startsWith("+91")
      ? refreshPayload?.phone
      : "+91" + refreshPayload?.phone,
  };
};

const isValidateUser = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("access-token")?.value;
  const refreshToken = cookieStore.get("refresh-token")?.value;

  const accessPayload = await validateToken<UserToken>(accessToken);
  const refreshPayload = await validateToken<UserToken>(refreshToken);

  if (!accessPayload && !refreshPayload) {
    return false;
  }

  return true;
};

async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("access-token");
  cookieStore.delete("refresh-token");
  redirect("/");
}

const loginUser = async (data: { phone: string; type?: string }) => {
  try {
    await sendOTP(data);
    return {
      success: true,
      message: "OTP sent to your phone successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Failed to send OTP to your phone",
    };
  }
};

const verifyUser = async ({ otp }: { otp: string }) => {
  try {
    const res = await verifyOTP(otp);

    if (!res.success || !res.phone) {
      return { success: false, message: res.message };
    }
    const { phone } = res;
    const userRes = await axios.post(
      "https://automation.redotterfarms.com/webhook/0b38de6f-5560-4396-8204-a1874e419a2d",
      { phone: "+91" + phone },
      {
        headers: { api_key: process.env.BACKEND_API_KEY as string },
      },
    );

    const account = userRes.data;
    const accessToken = await generateJWT({
      type: "access",
      phone,
      customerId: account[0].customer_id,
    });
    const refreshToken = await generateJWT(
      { type: "refresh", phone, customerId: account[0].customer_id },
      "30d",
    );
    const cookieStore = await cookies();
    cookieStore.set("access-token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: 60 * 15,
      path: "/",
    });
    cookieStore.set("refresh-token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    return {
      success: true,
      message: "Your phone no has been verified",
    };
  } catch (err: any) {
    console.log(err);
    return {
      success: false,
      message: err.message,
    };
  }
};

export { logout, isValidateUser, validateUser, loginUser, verifyUser };
