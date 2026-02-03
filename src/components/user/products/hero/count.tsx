"use client";

import React, { useEffect, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/provider/cart.provider";
import { Button } from "@/components/ui/button";
export default function Count(product: Product) {
  const { update, cart } = useCart();

  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    if (!cart) return;

    const count = cart.products.find(
      (ele) => ele.publicId === product.publicId,
    )?.quantity;

    if (count) {
      setQuantity(count);
    }
  }, [cart]);
  return (
    <div className="flex w-full flex-col justify-between sm:flex-row gap-3">
      <div className=" flex items-center border-2  h-fit w-fit rounded-2xl">
        <div className="h-12    w-12 rounded-l-2xl hover:bg-muted   flex items-center justify-center">
          <Minus
            className="size-5 cursor-pointer"
            onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
          />{" "}
        </div>

        <span className="   rounded-md h-10 w-12 items-center justify-center flex leading-0 text-[1rem] sm:text-[1.125rem] font-semibold flex-1 text-center">
          {quantity}
        </span>
        <div className="h-12 w-12  rounded-r-2xl hover:bg-muted   flex items-center justify-center ">
          <Plus
            className="size-5 cursor-pointer"
            onClick={() => setQuantity((quantity) => quantity + 1)}
          ></Plus>
        </div>
      </div>

      <Button
        onClick={() => {
          // @ts-ignore
          update({ product, quantity });
        }}
        size="lg"
        className="
        h-14 font-bold
        w-full 
        sm:flex-1 sm:max-w-56
        bg-forest text-white hover:bg-forest/90 hover:text-white
        "
      >
        Add to Cart
      </Button>
    </div>
  );
}
