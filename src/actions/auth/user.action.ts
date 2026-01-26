"use server";

import { cookies } from "next/headers";
import { generateJWT } from "@/utils/jwt.util";
import { redirect } from "next/navigation";
import { validateToken } from "@/utils/jwt.util";
import { db } from "@/lib/db";
import { sendOTP, verifyOTP } from "@/utils/otp.util";
import { success } from "zod";

const validateUser = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("access-token")?.value;
  const refreshToken = cookieStore.get("refresh-token")?.value;

  const accessPayload = await validateToken(accessToken);
  const refreshPayload = await validateToken(refreshToken);

  if (!accessPayload && !refreshPayload) {
    return null;
  }

  if (!accessPayload && refreshPayload) {
    const newAccessToken = await generateJWT({
      id: refreshPayload.id,
      email: refreshPayload.email,
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
    phone: refreshPayload!.phone,
  };
};

const isValidateUser = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("access-token")?.value;
  const refreshToken = cookieStore.get("refresh-token")?.value;

  const accessPayload = await validateToken(accessToken);
  const refreshPayload = await validateToken(refreshToken);

  if (!accessPayload && !refreshPayload) {
    return false;
  }
  // even with expired access token they are considered logged in
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
    const phone = await verifyOTP(otp);
    const accessToken = await generateJWT({ phone });
    const refreshToken = await generateJWT({ phone }, "30d");
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
