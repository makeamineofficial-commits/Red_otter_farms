"use server";

import { cookies } from "next/headers";
import { generateJWT } from "@/utils/jwt.util";
import { redirect } from "next/navigation";
import { validateToken } from "@/utils/jwt.util";
import { sendOTP, verifyOTP } from "@/utils/otp.util";
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

export const validateUserReadOnly = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("access-token")?.value;
  const refreshToken = cookieStore.get("refresh-token")?.value;

  const accessPayload = await validateToken<UserToken>(accessToken);
  const refreshPayload = await validateToken<UserToken>(refreshToken);

  if (!accessPayload && !refreshPayload) {
    return null;
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
    const phone = data.phone.startsWith("+91")
      ? data.phone
      : "+91" + data.phone;
    await sendOTP({ phone });
    return {
      success: true,
      message: "OTP sent to your phone successfully",
    };
  } catch (err: any) {
    console.error(err.message);
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
      { phone },
      {
        headers: { api_key: process.env.BACKEND_API_KEY as string },
      },
    );

    const account = userRes.data[0];
    let customerId = account?.customer_id ?? null;
    if (!customerId) {
      // creating account if not found
      const account = await axios.post(
        "https://automation.redotterfarms.com/webhook/b40a9035-c8c3-4267-bc9e-144b89c2ab55",
        { mobile: phone },
        {
          headers: { api_key: process.env.BACKEND_API_KEY as string },
        },
      );
      customerId = account.data.zoho_inv_customer_id;
    }

    const accessToken = await generateJWT({
      type: "access",
      phone,
      customerId,
    });
    const refreshToken = await generateJWT(
      {
        type: "refresh",
        phone,
        customerId,
      },
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
    return {
      success: false,
      message: err.message,
    };
  }
};

const createAccount = async ({
  phone,
  firstName,
  lastName,
  email,
}: {
  phone: string;
  firstName: string;
  lastName: string;
  email?: string;
}) => {
  const userRes = await axios.post(
    "https://automation.redotterfarms.com/webhook/0b38de6f-5560-4396-8204-a1874e419a2d",
    { phone },
    {
      headers: { api_key: process.env.BACKEND_API_KEY as string },
    },
  );

  const account = userRes.data[0];
  let customerId = account?.customer_id ?? null;

  if (!customerId) {
    await axios.post(
      "https://automation.redotterfarms.com/webhook/b40a9035-c8c3-4267-bc9e-144b89c2ab55",
      {
        mobile: phone.startsWith("+91") ? phone : "+91" + phone,
        first_name: firstName,
        last_name: lastName,
        email: email,
      },
      {
        headers: { api_key: process.env.BACKEND_API_KEY as string },
      },
    );
  }
};

export {
  logout,
  isValidateUser,
  validateUser,
  loginUser,
  verifyUser,
  createAccount,
};
