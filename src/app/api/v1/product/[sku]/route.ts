import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Prisma } from "../../../../../../generated/prisma/client";

const API_SECRET = process.env.API_SECRET;

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ sku: string }> },
) {
  const headers = req.headers;
  const api_secret = headers.get("API_SECRET");

  if (!api_secret)
    return NextResponse.json(
      {
        message: "API_SECRET missing in headers",
      },
      { status: 401 },
    );

  if (api_secret !== API_SECRET) {
    return NextResponse.json(
      {
        message: "Unauthorized! API_SECRET didn't matched",
      },
      { status: 401 },
    );
  }

  const { price, inStock, availableInStock, stockLimit } = await req.json();

  const { sku } = await context.params;

  try {
    const check = await db.variant.findFirst({
      where: {
        AND: [{ sku }],
      },
    });

    if (!check)
      return NextResponse.json(
        {
          success: false,
          message: "Product details not found",
        },
        { status: 404 },
      );
    const updatedProduct = await db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const updatedProduct = await tx.variant.update({
          data: { inStock, price: price * 100, availableInStock, stockLimit },
          where: { id: check.id },
        });
        return updatedProduct;
      },
    );

    return NextResponse.json(
      {
        success: true,
        message: "Product updated successfully",
        product: updatedProduct,
      },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Failed to update product" },
      { status: 500 },
    );
  }
}
