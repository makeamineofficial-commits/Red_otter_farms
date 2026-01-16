"use server";

import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { generateJWT } from "@/utils/jwt.util";
import { cookies } from "next/headers";
const registerAdmin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const check = await db.adminUser.findUnique({
      where: {
        email,
      },
    });

    if (check) {
      return {
        user: null,
        success: false,
        message: "Admin User already registered",
      };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await db.adminUser.create({
      data: {
        email,
        passwordHash,
      },
    });
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
      message: "Admin User registered successfully",
    };
  } catch (err) {
    return {
      user: null,
      success: false,
      message: "Admin User failed to registered",
    };
  }
};

export { registerAdmin };
