import { listAddress } from "@/actions/user/address/list.action";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const res = await listAddress();
  return NextResponse.json(res);
}
