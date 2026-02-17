import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

import { handleRazorpayWebhook } from "@/actions/checkout/razorpay.action";
import { db, PaymentPurpose } from "@/lib/db";
import { handleOrder } from "@/actions/orders/order.action";
import { PaymentMethod } from "@/types/payment";
import { buySubscription } from "@/actions/purchase/nutrition.action";
import { buyOtterPass } from "@/actions/purchase/otterpass.action";
import { addToFund } from "@/actions/purchase/wallet.action";



export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();

    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      console.error("Missing Razorpay signature");
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!secret) {
      throw new Error("RAZORPAY_KEY_SECRET not configured");
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== signature) {
      console.error("Invalid Razorpay webhook signature");

      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const { purpose, paymentId, customerId, isPartial } =
      await handleRazorpayWebhook(JSON.parse(rawBody));

    if (purpose === PaymentPurpose.ORDER) {
      const payment = await db.payment.findUnique({
        where: { id: paymentId },
      });
      if (!payment) {
        console.error("[Webhook] Payment not found");
        return NextResponse.json({ success: true }, { status: 200 });
      }
      const order = await db.order.findFirst({
        where: {
          paymentId: payment.publicId,
        },
      });
      if (!order) {
        console.log("[Webhook] Order not found");
        return NextResponse.json({ success: true }, { status: 200 });
      }

      const cart = await db.cart.findFirst({
        where: {
          order: {
            id: order.id,
          },
        },
      });
      if (!cart) {
        console.log("[Webhook] Cart not found");
        return NextResponse.json({ success: true }, { status: 200 });
      }
      await handleOrder({
        customerId,
        cartSessionId: cart.sessionId,
        paymentMethod: isPartial ? PaymentMethod.SPLIT : PaymentMethod.RAZORPAY,
      });
    } else if (purpose === PaymentPurpose.WALLET) {
      await addToFund({ paymentId });
    } else if (purpose === PaymentPurpose.NUTRITION_METER) {
      await buySubscription({ paymentId });
    } else if (purpose === PaymentPurpose.OTTER_PASS) {
      await buyOtterPass({ paymentId });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Razorpay webhook error:", error.message);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Webhook processing failed",
      },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Webhook visible" });
}
