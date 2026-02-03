"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useHomeStore } from "@/store/user/home.store";
import { Testimonial as TestimonialType } from "@/types/testimonial";

function TestimonialCard({
  rating,
  heroImage,
  avatar,
  review,
  position,
  name,
}: TestimonialType) {
  return (
    <div className="border border-forest flex flex-col w-full h-full">
      {/* Image */}
      <div className="relative w-full aspect-4/3 overflow-hidden ">
        <Image
          src={heroImage[0].url ?? "/home/testimonial-1.png"}
          alt={heroImage[0].thumbnail ?? "/home/testimonial-1.png"}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col gap-6 flex-1">
        {/* Rating */}
        <div className="flex gap-1 text-[#F5AAA3]">
          {Array.from({ length: Math.ceil(rating) }).map((_, i) => (
            <Star
              key={i}
              size={20}
              fill="currentColor"
              className="stroke-forest"
            />
          ))}
        </div>

        {/* Quote */}
        <p className="text-[1.125rem]  leading-relaxed block">“{review}”</p>

        {/* Author */}
        <div className="flex items-center gap-4 mt-auto">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <Image
              src={avatar[0].url ?? "/home/testimonial-avatar.png"}
              alt={avatar[0].thumbnail ?? "/home/testimonial-avatar.png"}
              width={40}
              height={40}
            />
          </div>

          <div className="text-sm">
            <p className="font-semibold uppercase tracking-wide">{name}</p>
            <p className="opacity-70">{position}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonial() {
  const { data } = useHomeStore();
  const testimonials = data?.testimonials ?? [];
  return (
    <section className="w-full max-w-3xl ">
      <Carousel opts={{ align: "start" }} className="overflow-visible">
        <CarouselContent className="">
          {testimonials.map((t, i) => (
            <CarouselItem key={i} className=" basis-[85%] md:basis-1/2">
              <TestimonialCard {...t} />
            </CarouselItem>
          ))}
          <CarouselItem
            key={"gap"}
            className="basis-0 md:basis-1/4"
          ></CarouselItem>
        </CarouselContent>

        {/* Bottom controls */}
        <div className="flex md:justify-start justify-center  gap-6 mt-12 ">
          <CarouselPrevious className="static bg-transparent! size-12.5! border-forest text-forest hover:opacity-90`" />
          <CarouselNext className="static bg-transparent! size-12.5! border-forest text-forest hover:opacity-90`" />
        </div>
      </Carousel>
    </section>
  );
}
