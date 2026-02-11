"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Minus, Plus, Share2 } from "lucide-react";
import { Product, ProductPreview } from "@/types/product";
import { useCart } from "@/provider/cart.provider";
import Link from "next/link";
import { convertToCartItem, formatPrice } from "@/lib/utils";
import { Share } from "../share";
import Wishlist from "./wishlist";
export function ProductCard(product: ProductPreview) {
  const {
    displayName,
    price,
    mrp,
    assets,
    nutritionalInfo,
    slug,
    healthBenefits,
    availableInStock,
    stockLimit,
    variants,
  } = product;
  const { update, cart } = useCart();
  const [count, setCount] = useState(1);
  useEffect(() => {
    if (!cart) return;

    const count = cart.items.find(
      (ele) => ele.variant.publicId === product.variantId,
    )?.quantity;

    if (count) {
      setCount(count);
    }
  }, [cart]);

  return (
    <div className="rounded-2xl border p-3 space-y-3 w-full relative flex flex-col ">
      <Link
        href={`/products/${slug}`}
        className="absolute top-0 left-0  h-full w-full  z-10"
      ></Link>

      <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
        {stockLimit > availableInStock ? (
          <>
            <div className="absolute top-7 -left-9 z-40 -rotate-45 bg-maroon py-1 px-10 text-white text-xs font-semibold shadow-md">
              Low In Stock
            </div>
          </>
        ) : (
          <></>
        )}
        <Image
          src={assets[0].url}
          alt={displayName}
          fill
          className="object-cover"
        />
        <Badge className="text-xs capitalize absolute z-40 bottom-3 right-3 bg-muted-foreground">
          {Object.keys(nutritionalInfo)[0]}{" "}
          {nutritionalInfo[Object.keys(nutritionalInfo)[0]]}
        </Badge>

        <div className="absolute z-40 top-3 right-3 flex flex-col gap-2">
          <Share href={`/products/${slug}`}>
            <div className="bg-white h-8 w-8 flex items-center justify-center shadow-sm rounded-full">
              <Share2 className="size-5 stroke-1  transition-colors "></Share2>
            </div>
          </Share>

          <Wishlist {...product}></Wishlist>
        </div>
      </div>

      {/* TITLE + PRICE */}
      <div className="space-y-1">
        <div className="flex items-center justify-between w-full">
          <p className=" font-medium line-clamp-1 text-lg">{displayName}</p>
          <div className="flex gap-1 items-center">
            {variants > 1 && (
              <Badge variant="outline" className="text-xs capitalize">
                +{variants} Options
              </Badge>
            )}
          </div>
        </div>
        <p className="text-sm font-semibold">
          ₹{formatPrice(price)}
          {mrp && (
            <span className="text-xs text-muted-foreground line-through ml-1">
              ₹{formatPrice(mrp)}
            </span>
          )}
        </p>
      </div>

      {/* TAGS */}
      <div className="flex gap-2 flex-wrap   w-fit">
        {[...healthBenefits]
          .sort((a, b) => a.length - b.length)
          .slice(0, 2)
          .slice(0, 2)
          .map((ele) => (
            <Badge variant="outline" key={ele} className="text-xs capitalize">
              {ele}
            </Badge>
          ))}
        {healthBenefits.length > 2 && (
          <Badge variant="outline" className="text-xs capitalize">
            +{healthBenefits.length - 2} More
          </Badge>
        )}
      </div>

      {/* QUANTITY + CART */}
      <div className="flex items-center justify-between gap-2 relative z-10 mt-auto">
        <div className="flex items-center border rounded-lg">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setCount((prev) => Math.max(1, prev - 1))}
          >
            <Minus className="size-4" />
          </Button>
          <span className="px-2 text-sm">{count}</span>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setCount((prev) => prev + 1)}
          >
            <Plus className="size-4" />
          </Button>
        </div>
        <div className="flex gap-2 items-center">
          <Button
            size="sm"
            className="bg-transparent! border rounded-lg! border-maroon! text-maroon!"
            onClick={() => {
              update({
                item: convertToCartItem(product),
                quantity: count,
              });
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
