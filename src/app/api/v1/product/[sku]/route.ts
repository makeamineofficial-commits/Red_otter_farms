import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Prisma } from "../../../../../../generated/prisma/client";
import { getProduct } from "@/actions/user/products/get.action";

const API_SECRET = process.env.API_SECRET;

function validateRequest(api_secret: string | null) {
  if (!api_secret) {
    return {
      message: "API_SECRET missing in headers",
      ok: false,
    };
  }
  if (api_secret !== API_SECRET) {
    return {
      message: "Unauthorized! API_SECRET didn't matched",
      ok: false,
    };
  }
  return { ok: true, message: "Valid request" };
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ sku: string }> },
) {
  const headers = req.headers;
  const api_secret = headers.get("API_SECRET");

  const { message, ok } = validateRequest(api_secret);

  if (!ok) {
    return NextResponse.json(
      {
        message,
      },
      { status: 401 },
    );
  }
  let body;

  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid or empty JSON body" },
      { status: 400 },
    );
  }

  if (!body)
    return NextResponse.json(
      {
        message: "Body is required",
      },
      { status: 400 },
    );

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
    const {
      price = check.price / 100,
      inStock,
      availableInStock,
      stockLimit,
      mrp = check.mrp / 100,
      isPublished,
    } = body;
    const updatedProduct = await db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const updatedProduct = await tx.variant.update({
          data: {
            price: price * 100,
            mrp: mrp * 100,
            inStock,
            availableInStock,
            stockLimit,
            isPublished,
          },
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
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: "Failed to update product" },
      { status: 500 },
    );
  }
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ sku: string }> },
) {
  try {
    const headers = req.headers;
    const api_secret = headers.get("API_SECRET");

    const { message, ok } = validateRequest(api_secret);

    if (!ok) {
      return NextResponse.json(
        {
          message,
          success: ok,
        },
        { status: 401 },
      );
    }
    const { sku } = await context.params;
    const variant = await db.variant.findUnique({
      where: { sku },
      select: { product: { select: { slug: true } } },
    });

    if (!variant) {
      return NextResponse.json(
        { success: false, message: "Product details not found" },
        { status: 404 },
      );
    }

    const productRes = await getProduct({ slug: variant.product.slug });

    if (!productRes.product) {
      return NextResponse.json(
        { success: false, message: "Product details not found" },
        { status: 404 },
      );
    }

    const { product } = productRes;
    const { presentInWishlist, ...rest } = product;
    return NextResponse.json(
      {
        success: true,
        message: "Product details found",
        product: rest,
      },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch product details" },
      { status: 500 },
    );
  }
}
