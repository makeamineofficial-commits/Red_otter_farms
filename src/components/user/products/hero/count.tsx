"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Product, Variant } from "@/types/product";
import { useCart } from "@/provider/cart.provider";
import { Button } from "@/components/ui/button";
import { useProduct } from "@/provider/product.provider";
import { convertToCartItem } from "@/lib/utils";

export default function Count({
  product: data,
}: {
  product: Product & {
    recipes: { title: string; slug: string }[];
    variants: Variant[];
  };
}) {
  const { update, cart } = useCart();
  const { selectedVariant } = useProduct();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!cart || !selectedVariant) return;

    const count = cart.items.find(
      (ele) => ele.variant.publicId === selectedVariant.publicId,
    )?.quantity;

    if (count) {
      setQuantity(count);
    }
  }, [cart]);

  if (!data) return <></>;

  if (!selectedVariant) return <></>;

  const variantOption = useMemo(() => {
    if (!selectedVariant || !data?.options) return [];

    return selectedVariant.options.map((variantOpt) => {
      const optionGroup = data.options.find(
        (opt) => opt.slug === variantOpt.option,
      );

      if (!optionGroup) return variantOpt.optionValue;

      const optionValue = optionGroup.values.find(
        (val) => val.slug === variantOpt.optionValue,
      );

      return optionValue?.displayName || variantOpt.optionValue;
    });
  }, [selectedVariant, data]);

  return (
    <div className="flex w-full flex-col justify-between sm:flex-row gap-3">
      {data.hasSubscription ? (
        <></>
      ) : (
        <>
          <div className=" flex items-center border-2  h-fit w-fit rounded-2xl">
            <button
              disabled={!selectedVariant.inStock}
              className="h-12    w-12 rounded-l-2xl hover:bg-muted   flex items-center justify-center"
            >
              <Minus
                className="size-5 cursor-pointer"
                onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
              />{" "}
            </button>

            <span className="   rounded-md h-10 w-12 items-center justify-center flex leading-0 text-[1rem] sm:text-[1.125rem] font-semibold flex-1 text-center">
              {quantity}
            </span>
            <button
              disabled={!selectedVariant.inStock}
              className="h-12 w-12  rounded-r-2xl hover:bg-muted   flex items-center justify-center "
            >
              <Plus
                className="size-5 cursor-pointer"
                onClick={() => setQuantity((quantity) => quantity + 1)}
              ></Plus>
            </button>
          </div>
        </>
      )}

      <Button
        disabled={!selectedVariant.inStock}
        onClick={() => {
          update({
            item: convertToCartItem({
              ...data,
              isDrystore: data.isDryStore,
              variantOption,
              productId: data.publicId,
              variantId: selectedVariant.publicId,
              variants: data.variants.length,
              sku: selectedVariant.sku,
              mrp: selectedVariant.mrp,
              price: selectedVariant.price,
              inStock: selectedVariant.inStock,
              stockLimit: selectedVariant.stockLimit,
              availableInStock: selectedVariant.availableInStock,
            }),
            quantity,
          });
        }}
        size="lg"
        className={`
        ${data.hasSubscription ? "ml-auto" : ""}
          h-14 font-bold
          w-full 
          sm:flex-1 sm:max-w-56
          bg-white text-maroon border-maroon border hover:bg-white! 
          `}
      >
        Add to Cart
      </Button>
    </div>
  );
}
