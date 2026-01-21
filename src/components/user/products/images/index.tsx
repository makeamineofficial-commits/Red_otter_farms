"use client";

import { Heart, Star, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const images = [1, 2, 3, 4];

export default function Images() {
  const [api, setApi] = useState<CarouselApi | null>(null);

  return (
    <>
      {/* DESKTOP */}
      <article className="w-full hidden sm:block">
        <div className="aspect-square bg-muted relative rounded-3xl">
          <ActionIcons />
        </div>

        <div className="grid grid-cols-3 my-2 lg:my-4.5 gap-2 lg:gap-4.5">
          {images.slice(0, 3).map((_, i) => (
            <div key={i} className="aspect-square bg-muted rounded-3xl" />
          ))}
        </div>
      </article>

      {/* MOBILE */}
      <article className="w-full sm:hidden block relative space-y-5">
        <ActionIcons />

        <Carousel setApi={setApi}>
          <CarouselContent>
            {images.map((_, i) => (
              <CarouselItem key={i}>
                <div className="aspect-square bg-muted relative rounded-3xl"></div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Local Navigation Buttons */}
        <div className=" flex items-center justify-between px-2 ">
          <button
            onClick={() => api?.scrollPrev()}
            className="h-10  w-10 rounded-full border-2 flex items-center justify-center border-muted-foreground"
          >
            <ChevronLeft className="size-5 cursor-pointer" />{" "}
          </button>

          <button
            onClick={() => api?.scrollNext()}
            className="h-10 w-10 rounded-full border-2  flex items-center justify-center border-muted-foreground"
          >
            <ChevronRight className="size-5 cursor-pointer" />
          </button>
        </div>
      </article>
    </>
  );
}

function ActionIcons() {
  return (
    <div className=" flex flex-col gap-2 absolute top-3 right-3 z-30">
      <div className="bg-white shadow-sm h-10 w-10 rounded-full p-2 flex items-center justify-center">
        <Heart className="stroke-1" />
      </div>
      <div className="bg-white shadow-sm h-10 w-10 rounded-full p-2 flex items-center justify-center">
        <Star className="stroke-1" />
      </div>
    </div>
  );
}
