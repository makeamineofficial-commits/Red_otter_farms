"use client";

import React, { useEffect, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/provider/cart.provider";
import { Button } from "@/components/ui/button";
export default function Count(product: Product) {
  const { name, price, mrp, assets, slug } = product;
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
      <div className="gap-2.5 flex items-center">
        <div className="h-10  w-10 rounded-full border-2 flex items-center justify-center border-muted-foreground">
          <Minus
            className="size-5 cursor-pointer"
            onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
          />{" "}
        </div>

        <span className=" bg-[#E5E5E5]  rounded-md h-10 w-12 items-center justify-center flex leading-0 text-[1rem] sm:text-[1.125rem] font-semibold flex-1 text-center">
          {quantity}
        </span>
        <div className="h-10 w-10 rounded-full border-2  flex items-center justify-center border-muted-foreground">
          <Plus
            className="size-5 cursor-pointer"
            onClick={() => setQuantity((quantity) => quantity + 1)}
          ></Plus>
        </div>
      </div>

      <Button
        onClick={() => {
          update({ product, quantity });
        }}
        size="lg"
        className="
        h-14 font-bold
        w-full 
        sm:flex-1 sm:max-w-56
        "
      >
        Add to Cart
      </Button>
    </div>
  );
}
