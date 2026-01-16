"use server";

import { cookies } from "next/headers";
import { generateJWT } from "@/utils/jwt.util";
import { redirect } from "next/navigation";
import { validateToken } from "@/utils/jwt.util";

export const validateAdmin = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("admin-access-token")?.value;
  const refreshToken = cookieStore.get("admin-refresh-token")?.value;

  const accessPayload = await validateToken(accessToken);
  const refreshPayload = await validateToken(refreshToken);

  if (!accessPayload && !refreshPayload) {
    redirect("/admin/login");
  }

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

export const isValidateAdmin = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("admin-access-token")?.value;
  const refreshToken = cookieStore.get("admin-refresh-token")?.value;

  const accessPayload = await validateToken(accessToken);
  const refreshPayload = await validateToken(refreshToken);

  if (!accessPayload && !refreshPayload) {
    return false;
  }

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

  return true;
};

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin-access-token");
  cookieStore.delete("admin-refresh-token");
  redirect("/");
}
