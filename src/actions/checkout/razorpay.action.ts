"use server";

import { db, PaymentPurpose, PaymentStatus } from "@/lib/db";
import { createPayment, getPaymentById } from "../payment/payment.action";
import { getOrder, updateOrderPayment } from "../orders/utils";
import { validateUser } from "../auth/user.action";

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

    const amountPaid = paymentEntity.amount; // in paise
    const status = paymentEntity.status;
    const method = paymentEntity.method;

    // ✅ Charges (in paise)
    const bankFee = paymentEntity.fee ?? 0;
    const tax = paymentEntity.tax ?? 0;

    const netAmount = amountPaid - bankFee;

    const provider = getRazorpayProvider(paymentEntity);

    const dbPaymentId = paymentEntity?.notes?.paymentId;
    const purpose: PaymentPurpose = paymentEntity?.notes.purpose;
    const customerId = paymentEntity?.notes.customerId;

    const customerEmail = paymentEntity.email ?? null;
    const customerPhone = paymentEntity.contact ?? null;
    const customerVpa = paymentEntity.vpa ?? null;
    const customerBank = paymentEntity.bank ?? null;
    const customerCardId = paymentEntity.card_id ?? null;
    const customerWallet = paymentEntity.wallet ?? null;

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
        razorpayPaymentId,
      },
    });

    if (alreadyProcessed) {
      throw new Error("Webhook already processed");
    }

    if (payment.status === PaymentStatus.VERIFIED) {
      throw new Error("Payment already verified");
    }

    await db.payment.update({
      where: { id: payment.id },
      data: {
        status: PaymentStatus.PROCESSING,
      },
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
      await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: finalStatus,
          razorpayPaymentId,
          razorpayOrderId,
          razorpayEvent: event,
          provider,
          method,
          customerEmail,
          customerPhone,
          customerVpa,
          customerBank,
          customerCardId,
          customerWallet,
          bankFee: status === "captured" ? bankFee : 0,
          tax: status === "captured" ? tax : 0,
          netAmount: status === "captured" ? netAmount : 0,
          paidAt: finalStatus === PaymentStatus.VERIFIED ? new Date() : null,
          rawWebhook: payload,
        },
      });

      return {
        isPartial: payment.isPartial,
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

export async function getRazorpayCheckout({
  amount,
  isPartial,
  orderId,
}: {
  amount: number;
  isPartial: boolean;
  orderId: string;
}): Promise<{
  success: boolean;
  message: any;
  razorPayOrderId?: string;
}> {
  try {
    const { order } = await getOrder({ orderId });
    const user = await validateUser();
    if (!order) return { success: false, message: "Order not found" };
    if (!order.paymentId) {
      const payment = await createPayment({
        amount,
        purpose: PaymentPurpose.ORDER,
        isPartial,
        referenceId: order.publicId,
        customerId: user && user.customerId ? user.customerId : null,
      });

      if (!payment.success || !payment.paymentId || !payment.orderId) {
        return {
          success: false,
          message: payment.message ?? "Failed to create payment",
        };
      }
      await updateOrderPayment({
        paymentId: payment.paymentId,
        orderId: order.publicId,
      });
      return {
        success: true,
        razorPayOrderId: payment.orderId,
        message: "Payment created for cart",
      };
    }

    const payment = await getPaymentById({
      id: order.paymentId,
    });

    if (
      payment &&
      [
        PaymentStatus.IN_PROGRESS,
        PaymentStatus.PROCESSING,
        // @ts-ignore
      ].includes(payment.status)
    ) {
      return {
        success: false,
        message: "Ongoing payment for this checkout",
      };
    }
    const shouldRecreate =
      !payment || payment.amount !== amount || !payment.razorpayOrderId;

    if (shouldRecreate) {
      const newPayment = await createPayment({
        amount,
        purpose: PaymentPurpose.ORDER,
        isPartial: false,
        referenceId: order.publicId,
        customerId: user && user.customerId ? user.customerId : null,
      });

      if (!newPayment.success || !newPayment.paymentId || !newPayment.orderId) {
        return {
          success: false,
          message: "Failed to create payment",
        };
      }
      await updateOrderPayment({
        paymentId: newPayment.paymentId,
        orderId: order.publicId,
      });

      return {
        success: true,
        razorPayOrderId: newPayment.orderId,
        message: "Payment created for cart",
      };
    }

    return {
      success: true,
      razorPayOrderId:
        payment.razorpayOrderId === null ? undefined : payment.razorpayOrderId,
      message: "Continuing existing payment",
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message ?? "Failed to checkout",
    };
  }
}
