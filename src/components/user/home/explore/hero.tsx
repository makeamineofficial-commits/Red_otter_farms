import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import ProductCarousel from "./carousel";
import Link from "next/link";

export default function Hero() {
  return (
    <article className="px-4 md:px-12 lg:px-18 py-10 sm:py-16 lg:py-24 bg-herbal overflow-hidden">
      <div className="flex justify-between items-start md:items-end md:flex-row flex-col gap-4 px-4 md:px-12 lg:px-18">
        <div className="flex gap-4 md:gap-8 flex-col">
          <h2 className="uppercase tracking-[4.2px] text-[1.125rem]">
            Our picks for you
          </h2>
          <h1 className="text-forest font-dream-orphans uppercase flex flex-col gap-2 lg:gap-5 leading-[100%] text-[2rem] lg:text-[3.5rem] 2xl:text-[4.75rem] tracking-[6px]">
            <span>Explore what's</span>
            <span>trending now</span>
          </h1>
        </div>

        <Link href="/categories">
          <Button
            variant={"destructive"}
            className="uppercase h-auto! rounded-lg! text-[1rem] lg:text-[1.25rem] font-semibold py-3! px-8!"
          >
            SHOP ALL
          </Button>
        </Link>
      </div>
    </article>
  );
}
