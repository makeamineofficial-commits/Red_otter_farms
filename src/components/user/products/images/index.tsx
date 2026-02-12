"use client";

import { Heart, Star, ChevronLeft, ChevronRight, Share2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";
import Wishlist from "./wishlist";
import { Share } from "@/components/common/share";
import { Product, Variant } from "@/types/product";
import { useProduct } from "@/provider/product.provider";
export default function Images({
  product: data,
}: {
  product: Product & {
    recipes: { title: string; slug: string }[];
    variants: Variant[];
  };
}) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayImages, setDisplayImages] = useState<string[]>([]);

  useEffect(() => {
    if (data?.assets?.length) {
      setDisplayImages(data.assets.map((a) => a.url));
    }
  }, [data]);

  const { selectedVariant } = useProduct();

  return (
    <>
      <article className="w-full hidden sm:block">
        <div className="aspect-square bg-muted relative rounded-3xl overflow-hidden">
          {selectedVariant &&
          selectedVariant?.stockLimit > selectedVariant?.availableInStock ? (
            <>
              <div className="absolute top-6 -left-11.25 z-40 -rotate-45 bg-maroon py-1 px-10 text-white text-sm font-semibold shadow-md">
                Low In Stock
              </div>
            </>
          ) : (
            <></>
          )}
          {selectedVariant && !selectedVariant.inStock ? (
            <>
              <div className="absolute top-6 -left-11.25 z-40 -rotate-45 bg-maroon py-1 px-10 text-white text-sm font-semibold shadow-md">
                Out Of Stock
              </div>
            </>
          ) : (
            <></>
          )}
          <img
            src={displayImages[0]}
            alt={data?.name || "Product"}
            className={`
          w-full h-full object-cover rounded-3xl
          transition-all duration-300
          ${isAnimating ? "scale-105 opacity-80" : "scale-100 opacity-100"}
        `}
            onLoad={() => setIsAnimating(false)}
          />
          <div className="flex flex-col gap-2 absolute top-3 right-3 z-40">
            <Share href={`/products/${data.slug}`}>
              <div className="bg-white shadow-sm h-10 w-10 flex items-center justify-center rounded-full">
                <Share2 className="size-5 stroke-1" />
              </div>
            </Share>

            <Wishlist product={data} />
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-3 my-2 lg:my-4.5 gap-2 lg:gap-4.5">
          {displayImages.slice(1, 4).map((img, i) => {
            const realIndex = i + 1;
            const isLast = i === 2 && displayImages.length > 4;
            const remaining = displayImages.length - 4;
            return (
              <button
                key={i}
                onClick={() => {
                  setIsAnimating(true);

                  setTimeout(() => {
                    setDisplayImages((prev) => {
                      const next = [...prev];

                      // swap main (0) with clicked thumbnail
                      const temp = next[0];
                      next[0] = next[i + 1];
                      next[i + 1] = temp;

                      return next;
                    });
                  }, 150);
                }}
                className="
            aspect-square rounded-3xl overflow-hidden relative
            bg-muted group cursor-pointer
            focus:outline-none
          "
              >
                {img ? (
                  <img
                    src={img}
                    alt={`Product ${i + 1}`}
                    className="
                w-full h-full object-cover
                transition-transform duration-300
                group-hover:scale-105
              "
                  />
                ) : (
                  <div className="animate-pulse w-full h-full bg-gray-200" />
                )}

                {/* +N Overlay only on last */}
                {isLast && (
                  <div
                    className="
                absolute inset-0
                bg-black/50
                flex items-center justify-center
                text-white text-lg font-semibold
                opacity-0 group-hover:opacity-100
                transition-opacity duration-200
                rounded-3xl
              "
                  >
                    +{remaining}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </article>

      <article className="w-full sm:hidden block relative space-y-5 overflow-hidden">
        {selectedVariant &&
        selectedVariant?.stockLimit > selectedVariant?.availableInStock ? (
          <>
            <div className="absolute top-6 -left-11.25 z-40 -rotate-45 bg-maroon py-1 px-10 text-white text-sm font-semibold shadow-md">
              Low In Stock
            </div>
          </>
        ) : (
          <></>
        )}
        {selectedVariant && !selectedVariant.inStock ? (
          <>
            <div className="absolute top-6 -left-11.25 z-40 -rotate-45 bg-maroon py-1 px-10 text-white text-sm font-semibold shadow-md">
              Out Of Stock
            </div>
          </>
        ) : (
          <></>
        )}
        <div className="aspect-square bg-muted relative rounded-3xl overflow-hidden ">
          <div className="flex flex-col gap-2 absolute top-3 right-3 z-40">
            <Share href={`/products/${data?.slug}`}>
              <div className="bg-white shadow-sm h-10 w-10 flex items-center justify-center rounded-full">
                <Share2 className="size-5 stroke-1  transition-colors "></Share2>
              </div>
            </Share>
            <Wishlist product={data}></Wishlist>
          </div>
          <Carousel setApi={setApi}>
            <CarouselContent>
              {displayImages.map((img, i) => (
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
        <div className="flex items-center justify-between w-full px-2 absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
          <button
            onClick={() => api?.scrollPrev()}
            className="h-10 w-10 rounded-full border-2 flex items-center justify-center border-white"
          >
            <ChevronLeft className="size-5 cursor-pointer text-white" />
          </button>

          <button
            onClick={() => api?.scrollNext()}
            className="h-10 w-10 rounded-full border-2 flex items-center justify-center border-white"
          >
            <ChevronRight className="size-5 cursor-pointer text-white" />
          </button>
        </div>
      </article>
    </>
  );
}
