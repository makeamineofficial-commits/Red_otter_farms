import { NextRequest, NextResponse } from "next/server";
import { listRecipes } from "@/actions/user/recipes/list.action";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const filter = {
    page: Number(searchParams.get("page") || "1"),
    limit: Number(searchParams.get("limit") || "10"),
    q: searchParams.get("q") || undefined,
    category: searchParams.get("category") || undefined,
  };

  const res = await listRecipes(filter);

  return NextResponse.json(res);
}
