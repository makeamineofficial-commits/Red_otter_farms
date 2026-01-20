import { Button } from "@/components/ui/button";
import React from "react";

export default function Testimony() {
  return (
    <section className="px-18 py-24 bg-herbal">
      <article className="flex gap-8 flex-col">
        <h2 className="uppercase tracking-[4.2px] text-[1.125rem]">
          Testimonials
        </h2>
        <h1 className="text-forest font-dream-orphans uppercase flex flex-col gap-5 leading-[100%] text-[4.75rem] tracking-[6px]">
          <span>Trusted by</span>
          <span>8,000+ homes</span>
        </h1>
        <p className="text-[1.375rem] flex flex-col gap-2">
          <span>We don't ask you to trust a label. </span>
          <span> We ask you to trust a system.</span>
          <span>One you can see, test, and taste.</span>
        </p>

        <Button
          variant={"destructive"}
          className="uppercase w-58! h-18! text-[1.25rem] font-semibold rounded-3xl!"
        >
          LEARN MORE
        </Button>
      </article>
    </section>
  );
}
