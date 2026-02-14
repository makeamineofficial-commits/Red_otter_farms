import { NextRequest, NextResponse } from "next/server";
import { getOrders } from "@/actions/user/orders/list.action";
export async function GET(req: NextRequest) {
  const res = await getOrders();

  return NextResponse.json(res.orders);
}
