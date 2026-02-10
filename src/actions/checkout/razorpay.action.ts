"use server";

import { db, PaymentPurpose, PaymentStatus } from "@/lib/db";

function getRazorpayProvider(payment: any): string | null {
  switch (payment.method) {
    case "upi":
      return payment.vpa?.split("@")[1] ?? null;

    case "card":
      return payment.card?.network ?? null;

    case "netbanking":
      return payment.bank ?? null;

    case "wallet":
      return payment.wallet ?? null;

    default:
      return null;
  }
}

export async function handleRazorpayWebhook(payload: any) {
  try {
    const event = payload.event;
    const paymentEntity = payload?.payload?.payment?.entity;
    if (!paymentEntity) {
      throw new Error("Invalid Razorpay payload");
    }

    const razorpayPaymentId = paymentEntity.id;
    const razorpayOrderId = paymentEntity.order_id;
    const amountPaid = paymentEntity.amount;
    const status = paymentEntity.status;
    const method = paymentEntity.method;

    const provider = getRazorpayProvider(paymentEntity);

    const dbPaymentId = paymentEntity?.notes?.paymentId;
    const purpose: PaymentPurpose = paymentEntity?.notes.purpose;
    const customerId = paymentEntity?.notes.customerId;

    if (!dbPaymentId) {
      throw new Error("Missing internal paymentId in notes");
    }

    const payment = await db.payment.findUnique({
      where: { publicId: dbPaymentId },
    });

    if (!payment) {
      throw new Error("Payment record not found");
    }

    const alreadyProcessed = await db.payment.findFirst({
      where: {
        razorpayPaymentId: razorpayPaymentId,
      },
    });

    if (alreadyProcessed) {
      throw new Error("Webhook already processed");
    }

    if (payment.status === PaymentStatus.VERIFIED) {
      throw new Error("Payment already verified");
    }

    await db.$transaction(async (tx) => {
      await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: PaymentStatus.PROCESSING,
        },
      });
    });

    let finalStatus: PaymentStatus = PaymentStatus.PROCESSING;

    if (status === "failed") {
      finalStatus = PaymentStatus.FAILED;
    }

    if (status === "captured") {
      if (amountPaid < payment.amount) {
        finalStatus = PaymentStatus.UNDERPAID;
      } else if (amountPaid > payment.amount) {
        finalStatus = PaymentStatus.OVERPAID;
      } else {
        finalStatus = PaymentStatus.VERIFIED;
      }
    }

    return await db.$transaction(async (tx) => {
      // Update Payment
      await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: finalStatus,
          razorpayPaymentId,
          razorpayOrderId,
          razorpayEvent: event,
          provider,
          method: method,
          paidAt: finalStatus === PaymentStatus.VERIFIED ? new Date() : null,
          rawWebhook: payload,
        },
      });

      return {
        purpose,
        paymentId: payment.id,
        ok: true,
        status: finalStatus,
        message: "Webhook Processed successfully",
        customerId,
      };
    });
  } catch (err) {
    console.error("Razorpay Webhook Error:", err);
    throw err;
  }
}
