"use client";

import { Heart, Star, ChevronLeft, ChevronRight, Share2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import React, { useState } from "react";
import { useProductStore } from "@/store/user/product.store";
import Wishlist from "./wishlist";
import { Share } from "@/components/common/share";

export default function Images() {
  const { data, isLoading, isFetching } = useProductStore();
  const [api, setApi] = useState<CarouselApi | null>(null);

  const images = data?.assets?.length
    ? data.assets.map((asset) => asset.url)
    : Array(3).fill(null);

  return (
    <>
      <article className="w-full hidden sm:block">
        <div className="aspect-square bg-muted relative rounded-3xl overflow-hidden ">
          {isLoading || isFetching ? (
            <div className="animate-pulse w-full h-full bg-gray-200" />
          ) : (
            <img
              src={images[0]}
              alt={data?.name || "Product"}
              className="w-full h-full object-cover rounded-3xl"
            />
          )}
          <div className="flex flex-col gap-2 absolute top-3 right-3 z-40">
            <Wishlist></Wishlist>
            <Share href={`/products/${data?.slug}`}>
              <div className="bg-white shadow-sm h-10 w-10 flex items-center justify-center rounded-full">
                <Share2 className="size-5 stroke-1  transition-colors "></Share2>
              </div>
            </Share>
          </div>
        </div>

        <div className="grid grid-cols-3 my-2 lg:my-4.5 gap-2 lg:gap-4.5">
          {images.slice(1, 4).map((img, i) => {
            const isLastVisible = i === 2 && images.length > 4;
            const remainingCount = images.length - 4;

            return (
              <div
                key={i}
                className="aspect-square rounded-3xl overflow-hidden relative bg-muted group"
              >
                {img ? (
                  <img
                    src={img}
                    alt={`Product ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="animate-pulse w-full h-full bg-gray-200" />
                )}

                {isLastVisible && (
                  <div className="absolute group-hover:opacity-100 opacity-0 transition-all duration-200 inset-0 bg-black/50 flex items-center justify-center rounded-3xl text-white text-lg font-semibold">
                    +{remainingCount}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </article>

      <article className="w-full sm:hidden block relative space-y-5">
        <div className="aspect-square bg-muted relative rounded-3xl overflow-hidden ">
          <div className="flex flex-col gap-2 absolute top-3 right-3 z-40">
            <Wishlist></Wishlist>
            <Share href={`/products/${data?.slug}`}>
              <div className="bg-white shadow-sm h-10 w-10 flex items-center justify-center rounded-full">
                <Share2 className="size-5 stroke-1  transition-colors "></Share2>
              </div>
            </Share>
          </div>
          <Carousel setApi={setApi}>
            <CarouselContent>
              {images.map((img, i) => (
                <CarouselItem key={i}>
                  <div className="aspect-square rounded-3xl overflow-hidden bg-muted">
                    {img ? (
                      <img
                        src={img}
                        alt={`Product ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="animate-pulse w-full h-full bg-gray-200" />
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="flex items-center justify-between px-2">
          <button
            onClick={() => api?.scrollPrev()}
            className="h-10 w-10 rounded-full border-2 flex items-center justify-center border-muted-foreground"
          >
            <ChevronLeft className="size-5 cursor-pointer" />
          </button>

          <button
            onClick={() => api?.scrollNext()}
            className="h-10 w-10 rounded-full border-2 flex items-center justify-center border-muted-foreground"
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
    <div className="flex flex-col gap-2 absolute top-3 right-3 z-30">
      <div className="bg-white shadow-sm h-10 w-10 rounded-full p-2 flex items-center justify-center">
        <Heart className="stroke-1" />
      </div>
    </div>
  );
}
