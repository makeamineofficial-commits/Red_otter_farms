"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import { Minus, Plus, Share2 } from "lucide-react";
import { Product, ProductPreview } from "@/types/product";
import { useCart } from "@/provider/cart.provider";
import Link from "next/link";
import { convertToCartItem, formatPrice } from "@/lib/utils";
import { Share } from "../share";
import Wishlist from "./wishlist";
import { motion, AnimatePresence } from "framer-motion";

export function ProductCard(product: ProductPreview) {
  const {
    displayName,
    price,
    mrp,
    assets,
    variantOption,
    nutritionalInfo,
    slug,
    healthBenefits,
    availableInStock,
    stockLimit,
    variants,
    hasSubscription,
    inStock,
  } = product;
  const { update, cart, remove, discount } = useCart();
  const [count, setCount] = useState(0);

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

        {!inStock ? (
          <>
            <div className="absolute top-7 -left-9 z-50 -rotate-45 bg-maroon py-1 px-10 text-white text-xs font-semibold shadow-md">
              Out Of Stock
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
        {nutritionalInfo && (
          <Badge className="text-xs capitalize absolute z-40 bottom-3 right-3 bg-muted-foreground">
            {Object.keys(nutritionalInfo)[0]}{" "}
            {nutritionalInfo[Object.keys(nutritionalInfo)[0]]}
          </Badge>
        )}

        <div className="absolute z-40 top-2 right-2 md:top-3  md:right-3 flex flex-col gap-2">
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
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full">
          <p className=" font-medium line-clamp-1 text-base capitalize md:text-lg">
            {displayName.toLowerCase()}
          </p>
          {hasSubscription ? (
            <>
              {" "}
              <div className="flex gap-1 items-center">
                <Badge className="bg-maroon">Subscription</Badge>
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-1 items-center">
                <Badge className="bg-maroon">{variantOption.join("|")}</Badge>
                {variants > 1 && (
                  <Badge variant="outline" className="text-xs capitalize">
                    +{variants - 1}
                  </Badge>
                )}
              </div>
            </>
          )}
        </div>

        <p className="text-sm font-semibold">
          ₹{formatPrice(price * discount)}
          {mrp && (
            <span className="text-xs text-muted-foreground line-through ml-1">
              ₹{formatPrice(mrp)}
            </span>
          )}
          {discount < 1 ? (
            <>
              <Badge className="ml-2" variant={"outline"}>
                Extra {100 - discount * 100}% Off
              </Badge>
            </>
          ) : (
            <></>
          )}
        </p>
      </div>

      {/* TAGS */}
      <div className="flex gap-2 flex-wrap   w-fit">
        {healthBenefits &&
          [...healthBenefits]
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
      <div className="items-center justify-between gap-2 relative z-10 mt-auto hidden md:flex">
        <div className="flex items-center border rounded-lg">
          <Button
            disabled={!inStock}
            size="icon"
            variant="ghost"
            onClick={() => setCount((prev) => Math.max(1, prev - 1))}
          >
            <Minus className="size-4" />
          </Button>
          <span className="px-2 text-sm">{Math.max(1, count)}</span>
          <Button
            disabled={!inStock}
            size="icon"
            variant="ghost"
            onClick={() => setCount((prev) => prev + 1)}
          >
            <Plus className="size-4" />
          </Button>
        </div>
        <div className="flex gap-2 items-center">
          <Button
            disabled={!inStock}
            size="sm"
            className="bg-transparent! border rounded-lg! border-maroon! text-maroon!"
            onClick={() => {
              update({
                item: convertToCartItem(product),
                quantity: Math.max(count, 1),
              });
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="items-center justify-end gap-2 relative z-10 mt-auto h-10  flex md:hidden">
        <AnimatePresence mode="wait">
          {count > 0 ? (
            /* Quantity Controls */
            <motion.div
              key="counter"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center border border-maroon rounded-lg"
            >
              <Button
                disabled={!inStock}
                size="sm"
                variant="ghost"
                onClick={() => {
                  setCount((prev) => Math.max(0, prev - 1));
                  if (count === 1) {
                    remove({ variantId: product.variantId });
                  } else {
                    update({
                      toggle: false,
                      item: convertToCartItem(product),
                      quantity: Math.max(1, count - 1),
                    });
                  }
                }}
              >
                <Minus className="size-2" />
              </Button>

              <span className="px-2 text-sm">{count}</span>

              <Button
                disabled={!inStock}
                size="sm"
                variant="ghost"
                onClick={() => {
                  setCount((prev) => prev + 1);
                  update({
                    toggle: false,
                    item: convertToCartItem(product),
                    quantity: count + 1,
                  });
                }}
              >
                <Plus className="size-2" />
              </Button>
            </motion.div>
          ) : (
            /* Add Button */
            <motion.div
              key="add"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                disabled={!inStock}
                size="sm"
                className="bg-transparent border text-sm! border-maroon text-maroon rounded-lg px-4"
                onClick={() => {
                  setCount(1);
                  update({
                    toggle: false,
                    item: convertToCartItem(product),
                    quantity: 1,
                  });
                }}
              >
                Add
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
