"use server";

import { cookies } from "next/headers";
import { generateJWT } from "@/utils/jwt.util";
import { redirect } from "next/navigation";
import { validateToken } from "@/utils/jwt.util";
import { db } from "@/lib/db";

// used by other server actions to validate admin and check if they exist in the db or not
export const validateAdmin = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("admin-access-token")?.value;
  const refreshToken = cookieStore.get("admin-refresh-token")?.value;

  const accessPayload = await validateToken(accessToken);
  const refreshPayload = await validateToken(refreshToken);

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

// used by proxy and layout to verify it admin is logged in or not

export const isValidateAdmin = async () => {
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
