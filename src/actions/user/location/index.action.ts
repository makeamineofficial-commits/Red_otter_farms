"use server";

import { cookies } from "next/headers";

export async function isLocationNCR(): Promise<boolean> {
  const cookieStore = await cookies();

  const location = cookieStore.get("isncr");

  if (!location) return true;

  return location.value === "true";
}

export async function updateLocation(isNCR: boolean) {
  const cookieStore = await cookies();

  cookieStore.set("isncr", String(isNCR), {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
  });
}

export async function askForLocation(): Promise<boolean> {
  const cookieStore = await cookies();

  const location = cookieStore.get("isncr");

  return !location;
}
