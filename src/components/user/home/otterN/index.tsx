import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function OtterN() {
  return (
    <section className="p-18 py-30 relative bg-mint">
      <article className=" w-full bg-herbal p-18 text-forest flex flex-col gap-10">
        <h2 className="font-dream-orphans text-[4.75rem] tracking-[6px] uppercase">
          Ready to eat better?
        </h2>

        <p className="text-[2.475rem] flex flex-col">
          <span>Our grocery cart doesn't tell you what's missing.</span>
          <strong className="italic"> OtterN does.</strong>
        </p>
        <Button
          variant={"destructive"}
          className="uppercase w-76! h-18! text-[1.25rem] rounded-2xl!"
        >
          See How It Works
        </Button>
      </article>
      <Image
        src="/home/ottern.webp"
        className="absolute top-1/2 right-37.5 -translate-y-1/2"
        alt=""
        height={600}
        width={600}
      ></Image>
    </section>
  );
}
