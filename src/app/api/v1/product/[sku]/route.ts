import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Prisma } from "../../../../../../generated/prisma/client";
export async function PATCH(
  req: NextRequest,
  { params }: { params: { sku: string } }
) {
  const { price, inStock } = await req.json();
  const { sku } = params;

  try {
    const check = await db.product.findFirst({
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
        { status: 404 }
      );
    const updatedProduct = await db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const updatedProduct = await tx.product.update({
          data: { inStock, price },
          where: { id: check.id },
        });
        return updatedProduct;
      }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Product updated successfully",
        product: updatedProduct,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Failed to update product" },
      { status: 500 }
    );
  }
}
