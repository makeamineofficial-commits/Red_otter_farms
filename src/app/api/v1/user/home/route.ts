import { NextRequest, NextResponse } from "next/server";
import { listFeaturedProducts } from "@/actions/user/products/featured.action";
import { listTestimonials } from "@/actions/user/testimonial/list.action";
export async function GET(req: NextRequest) {
  const { testimonials } = await listTestimonials();
  const products = await listFeaturedProducts();

  return NextResponse.json({ testimonials, products });
}
