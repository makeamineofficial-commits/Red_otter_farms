"use server";

import axios from "axios";
import { db, PaymentPurpose } from "@/lib/db";
import { getUser, validateUser } from "../auth/user.action";
import { createPayment } from "../payment/payment.action";
import { saveOrderToFile } from "../orders/utils";

export async function buySubscription(data: { paymentId: string }) {
  try {
    const payment = await db.payment.findUnique({
      where: {
        publicId: data.paymentId,
      },
    });
    if (!payment) throw new Error("Payment not found");

    const purchase = await db.purchase.findUnique({
      where: { publicId: payment.referenceId },
    });

    if (!purchase) {
      throw new Error("Purchase not found");
    }

    const user = await getUser(purchase?.userIdentifier);
    if (!user) throw new Error("User not found");
    const payload = {
      customer_id: user.customer_id,
      customer_name: [user.first_name, user.last_name].join(" "),
      amount: payment.amount / 100,
      payment_ref: payment.razorpayPaymentId,
      payment_method: payment.method,
      payment_contact: payment.customerPhone,
      payment_for: "Nutrition Meter Subscription",
      payment_charges: payment.bankFee / 100,
    };

    if (process.env.NODE_ENV === "production") {
      //   await axios.post(
      //     "https://automation.redotterfarms.com/webhook/b9b0d695-600f-4078-bf19-074513c8e1ba",
      //     { ...payload },
      //     {
      //       headers: { api_key: process.env.BACKEND_API_KEY as string },
      //     },
      //   );
    }
    await saveOrderToFile("nutrition_meter_subscription", payload);
    return { success: true, message: "Subscription enabled successfully" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to enable subscription" };
  }
}

export async function requestSubscription(_amount: number) {
  const user = await validateUser();

  if (!user || !user.phone || !user.customerId)
    return { success: false, message: "User not found" };

  const amount = _amount * 100;

  const purchase = await db.purchase.create({
    data: {
      amount,
      purpose: PaymentPurpose.NUTRITION_METER,
      userIdentifier: user.phone,
    },
  });

  const payment = await createPayment({
    amount,
    purpose: PaymentPurpose.NUTRITION_METER,
    customerId: user.customerId,
    referenceId: purchase.publicId,
    isPartial: false,
  });

  await db.purchase.update({
    where: { id: purchase.id },
    data: { paymentId: payment.paymentId },
  });

  return { ...payment };
}
