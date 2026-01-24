import Image from "next/image";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export default function Process() {
  return (
    <section className="bg-mint grid grid-cols-2 gap-18 px-18">
      <Image src="/home/process.webp" alt="" height={850} width={850}></Image>

      <article className="py-16 space-y-6   ovn">
        <h2 className="uppercase text-[1.125rem] tracking-[4.3px] ">
          How it Works
        </h2>
        <h1 className="text-[4.75rem] font-dream-orphans font-normal uppercase flex flex-col leading-none gap-2 text-forest tracking-[6px]">
          <span>Harvest to door in</span>
          <span>36 hours</span>
        </h1>

        <Accordion
          type="multiple"
          // type="single"
          // collapsible
          // defaultValue="item-1"
          className=""
        >
          <AccordionItem
            value="item-1"
            className="border-b border-b-forest data-[state=open]:bg-herbal p-4 px-10!"
          >
            <AccordionTrigger className="text-[1.725rem] font-light tracking-[1.42px] w-full">
              Where does your produce come from?
            </AccordionTrigger>
            <AccordionContent className="w-full max-h-40 overflow-y-auto text-[1.375rem] font-light  text-wrap">
              Nutrient-dense greens, naturally sweet carrots, rotis that digest
              easier. When food is grown right and reaches you fast, you notice
              it in the first bite — and so do picky eaters.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-b border-b-forest data-[state=open]:bg-herbal p-4 px-10!">
            <AccordionTrigger className="text-[1.725rem] font-light tracking-[1.42px] w-full">
              From local farms to your table.
            </AccordionTrigger>

            <AccordionContent className="w-full max-h-40 overflow-y-auto text-[1.375rem] font-light  text-wrap">
              Nutrient-dense greens, naturally sweet carrots, rotis that digest
              easier. When food is grown right and reaches you fast, you notice
              it in the first bite.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-b border-b-forest data-[state=open]:bg-herbal p-4 px-10!">
            <AccordionTrigger className="text-[1.725rem] font-light tracking-[1.42px] w-full">
              The journey of freshness.
            </AccordionTrigger>

            <AccordionContent className="w-full max-h-40 overflow-y-auto text-[1.375rem] font-light  text-wrap">
              Nutrient-dense greens, naturally sweet carrots, rotis that digest
              easier. When food is grown right and reaches you fast, you notice
              it in the first bite.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </article>
    </section>
  );
}
