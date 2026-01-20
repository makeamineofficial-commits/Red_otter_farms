import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex px-18 items-center">
      <Image
        fill
        priority
        src="/home/hero.png"
        alt="Hero background"
        className="scale-y-120 z-10 max-h-270"
      />

      <article className="z-20 flex gap-7.5 flex-col translate-y-26">
        <h2 className="text-8xl tracking-[6px] gap-4 font-dream-orphans font-light flex flex-col text-white ">
          <span>Better nutrition</span>
          <span>every day</span>
        </h2>
        <p className="text-[1.575rem] w-200  text-white tracking-[0px] font-light">
          Food is supposed to nourish you. Somewhere along the way, that
          stopped. We rebuilt the chain from farm to kitchen so nutrition
          survives the journey.
        </p>

        <div className="flex gap-7.5">
          <Button className="bg-white! uppercase hover:text-red-500 font-bold w-92! h-18! rounded-2xl!  text-[1.175rem]! tracking-[1.42px]! text-red-500">
            Start Your Weekly Box
          </Button>

          <Button className="  border-2 uppercase bg-transparent!  font-bold w-77! h-18! rounded-2xl!  text-[1.175rem]! tracking-[1.42px]! text-white">
            See How It Works
          </Button>
        </div>
      </article>
    </section>
  );
}
