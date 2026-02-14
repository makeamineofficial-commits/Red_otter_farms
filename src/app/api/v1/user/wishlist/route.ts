import { NextRequest, NextResponse } from "next/server";
import { getWishlist } from "@/actions/user/wishlist/get.action";
export async function GET(req: NextRequest) {
  const res = await getWishlist();

  return NextResponse.json(res);
}
