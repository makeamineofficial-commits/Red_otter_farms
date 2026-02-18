import { NextRequest, NextResponse } from "next/server";
import { getAccount } from "@/actions/user/account/get.action";
export async function GET(req: NextRequest) {
  const res = await getAccount();

  return NextResponse.json(
    res.account ? { account: res.account } : { message: "Account not found" },
  );
}
