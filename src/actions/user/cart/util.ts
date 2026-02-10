"use server";

import { validateUser } from "@/actions/auth/user.action";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { CartStatus } from "../../../../generated/prisma/enums";
import { getCart } from "./get.action";
import { Cart } from "@/types/cart";

export async function getCartId() {
  const cookieStore = await cookies();
  const sessionCartId = cookieStore.get("cart")?.value;

  const user = await validateUser();
  if (!user) {
    if (sessionCartId) {
      return sessionCartId;
    }

    const cart = await db.cart.create({
      data: {},
    });

    cookieStore.set("cart", cart.sessionId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    return cart.sessionId;
  }

  const userCart = await db.cart.findFirst({
    where: {
      userIdentifier: user.phone,
      status: CartStatus.ACTIVE,
    },
  });

  if (userCart) {
    return userCart.sessionId;
  }

  const newCart = await db.cart.create({
    data: {
      userIdentifier: user.phone,
    },
  });

  return newCart.sessionId;
}

export async function getCartTotal(cart: Cart) {
  const total = cart.items.reduce((prev, cur) => {
    return prev + cur.quantity * cur.variant.price;
  }, 0);

  return total;
}
