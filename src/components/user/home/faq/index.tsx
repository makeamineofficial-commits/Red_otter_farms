import Image from "next/image";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export default function FAQ() {
  return (
    <section className="bg-mint grid grid-cols-2 gap-18 p-18">
      <Image src="/home/faq.webp" alt="" height={850} width={850}></Image>

      <article className="py-16 space-y-6">
        <h1 className="text-[4.75rem] font-dream-orphans font-normal uppercase flex flex-col leading-[100%] gap-2 text-forest tracking-[0px]">
          FAQ's
        </h1>
        <br />
        <br />
        <Accordion
          type="multiple"
          // type="single"
          // collapsible
          // defaultValue="item-1"
          className=""
        >
          <AccordionItem value="item-1" className="border-b border-b-forest data-[state=open]:bg-herbal p-4 px-10!">
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
              Is your produce organic?
            </AccordionTrigger>

            <AccordionContent className="w-full max-h-40 overflow-y-auto text-[1.375rem] font-light  text-wrap">
              Nutrient-dense greens, naturally sweet carrots, rotis that digest
              easier. When food is grown right and reaches you fast, you notice
              it in the first bite.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-b border-b-forest data-[state=open]:bg-herbal p-4 px-10!">
            <AccordionTrigger className="text-[1.725rem] font-light tracking-[1.42px] w-full">
              How fresh is the produce when it arrives?
            </AccordionTrigger>

            <AccordionContent className="w-full max-h-40 overflow-y-auto text-[1.375rem] font-light  text-wrap">
              Nutrient-dense greens, naturally sweet carrots, rotis that digest
              easier. When food is grown right and reaches you fast, you notice
              it in the first bite.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-b border-b-forest data-[state=open]:bg-herbal p-4 px-10!">
            <AccordionTrigger className="text-[1.725rem] font-light tracking-[1.42px] w-full">
              What is included in a weekly box?
            </AccordionTrigger>

            <AccordionContent className="w-full max-h-40 overflow-y-auto text-[1.375rem] font-light  text-wrap">
              Nutrient-dense greens, naturally sweet carrots, rotis that digest
              easier. When food is grown right and reaches you fast, you notice
              it in the first bite.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border-b border-b-forest data-[state=open]:bg-herbal p-4 px-10!">
            <AccordionTrigger className="text-[1.725rem] font-light tracking-[1.42px] w-full">
              Can I customise my box?
            </AccordionTrigger>

            <AccordionContent className="w-full max-h-40 overflow-y-auto text-[1.375rem] font-light  text-wrap">
              Nutrient-dense greens, naturally sweet carrots, rotis that digest
              easier. When food is grown right and reaches you fast, you notice
              it in the first bite.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border-b border-b-forest data-[state=open]:bg-herbal p-4 px-10!">
            <AccordionTrigger className="text-[1.725rem] font-light tracking-[1.42px] w-full">
              Do you offer subscriptions?
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
