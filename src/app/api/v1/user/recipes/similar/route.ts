import { NextRequest, NextResponse } from "next/server";
import { similarRecipes } from "@/actions/user/recipes/similar.action";
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const slug = searchParams.get("slug") ?? "";

  const res = await similarRecipes(slug?.toString());

  return NextResponse.json(res);
}
