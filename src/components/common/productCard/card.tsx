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
import { Minus, Plus } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";

export function ProductCard({ name, price, mrp, assets, slug }: Product) {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);
  const { push } = useRouter();
  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div
      className="rounded-2xl border p-3 space-y-3 w-full"
      onClick={() => push(`/products/${slug}`)}
    >
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
          ₹{price}
          {mrp && (
            <span className="text-xs text-muted-foreground line-through ml-1">
              ₹{mrp}
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
          <Button size="icon" variant="ghost">
            <Minus className="size-4" />
          </Button>
          <span className="px-2 text-sm">1</span>
          <Button size="icon" variant="ghost">
            <Plus className="size-4" />
          </Button>
        </div>

        <Button size="sm" className="rounded-lg">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
