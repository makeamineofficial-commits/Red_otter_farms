import { NextRequest, NextResponse } from "next/server";
import { listFeaturedProducts } from "@/actions/user/products/featured.action";
import { listTestimonials } from "@/actions/user/testimonial/list.action";
import { getInstagramReels } from "@/actions/user/instagram/get.action";
export async function GET(req: NextRequest) {
  const { testimonials } = await listTestimonials();
  const products = await listFeaturedProducts();
  const reels = await getInstagramReels();
  return NextResponse.json({ testimonials, products, reels });
}
