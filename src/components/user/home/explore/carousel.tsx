"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { ProductPreview } from "@/types/product";
import { useCart } from "@/provider/cart.provider";
import { useHomeStore } from "@/store/user/home.store";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { convertToCartItem } from "@/lib/utils";
import { CartItem, Item } from "@/types/cart";
export function ProductCard(product: ProductPreview & { isLast: boolean }) {
  const {
    displayName,
    price,
    summary,
    assets,
    isLast,
    slug,
    type,
    stockLimit,
    availableInStock,
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
    <div
      className={`border border-forest ${isLast ? "border-r" : "border-r-0"} 
         flex flex-col h-full relative overflow-hidden`}
    >
      {stockLimit > availableInStock ? (
        <>
          <div className="absolute top-9 -right-9 z-40 rotate-45 bg-maroon py-1 px-10 text-white text-xs font-semibold shadow-md">
            Low In Stock
          </div>
        </>
      ) : (
        <></>
      )}
      <Link
        href={`/products/${slug}`}
        className="absolute top-0 left-0  h-full w-full  z-10 "
      ></Link>

      {/* Image */}
      <div className="relative w-full aspect-square p-6">
        <span className="absolute top-4 left-4 text-xs border z-50 border-forest rounded-full px-3 py-1">
          {type}
        </span>

        <Image
          src={assets[0].url}
          alt={displayName}
          fill
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div className="border-t border-forest p-6 flex flex-col">
        <h3 className="font-semibold uppercase text-sm">{displayName}</h3>
        <p className="text-sm opacity-70">{summary}</p>
        <div className="flex items-center justify-between ">
          <span className="font-semibold">₹{formatPrice(price)}</span>

          <div className="z-40 flex gap-2 sm:mt-0 mt-4">
            <div className="flex items-center border border-muted-foreground rounded-lg">
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-transparent cursor-pointer"
                onClick={() => setCount((prev) => Math.max(1, prev - 1))}
              >
                <Minus className="size-4" />
              </Button>
              <span className="px-2 text-sm">{count}</span>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-transparent cursor-pointer"
                onClick={() => setCount((prev) => prev + 1)}
              >
                <Plus className="size-4" />
              </Button>
            </div>
            <Button
              onClick={() => {
                update({
                  item: convertToCartItem(product),
                  quantity: count,
                });
              }}
              variant="outline"
              className="bg-transparent! rounded-lg! border-maroon! text-maroon!"
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductCarousel() {
  const { data } = useHomeStore();
  const products = data?.products ?? [];
  return (
    <section className="w-full overflow-hidden bg-herbal">
      <Carousel opts={{ align: "start" }} className="overflow-visible">
        <CarouselContent className="">
          {products.map((p, i) => (
            <CarouselItem
              key={i}
              className="
                pl-0! pt-0!
                basis-[85%]
                md:basis-1/2
                lg:basis-1/3
              "
            >
              <ProductCard {...p} isLast={i === products.length - 1} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
