import { NextRequest, NextResponse } from "next/server";
import { getSimilarProducts } from "@/actions/user/products/similar.action";
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const slug = searchParams.get("slug") ?? "";

  const res = await getSimilarProducts(slug.toString());

  return NextResponse.json(res);
}
