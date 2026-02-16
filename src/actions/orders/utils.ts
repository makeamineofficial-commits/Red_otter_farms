"use server";

import { CartStatus, OrderStatus, PaymentStatus } from "@/lib/db";
import { db } from "@/lib/db";
import axios from "axios";
import fs from "fs/promises";
import path from "path";

export async function finalizeOrder(
  cartId: string,
  finalStatus: PaymentStatus,
) {
  await db.$transaction(async (tx) => {
    const cart = await tx.cart.findUnique({
      where: {
        sessionId: cartId,
      },
    });

    if (!cart) {
      throw new Error("Cart not found");
    }
    const existing = await tx.order.findUnique({
      where: { cartId: cart.id },
    });

    const orderStatus =
      finalStatus === PaymentStatus.VERIFIED
        ? OrderStatus.PLACED
        : OrderStatus.FAILED;

    await tx.order.update({
      where: { id: existing!!.id },
      data: { status: orderStatus },
    });
    if (orderStatus === "PLACED") {
      await tx.cart.update({
        where: { sessionId: cartId },
        data: { status: CartStatus.CONVERTED },
      });
    }
  });
}

export async function saveOrderToFile(prefix: string, orderData: unknown) {
  try {
    // Base directory
    const baseDir = path.join(process.cwd(), "public", "assets");

    // Ensure directory exists
    await fs.mkdir(baseDir, { recursive: true });

    // File path
    const filePath = path.join(baseDir, `${prefix}.json`);

    // Convert to formatted JSON
    const jsonData = JSON.stringify(orderData, null, 2);

    // Write file
    await fs.writeFile(filePath, jsonData, "utf-8");

    return {
      success: true,
      path: filePath,
    };
  } catch (error) {
    console.error("Failed to save order JSON:", error);

    throw new Error("Could not save order file");
  }
}

export async function sendNormalOrder(payload: any) {
  try {
    await axios.post(
      "https://automation.redotterfarms.com/webhook/7a3574f2-2373-40f5-bb58-16e38c8ea72c",
      payload,
      {
        headers: { api_key: process.env.BACKEND_API_KEY as string },
      },
    );
    return { success: true, message: "Order sent successfully" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to send order" };
  }
}

export async function sendDryStoreOrder(payload: any) {
  try {
    await axios.post(
      "https://automation.redotterfarms.com/webhook/9bb9613a-bbec-4ffb-b562-6ba7cdee3461",
      payload,
      {
        headers: { api_key: process.env.BACKEND_API_KEY as string },
      },
    );
    return { success: true, message: "DryStore Order sent successfully" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to send drystore order" };
  }
}

export async function getOrder({ orderId }: { orderId: string }) {
  const order = await db.order.findUnique({
    where: {
      publicId: orderId,
    },
  });
  if (!order) return { success: false };

  return { order, sucess: true };
}

export const updateOrderPayment = async ({
  paymentId,
  orderId,
}: {
  paymentId: string;
  orderId: string;
}): Promise<{ success: boolean }> => {
  const order = await db.order.findUnique({
    where: { publicId: orderId },
    select: {
      id: true,
    },
  });

  if (!order) return { success: false };

  await db.order.update({
    where: { publicId: orderId },
    data: {
      paymentId,
    },
  });

  return {
    success: true,
  };
};
