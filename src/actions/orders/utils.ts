"use server";

import { CartStatus, OrderStatus, PaymentStatus } from "@/lib/db";
import { db } from "@/lib/db";
import { Cart } from "@/types/cart";

import fs from "fs/promises";
import path from "path";
import { getShippingRate } from "../checkout/shipping.action";
import { getCartTotal } from "../user/cart/util";

export async function finalizeOrder(
  cartId: string,
  userId: string,
  finalStatus: PaymentStatus,
) {
  await db.$transaction(async (tx) => {
    const existing = await tx.order.findUnique({
      where: { cartId },
    });

    const orderStatus =
      finalStatus === PaymentStatus.VERIFIED
        ? OrderStatus.PLACED
        : OrderStatus.FAILED;

    if (!existing) {
      await tx.order.create({
        data: {
          cartId,
          userIdentifier: userId,
          status: orderStatus,
        },
      });
    } else {
      await tx.order.update({
        where: { id: existing.id },
        data: { status: orderStatus },
      });
    }

    await tx.cart.update({
      where: { id: cartId },
      data: { status: CartStatus.CONVERTED },
    });
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

export async function calculateTotal(
  cart: Cart,
): Promise<{ subTotal: number; total: number; shipping: number }> {
  const shipping = await getShippingRate({
    deliveryPincode: cart.shipping.zip,
  });
  const subTotal = await getCartTotal(cart);

  return {
    subTotal: subTotal / 100,
    total: subTotal + shipping.rate / 100,
    shipping: shipping.rate / 100,
  };
}
