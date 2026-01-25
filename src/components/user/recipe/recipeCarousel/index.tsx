"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface RecipeHeroCarouselProps {
  assets?: {
    url: string;
  }[];
  title: string;
}

export function RecipeCarousel({
  assets = [],
  title,
}: RecipeHeroCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (!assets.length) return null;

  return (
    <div className="relative w-full h-140 aspect-video">
      <Carousel setApi={setApi} className="h-full">
        <CarouselContent>
          {assets.map((asset, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-140 aspect-video">
                <Image
                  src={asset.url}
                  alt={title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* GRADIENT OVERLAY */}
      <div className="absolute  h-full w-full bg-black/40 top-0 left-0  z-20" />

      {/* DOTS – TOP RIGHT */}
      <div className="absolute top-6 right-6 z-30 flex gap-2">
        {assets.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              current === index ? "bg-white scale-110" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
