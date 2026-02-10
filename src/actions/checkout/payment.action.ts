"use server";

// used to create a new payment order on razorpay and returns the internal_payment_id and razorpay order id

import { db, PaymentPurpose, PaymentStatus } from "@/lib/db";
import { razorpay } from "@/lib/razorpay";

export const updatePayment = async ({
  paymentId,
  paidAt,
  ...rest
}: {
  paymentId: string;

  razorpayPaymentId?: string;
  razorpaySignature?: string;
  razorpayEvent?: string;
  paidAt?: Date;
  method?: string;
  provider?: string;
  rawWebhook?: any;
  errorCode?: string;
  errorDescription?: string;
}) => {
  try {
    const payment = await db.payment.findUnique({
      where: {
        publicId: paymentId,
      },
    });
    if (!payment) return { success: false, message: "Payment not found" };
    await db.payment.update({
      where: {
        publicId: paymentId,
      },
      data: {
        paidAt: paidAt && paidAt.toDateString(),
        ...rest,
      },
    });
    return { success: true, message: "Payment updated" };
  } catch (err) {
    return { success: false, message: "Failed to update payment" };
  }
};

export const updatePaymentStatus = async ({
  paymentId,
  status,
}: {
  paymentId: string;
  status: PaymentStatus;
}) => {
  const statusLevels: Record<PaymentStatus, number> = {
    CREATED: 0,
    PENDING: 1,
    IN_PROGRESS: 2,
    PROCESSING: 3,
    FAILED: 4,
    VERIFIED: 4,
    REFUNDED: 4,
    UNDERPAID: 4,
    OVERPAID: 4,
    EXPIRED: 4,
    CANCELLED: 4,
  };

  const payment = await db.payment.findUnique({
    where: { publicId: paymentId },
  });
  if (!payment) throw new Error("Payment not found");

  if (statusLevels[status] < statusLevels[payment.status]) {
    throw new Error(
      `Cannot update payment from ${payment.status} → ${status} (would be a regression)`,
    );
  }

  return db.payment.update({
    where: { publicId: paymentId },
    data: { status },
  });
};

export const getPaymentById = async ({ id }: { id: string }) => {
  return db.payment.findUnique({
    where: { publicId: id },
  });
};
export const getPaymentByReference = async ({
  referenceId,
}: {
  referenceId: string;
}) => {
  const payments = await db.payment.findMany({
    where: {
      referenceId,
      status: {
        in: [
          PaymentStatus.PENDING,
          PaymentStatus.PROCESSING,
          PaymentStatus.IN_PROGRESS,
        ],
      },
    },
    orderBy: { createdAt: "desc" },
  });
  if (payments.length === 0) return null;
  if (payments.length > 1)
    console.warn(
      `Multiple existing Payment found for reference [${referenceId}]`, // warning that this reference may have multiple ongoing payments
    );

  return payments[0];
};

export const createPayment = async ({
  amount,
  purpose,
  referenceId,
  customerId,
}: {
  purpose: PaymentPurpose;
  amount: number;
  referenceId: string;
  customerId: string | null;
}): Promise<{
  success: boolean;
  orderId?: string;
  paymentId?: string;
  message: string;
}> => {
  try {
    const existing = await db.payment.findMany({
      where: {
        referenceId,
        status: {
          in: [PaymentStatus.PROCESSING, PaymentStatus.IN_PROGRESS],
        },
      },
      orderBy: { createdAt: "desc" },
    });

    if (existing.length > 0)
      return {
        success: false,
        message: `Ongoing Payment found for reference [${referenceId}]`, // to prevent multiple checkouts
      };
    // this is to make sure any pending to be paid by user payment are first marked expired
    // useful incase of needing a new razorpay order for updated amount
    await db.payment.updateMany({
      where: {
        referenceId,
        status: { in: [PaymentStatus.PENDING, PaymentStatus.CREATED] },
      },
      data: {
        status: PaymentStatus.EXPIRED,
      },
    });

    //  creating new payment
    const payment = await db.payment.create({
      data: {
        referenceId,
        purpose,

        amount,
      },
    });

    // generate orderid

    const order = await razorpay.orders.create({
      amount,
      notes: {
        purpose,
        paymentId: payment.publicId,
        customerId,
      },
      currency: "INR",
    });

    await db.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        razorpayOrderId: order.id,
        status: PaymentStatus.PENDING,
      },
    });

    return {
      success: true,
      message: "Payment order generated",
      paymentId: payment.publicId,
      orderId: order.id ?? undefined,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message ?? "Failed to create payment order",
    };
  }
};
