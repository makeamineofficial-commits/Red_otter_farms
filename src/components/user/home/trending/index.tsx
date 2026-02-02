import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem2,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Salads from "./salads";
import Salads2 from "./salads2";

export default function Trending() {
  return (
    <section className="w-full relative">
      <Carousel
        opts={{
          align: "start",
          loop: true,
          watchDrag: false,
        }}
        className="w-full"
      >
        <CarouselContent className="items-stretch ml-0! border-none">
          <CarouselItem2 className="h-full border-none!">
            <Salads />
          </CarouselItem2>

          <CarouselItem2 className="h-full border-none!">
            <Salads2 />
          </CarouselItem2>
        </CarouselContent>
      </Carousel>
    </section>
  );
}
