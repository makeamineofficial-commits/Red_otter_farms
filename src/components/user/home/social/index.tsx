import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import Image from "next/image";
import React from "react";

const images = [
  "/home/insta-1.webp",
  "/home/insta-2.webp",
  "/home/insta-3.webp",
  "/home/insta-4.webp",
  "/home/insta-5.webp",
  "/home/insta-6.webp",
];

export default function Social() {
  return (
    <section className="bg-forest px-18 py-20 overflow-hidden">
      {/* Header */}
      <article className="flex justify-between items-center mb-12">
        <h2 className="font-dream-orphans text-white text-[4.75rem] uppercase">
          From the 'gram
        </h2>

        <Button className="uppercase gap-4 h-18 px-10 text-[1.25rem] font-semibold bg-white text-red-500 hover:bg-white rounded-2xl">
          <Instagram className="stroke-red-500 size-5" />
          Follow Us @redotterfarms
        </Button>
      </article>

      {/* Marquee */}
      <div className="relative">
        <div className="animate-marquee flex gap-8">
          {[...images, ...images].map((src, i) => (
            <div
              key={i}
              className="relative aspect-3/4 w-120 shrink-0 overflow-hidden "
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="320px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
