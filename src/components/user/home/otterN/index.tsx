import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function OtterN() {
  return (
    <section className="px-4 md:px-12 lg:px-18 py-0 xl:py-30 relative bg-mint pb-20 sm:pb-0">
      <article className=" w-full bg-herbal p-4 md:p-12 lg:p-18 text-forest flex flex-col gap-10  ">
        <h2 className="font-dream-orphans text-[2rem] lg:text-[3.5rem] 2xl:text-[4.75rem] tracking-[6px] uppercase">
          Ready to eat better?
        </h2>

        <p className="text-[1rem] sm:text-[1.5rem] lg:text-[2rem] 2xl:text-[2.475rem] flex flex-col">
          <span>Our grocery cart doesn't tell you what's missing.</span>
          <strong className="italic"> OtterN does.</strong>
        </p>
        <Button
          variant={"destructive"}
          className="uppercase px-6! w-fit  sm:px-10! lg:px-14! h-18! rounded-2xl! text-[1rem] lg:text-[1.175rem]!"
        >
          See How It Works
        </Button>
      </article>
      <Image
        src="/home/ottern.webp"
        className="absolute top-1/2 right-5 2xl:right-37.5 -translate-y-1/2 xl:block hidden"
        alt=""
        height={600}
        width={600}
      ></Image>
      <div className=" w-full bg-herbal translate-y-0 sm:-translate-y-10 ">
        <div className="aspect-square h-80 xs:h-90 sm:h-150 relative mx-auto bg-herbal block xl:hidden">
          <Image
            src="/home/ottern.webp"
            className="translate-y-10"
            alt=""
            fill
          ></Image>
        </div>
      </div>
    </section>
  );
}
