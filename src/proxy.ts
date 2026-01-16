import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { isValidateAdmin } from "./actions/auth/admin.action";

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname === "/admin/dashboard" ||
    pathname.startsWith("/admin/dashboard/")
  ) {
    const res = await isValidateAdmin();
    if (res) return NextResponse.next();
    else return NextResponse.redirect(new URL("/admin/auth/login", req.url));
  }
  return NextResponse.next();
}
