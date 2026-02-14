import { NextRequest, NextResponse } from "next/server";
import { listFeaturedProducts } from "@/actions/user/products/featured.action";
import { listTestimonials } from "@/actions/user/testimonial/list.action";
import { getAccount } from "@/actions/user/account/get.action";
export async function GET(req: NextRequest) {
  const res = await getAccount();

  return NextResponse.json(res.account);
}
