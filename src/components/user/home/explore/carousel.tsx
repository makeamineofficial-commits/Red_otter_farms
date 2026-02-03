"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { useCart } from "@/provider/cart.provider";
import { useHomeStore } from "@/store/user/home.store";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
export function ProductCard(product: Product & { isLast: boolean }) {
  const {
    name,
    price,
    description,
    assets,
    isLast,
    slug,
    type,
  } = product;
  const { update, cart } = useCart();
  const [count, setCount] = useState(1);
  useEffect(() => {
    if (!cart) return;

    const count = cart.products.find(
      (ele) => ele.publicId === product.publicId,
    )?.quantity;

    if (count) {
      setCount(count);
    }
  }, [cart]);
  return (
    <div
      className={`border border-forest ${isLast ? "border-r" : "border-r-0"} 
         flex flex-col h-full relative`}
    >
      <Link
        href={`/products/${slug}`}
        className="absolute top-0 left-0  h-full w-full  z-10 "
      ></Link>

      {/* Image */}
      <div className="relative w-full aspect-square p-6">
        <span className="absolute top-4 left-4 text-xs border border-forest rounded-full px-3 py-1">
          {type}
        </span>

        <Image src={assets[0].url} alt={name} fill className="object-contain" />
      </div>

      {/* Content */}
      <div className="border-t border-forest p-6 flex flex-col">
        <h3 className="font-semibold uppercase text-sm">{name}</h3>
        <p className="text-sm opacity-70">{description}</p>
        <div className="flex items-center justify-between ">
          <span className="font-semibold">₹{formatPrice(price)}</span>

          <div className="z-40 flex gap-2">
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
                // @ts-ignore
                update({ product, quantity: count });
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
