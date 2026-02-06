"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Autoplay from "embla-carousel-autoplay";
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
  const autoplay = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    }),
  );

  if (!assets.length) return null;

  return (
    <div className="relative w-full h-140 aspect-video group">
      {/* CAROUSEL */}
      <Carousel
        setApi={setApi}
        className="h-full"
        opts={{
          loop: true,
          align: "center",
        }}
        plugins={[autoplay.current]}
      >
        <CarouselContent>
          {assets.map((asset, index) => (
            <CarouselItem key={index} className="-pl-6">
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
      <div className="absolute inset-0 bg-black/40 z-20" />

      {/* LEFT BUTTON */}
      <button
        onClick={() => api?.scrollPrev()}
        className="
          absolute left-4 top-1/2 -translate-y-1/2 z-30
          h-10 w-10 rounded-full
          bg-white/80 hover:bg-white
          flex items-center justify-center
          shadow-md
          transition
          opacity-0 group-hover:opacity-100
        "
      >
        <ChevronLeft className="h-5 w-5 text-black" />
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={() => api?.scrollNext()}
        className="
          absolute right-4 top-1/2 -translate-y-1/2 z-30
          h-10 w-10 rounded-full
          bg-white/80 hover:bg-white
          flex items-center justify-center
          shadow-md
          transition
          opacity-0 group-hover:opacity-100
        "
      >
        <ChevronRight className="h-5 w-5 text-black" />
      </button>
    </div>
  );
}
