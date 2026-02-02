"use server";

import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { generateJWT, validateToken } from "@/utils/jwt.util";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminToken } from "@/types/auth";
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
    const accessToken = await generateJWT({
      email: user.email,
      id: user.id,
      type: "access",
    });
    const refreshToken = await generateJWT(
      { email: user.email, id: user.id, type: "refresh" },
      "30d",
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

const validateAdmin = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("admin-access-token")?.value;
  const refreshToken = cookieStore.get("admin-refresh-token")?.value;

  const accessPayload = await validateToken<AdminToken>(accessToken);
  const refreshPayload = await validateToken<AdminToken>(refreshToken);

  if (!accessPayload && !refreshPayload) {
    redirect("/admin/login");
  }

  // first check if admin actually exist in db
  const admin = await db.adminUser.findUnique({
    where: {
      id: refreshPayload!.id,
    },
  });

  if (!admin) redirect("/admin/login"); // admin has been deleted
  if (!accessPayload && refreshPayload) {
    const newAccessToken = await generateJWT({
      type: "access",
      id: refreshPayload.id,
      email: refreshPayload.email,
    });

    cookieStore.set("admin-access-token", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: 60 * 15,
      path: "/",
    });
  }

  return {
    id: accessPayload!.id,
    email: accessPayload!.email,
  };
};

const isValidateAdmin = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("admin-access-token")?.value;
  const refreshToken = cookieStore.get("admin-refresh-token")?.value;

  const accessPayload = await validateToken(accessToken);
  const refreshPayload = await validateToken(refreshToken);

  if (!accessPayload && !refreshPayload) {
    return false;
  }
  // even with expired access token they are considered logged in
  return true;
};

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin-access-token");
  cookieStore.delete("admin-refresh-token");
  redirect("/");
}

export { loginAdminUser, validateAdmin, isValidateAdmin };
