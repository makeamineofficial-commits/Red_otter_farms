import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { isValidateUser } from "./actions/auth/user.action";
import { isValidateAdmin } from "./actions/auth/admin.action";

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname === "/admin/dashboard" ||
    pathname.startsWith("/admin/dashboard/")
  ) {
    const res = await isValidateAdmin();
    if (res) return NextResponse.next();
    else return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  //   if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
  //     const res = await isValidateUser();
  //     if (res) return NextResponse.next();
  //     else return NextResponse.redirect(new URL("/login", req.url));
  //   }

  //   if (pathname === "/") {
  //     const res = await isValidateUser();
  //     if (res) return NextResponse.redirect(new URL("/dashboard", req.url));
  //     else return NextResponse.next();
  //   }

  return NextResponse.next();
}
