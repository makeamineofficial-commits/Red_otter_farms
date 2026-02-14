import { NextRequest, NextResponse } from "next/server";

import { listProducts } from "@/actions/user/products/list.action";
import { SortBy } from "@/types/product";
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const filter = {
    page: Number(searchParams.get("page") || "1"),
    limit: Number(searchParams.get("limit") || "10"),
    q: searchParams.get("q") || undefined,
    inStock: searchParams.get("inStock") === "true" || false,
    category: searchParams.get("category") ?? "",
    maxPrice: searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined,
    sortBy: searchParams.get("sortBy") as SortBy,
    benefits: searchParams.getAll("benefit"),
  };
  const res = await listProducts(filter);

  return NextResponse.json(res);
}
