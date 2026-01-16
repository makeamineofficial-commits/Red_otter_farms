"use server";

import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { generateJWT } from "@/utils/jwt.util";
import { cookies } from "next/headers";
const loginAdminUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const user = await db.adminUser.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        user: null,
        success: false,
        message: "Account not found",
      };
    }

    if (!bcrypt.compare(password, user.passwordHash)) {
      return {
        success: true,
        message: "Incorrect password provided",
      };
    }
    const accessToken = await generateJWT({ email: user.email, id: user.id });
    const refreshToken = await generateJWT(
      { email: user.email, id: user.id },
      "30d"
    );

    const cookieStore = await cookies();
    cookieStore.set("admin-access-token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: 60 * 15,
      path: "/",
    });
    cookieStore.set("admin-refresh-token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    return {
      success: true,
      message: "Admin User logged in successfully",
    };
  } catch (err) {
    return {
      user: null,
      success: false,
      message: "Admin User failed to login",
    };
  }
};

export { loginAdminUser };
