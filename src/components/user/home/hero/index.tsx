import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    <section className="relative min-h-screen max-h-full xl:max-h-270  flex px-4 md:px-12 lg:px-18 items-start lg:items-center">
      <article className="absolute top-0 left-0 h-screen w-full">
        <Image
          fill
          priority
          src="/home/hero.webp"
          alt="Hero background"
          className="object-cover object-right md:block hidden"
        />

        <Image
          fill
          priority
          src="/home/hero-mobile.webp"
          alt="Hero background"
          className="object-cover object-right block md:hidden"
        />
      </article>
      <article className="z-20 flex gap-7.5 flex-col  translate-y-40 lg:translate-y-26">
        <h2 className="text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl tracking-[6px] gap-0 md:gap-4 font-dream-orphans font-light flex flex-col text-white ">
          <span>Better nutrition</span>
          <span>every day</span>
        </h2>
        <p className="text-[1.25rem] lg:text-[1.4rem] 3xl:text-[1.575rem] w-[95%] lg:w-200  text-white tracking-[0px] font-light">
          Food is supposed to nourish you. Somewhere along the way, that
          stopped. We rebuilt the chain from farm to kitchen so nutrition
          survives the journey.
        </p>

        <div className="flex gap-4 md:gap-7.5 flex-col lg:flex-row">
          <Button className="bg-white! uppercase hover:text-red-500 font-bold px-6! w-fit lg:w-auto! sm:px-10! lg:px-14! h-18! rounded-2xl! text-[1rem] lg:text-[1.025rem]   3xl:text-[1.175rem]! tracking-[1.42px]! text-red-500">
            Start Your Weekly Box
          </Button>

          <Button className=" hover:bg-white! hover:text-black border-2 uppercase bg-transparent!  font-bold px-6! w-fit lg:w-auto! sm:px-10! lg:px-14! h-18! rounded-2xl! text-[1rem] lg:text-[1.025rem]   3xl:text-[1.175rem]! tracking-[1.42px]! text-white">
            See How It Works
          </Button>
        </div>
      </article>
    </section>
  );
}
