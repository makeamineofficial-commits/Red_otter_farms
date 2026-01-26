"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ExternalLink, Minus, Plus } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { Product } from "@/types/product";
import { useCart } from "@/provider/cart.provider";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
export function ProductCard(product: Product) {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!api) return;
    
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  
  const { name, price, mrp, assets, slug } = product;
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
    <div className="rounded-2xl border p-3 space-y-3 w-full">
      {/* IMAGE CAROUSEL */}
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: true,
          }),
        ]}
        className="relative"
      >
        <CarouselContent>
          {assets?.map((asset, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
                <Image
                  src={asset.url}
                  alt={name}
                  fill
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* DOTS */}
        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {assets?.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                current === index ? "bg-white scale-110" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </Carousel>

      {/* TITLE + PRICE */}
      <div className="space-y-1">
        <p className="text-sm font-medium line-clamp-1">{name}</p>
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
      <div className="flex gap-2 flex-wrap">
        <Badge variant="outline" className="text-xs">
          Fresh
        </Badge>
        <Badge variant="outline" className="text-xs">
          Quality Check
        </Badge>
      </div>

      {/* QUANTITY + CART */}
      <div className="flex items-center justify-between gap-2">
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
            className="rounded-lg"
            onClick={() => {
              update({ product, quantity: count });
            }}
          >
            Add to Cart
          </Button>
          <Link href={`/products/${slug}`} target="_blank">
            <Button variant={"outline"}>
              <ExternalLink></ExternalLink>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
